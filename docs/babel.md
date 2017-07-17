# babel related

## 配置环境
1. 先安装 babel 初始化依赖包：`npm install --save-dev babel-loader babel-core`
2. 使用 env preset，转换 ES2015+ 语法：`npm install babel-preset-env --save-dev`
3. 配置 .babelrc 文件，应用 plugins：`{ "presets": ["env"] }`
4. 安装 react 编译工具依赖：`npm install --save-dev babel-cli babel-preset-react`
5. 在 .babelrc 中添加 react：`{ "presets": ["env", "react"] }`