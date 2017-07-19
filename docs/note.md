1. path.join()：用于连接路径
2. path.resolve()：用于将相对路径转为绝对路径，函数参数的行为类似逐级 cd 进入，返回最后一个路径的绝对路径
3. 如果 webpack 提示 `webpack-dev-server ERROR in TypeError: Cannot read property '0' of undefined` 或 `You may need an appropriate loader to handle this file type.` 类似错误，先排查一下是否安装了相关依赖包
4. 注意 webpack resolve alias 中的路径，确定最终绝对路径的正确性，尽量避免 `path.resolve()` 和 `path.join()` 混合使用