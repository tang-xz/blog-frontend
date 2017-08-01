const timeout = (ms, data) => new Promise(resolve => setTimeout(resolve.bind({}, data), ms));

// 错误处理
// 6**: 自定义错误
// - 600: 超时错误
const request = (_url = '', _option = {}) => {
  let url = _url;
  let {
    headers,
    ...otherOption
  } = _option;
  let option = {
    'method': 'GET',
    'headers': Object.assign({
      'Content-Type': 'application/json',
    }, headers),
    globalError: true,
    timeout: 5000,
    ...otherOption
  }

  function checkStatus(response) {
    // 自定义错误 - 超时
    if (response.timeout) {
      let error = new Error('timeout')
      error.status = 600
      throw error
    }
    const status = response.status
    if (response.ok || status === 304) {
      return response
    } else {
      let error = new Error(response.statusText)
      error.status = status
      throw error
    }
  }

  function parseBody(response) {
    // possible content type:
    // 1. application/json
    // 2. text/plain
    const contentType = response.headers.get('Content-Type');
    let body;

    try {
      switch (contentType) {
        case 'application/json; charset=utf-8':
          body = response.json();
          break;
        case 'text/plain; charset=utf-8':
          body = response.text();
          break;
        default:
          body = response.text();
          break;
      }
    } catch (error) {
      throw error
    }
    return body;
  }

  const myFetch = fetch(url, option)
  const myTimeout = timeout(option.timeout, {
    timeout: true
  })
  const finalFetch = Promise.race([myFetch, myTimeout]);

  return finalFetch
    .then(checkStatus)
    .then(parseBody)
    .then(data => {
      return data;
    })
    .catch(error => {
      // 全局错误处理，可通过 globalError 配置。如果是超时错误，默认不走全局错误处理，因为 fetch 无法终止，所以对超时后的请求不可控
      if (option.globalError && error.status !== 600) {
        alert('Fetch error: ' + error.status + ', ' + error.message);
      }
      throw error;
    })
}

export default request;