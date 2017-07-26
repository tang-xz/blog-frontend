1. path.join()：用于连接路径
2. path.resolve()：用于将相对路径转为绝对路径，函数参数的行为类似逐级 cd 进入，返回最后一个路径的绝对路径
3. 如果 webpack 提示 `webpack-dev-server ERROR in TypeError: Cannot read property '0' of undefined` 或 `You may need an appropriate loader to handle this file type.` 类似错误，先排查一下是否安装了相关依赖包
4. 注意 webpack resolve alias 中的路径，确定最终绝对路径的正确性，尽量避免 `path.resolve()` 和 `path.join()` 混合使用
5. 如果想实现编辑 css 文件，不刷新浏览器更新页面，需要 css-loader 开启 hot-module-replacement，可以设置 options 中的 modules 为 true。需要注意的是，不能调用 ExtractTextPlugin 插件，不然即使浏览器接收到 update 的消息也不更新页面。
6. 根据需要可以配置两个 webpack config 文件，一个在 dev 环境下使用，一个在 product 环境下使用。通过在 package.json 中的 --config 指定应用的 config 文件。
7. webpack config 中 publicPath 一定要是开头和结尾都是反斜杠 `／`，这样加载静态资源的时候会始终去 `http://<host>:<port>/publicPath/assets`加载。如果开头不是反斜杠，则会根据 index.html 的路径请求静态资源，将会找不到。
8. 前后端分离，前端静态资源有独立服务器，api 请求后端服务器的形式，需要前端做一个代理请求，非静态资源反向代理请求到后端。在 webpack-dev-server 里可以通过 proxy 实现。
9. 前端 react-router 如果使用 HTML5 history 路由（即 browserRouter）则需要后端配合才行，将所有的 404 请求指向 index.html，这样才能正确应用 react-router。如果不想这么做，可以使用 hash history 方式（即 hashRouter），无须后端配合。 