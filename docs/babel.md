# babel related

## 配置环境
1. 先安装 babel 初始化依赖包：`npm install --save-dev babel-loader babel-core`
2. 使用 env preset ，转换 ES2015+ 语法：`npm install babel-preset-env --save-dev`
3. 配置 .babelrc 文件，应用 plugins ：`{ "presets": ["env"] }`
4. 安装 react 编译工具依赖：`npm install --save-dev babel-cli babel-preset-react`
5. 在 .babelrc 中添加 react plugin ：`{ "presets": ["env", "react"] }`
6. 安装 HTML Webpack Plugin ，用来将生成的 bundle assets 集成到 html 文件中：`npm i --save-dev html-webpack-plugin`
7. 安装 webpack-dev-server ，创建前端服务：`npm i --save-dev webpack-dev-server`
8. 安装 style-loader ，用来将 css 文件插入到 DOM 中 style 标签内：`npm install --save-dev style-loader`
  a. 需要与 css-loader 配合使用
  b. 通常也需要与 file-loader/url-loader 配合使用，解决 css 文件内图片，字体文件资源的引用问题
9. 安装 css-loader ，用来将 css 文件中的 @import 和 URL() 路径通过 require/import 的方式引入 js 文件内，这样可以应用 webpack 中 resolve-alias 等工具函数：`npm install --save-dev css-loader`
10. 安装 file-loader 和 url-loader ，用来处理 css 文件中图片字体资源的引入：`npm i --save-dev file-loader url-loader`
  a. file-loader 用来将 css 文件中的引入文件，如 @import，url() 等引入内容提取出来构建到输出目录
  b. url-loader 是对 file-loader 的封装，可以将小于某一阈值的文件转换成 baseURL 格式直接嵌入文件中
11. 安装 extract-text-webpack-plugin ，将 css 文件内容抽取出来独立合并到一个文件中（对比与 style-loader 方式直接插入 header 中）：`npm i --save-dev extract-text-webpack-plugin`
12. 安装 less-loader ，注意单独安装 less 作为依赖（好处是可以做到版本控制）， `npm install --save-dev less-loader less`