const fetch = (_url = '', _option = {}) => {
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
    ...otherOption
  }

  return fetch(url, option)
    .then(response => {
      console.log('response is: ');
    })
    .catch(error => {

    })
}