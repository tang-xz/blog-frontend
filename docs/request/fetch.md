## The fetch specification differs from jQuery.ajax() in mainly two ways that bear keeping in mind:

The Promise returned from fetch() won't reject on HTTP error status even if the response is an HTTP 404 or 500. Instead, it will resolve normally, and it will only reject on network failure or if anything prevented the request from completing.

By default, fetch won't send or receive any cookies from the server, resulting in unauthenticated requests if the site relies on maintaining a user session. See Sending cookies for how to opt into cookie handling.

## 上传数据
在 fetch 中，上传数据的字段是 `body`，需要注意的是，body 的格式需要对应到 Content-Type 的类型，如果不匹配，fetch 并不会报错，但是请求的 request payload 中无数据。