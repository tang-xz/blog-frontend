# babel related

## 配置环境
1. 先安装 babel 初始化依赖包：`npm install --save-dev babel-loader babel-core`
2. 使用 env preset，转换 ES2015+ 语法：`npm install babel-preset-env --save-dev`
3. 配置 .babelrc 文件，应用 plugins：`{ "presets": ["env"] }`
4. 安装 react 编译工具依赖：`npm install --save-dev babel-cli babel-preset-react`
5. 在 .babelrc 中添加 react：`{ "presets": ["env", "react"] }`
6. 安装 HTML Webpack Plugin，用来将生成的 bundle 集成到 html 文件中：`npm i --save-dev html-webpack-plugin`
7. 安装 webpack dev server，创建前端开发环境：`npm i --save-dev webpack-dev-server`