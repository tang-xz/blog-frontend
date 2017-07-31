import {
  browserHistory
} from 'react-router';
import qs from 'qs';

const FETCH_TIMEOUT = 5000;

/**
 * error code meaning:
 *   0: no error
 *   1: http error,
 *   2: custom http error
 *   3: response body error
 *   4: response body is null
 *   5: server return error
 */

function checkPermission(body) {
  // user need login
  if (body.code === 1001) {
    // browserHistory.push({
    //   pathname: '/login',
    //   state: { 
    //     pathname: $tool.getPathnameFromHash(), 
    //     query: $tool.getQueryFromHash(), 
    //   },
    // });
  }
  return body;
};

function checkResponseBody(body) {
  if (body.code) {
    // server return error
    let error = new Error(body.description);
    error = Object.assign(error, {
      code: 5,
      level: 2,
      type: 'server',
      desc: body.desc,
      detail: body.desc,
      body: body,
      response: null
    });
    throw error;
  }
  return body;
}

function wrappBody(body = {}, code = 0, err = '') {
  return {
    code,
    body,
    err
  };
}

function parseResponse(response) {
  // solve issue if response body is null, but status is 200 - 299
  return response.text().then(function(text) {
    // 这里应该判断'content-type'，返回的数据格式有可能是JSON，XML，PLAIN等，现在先默认为JSON处理
    let body = {};
    if (text) {
      try {
        body = JSON.parse(text);
      } catch (err) {
        // response body error
        let error = new Error(text);
        error = Object.assign(error, {
          code: 3,
          level: 2,
          type: 'response_body',
          desc: text,
          detail: 'response body is no JSON',
          body: text,
          response: response
        });
        throw error;
      }
    } else {
      // response body is null
      let error = new Error('response body is null');
      error = Object.assign(error, {
        code: 4,
        level: 3,
        type: 'response_body_null',
        desc: 'null response body',
        detail: 'response body is null',
        body: 'response body is null',
        response: response
      });
      throw error;
    }
    return body;
  });
}


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else if (response.status > 1000) {
    // custom error - timeout error
    let error = new Error(response.statusText);
    error = Object.assign(error, {
      code: 2,
      level: 1,
      type: 'custom',
      desc: response.statusText,
      detail: 'custom error - timeout',
      body: {},
      response: response
    });
    throw error;
  } else {
    // http error
    let error = new Error(response.statusText);
    error = Object.assign(error, {
      code: 1,
      level: 1,
      type: 'http',
      desc: `${response.status} ${response.statusText}`,
      detail: '',
      body: {},
      response: response
    });
    throw error;
  }
}

function trimBody(body) {
  if (body instanceof FormData) return body
  let params = Object.assign({}, body);
  for (let i in body) {
    if (body[i] === undefined || body[i] === null) {
      delete params[i]
    }
  }
  return params
}

const request = (url, options) => {
  const new_url = `${url}`;
  const _options = Object.assign({
    method: 'GET',
    timeout: FETCH_TIMEOUT,

    /**
     * Content-Type:
     * 
     * application/x-www-form-urlencoded -> query string ( encoded url format )
     * text/plain -> pure text
     * 不设置Content-Type -> multipart/form-data
     * application/json -> JSON.stringify(object)
     */

    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      // "Content-Type": "application/json",
    },
    // 默认每个请求携带本地cookie
    credentials: 'include',
    changeToFormData: (data) => {
      let formData = new FormData();
      for (let key in data) {
        // 如果value是undefined或null则不将值传给server
        if (data[key] === undefined || data[key] === null) {
          console.warn('' + key + ' is undefined or null, not a valid parameter');
          continue
        }
        if (data[key].constructor === Object) {
          formData.append(key, JSON.stringify(data[key]));
        } else {
          formData.append(key, data[key]);
        }
      }
      return formData;
    },
    beforeRequest: (data) => data,
    afterRequest: data => data,
  }, options);

  if (typeof _options.beforeRequest === 'function') {
    _options.body = _options.beforeRequest(_options.body);
  }

  if (_options.defaults && typeof _options.defaults === 'function') {
    let defaults = _options.defaults();
    let body = Object.assign({}, _options.body);
    for (let key in body) {
      if (body[key] === undefined || body[key] === null) {
        delete body[key];
      }
    }
    _options.body = Object.assign({}, defaults, body);
  }

  // if (_options.changeToFormData && typeof _options.changeToFormData === 'function' && (_options.method === 'POST' || _options.method === 'PUT')) {
  //   _options.body = _options.changeToFormData(_options.body);
  // }

  const timeoutPromise = new Promise(function(resolve, reject) {
    setTimeout(() => resolve({
      status: 1001,
      statusText: '请求超时',
    }), _options.timeout);
  });

  // const fetchPromise = fetch(url, _options);

  if (_options.method == 'GET') {
    var fetchPromise = fetch(new_url, _options);
  } else {
    _options.body = trimBody(_options.body);

    if (_options.headers['Content-Type'] === 'application/json') {
      _options.body = JSON.stringify(options.body);
    } else if (_options.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      _options.body = qs.stringify(options.body, {
        indices: false,
        withEmptyString: true
      });
    } else if (_options.headers['Content-Type'] === 'multipart/form-data') {
      delete _options.headers['Content-Type'];
    }
    var fetchPromise = fetch(new_url, _options);
  }


  // 模拟超时，但是需要注意这是个 hack，实际上 fetch 操作并没有结束
  const myFetch = Promise.race([fetchPromise, timeoutPromise]);

  return myFetch
    .then(checkStatus)
    .then(parseResponse)
    .then(checkPermission)
    .then(checkResponseBody)
    .then(wrappBody)
    .then(_options.afterRequest)
    .catch((err) => {
      let body = {};
      if (err.code) {
        if (err.level < 3) {
          console.error(err.desc);
        } else {
          console.warn(err.desc);
        }
        body = wrappBody(err.body, err.code, String(err.desc));
      } else {
        console.error(String(err));
        // console.error('未知错误，请联系技术支持');
        body = wrappBody(err, 1, String(err));
      }
      return _options.afterRequest(body);
    });
}

export default request;