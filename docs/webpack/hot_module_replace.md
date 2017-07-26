# Hot Module Replacement

Hot Module Replacement (HMR) 在程序运行的情况下可以改变，添加或移除依赖模块（modules），而不需要页面重新加载。可以显著的提高开发效率，如下：
1. 保持住程序状态，相反的刷新页面则会丢失。
2. 节省宝贵的开发时间，只在有需要的时候才需要更新。
3. 样式更新更快，几乎可以比得上在浏览器的 debugger 窗口更新的速度。

> 这里说的模块是指包含 hot module replacement 功能的 loader 和 plugin 的模块，即 loader 编译后无需刷新页面，而是自动*更新替换*浏览器加载的资源。

## How It Works

