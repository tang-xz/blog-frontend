
## plugins
1. Babel 是一个编译器，先解析代码语句然后转换后返回相同功能的代码。
2. babel 中预置了插件集合，叫做 presets。通过在 `.babelrc` 中配置实现。`babel-preset-env` 集合了 es2015, es2016, es2017 和 最新的特性（好像不全是）。
3. Stage-X 中包含的是实验性质的特性， TC39 大会将特性分类，对应于 stage-0， stage-1， stage-2， stage-3， stage-4。0 表示只是想法，4 表示提议通过，等待加入规范。
4. 如果不想用整合的插件 preset，可以单独的使用 plugins，每个 plugins 里包含了特定的功能特性。如果需要代码混淆则特别注意（未完待续）
5. 语法插件是用来解析某一类型的语法，而不是转化它，比如：jsx，flow等。在某些转换插件中已经自动继承或应用了语法插件，则无需特别指定。
6. plugins/presets 的路径，默认如果使用 npm 可以不用指定路径。
7. plugins/presets 的顺序，这个尤其要注意！这么做是为做到向后兼容。顺序如下：
  a. plugins 在 presets 前执行
  b. plugins 的执行顺序是从前向后
  c. preset 的执行顺序是相反的（从后向前）
8. plugins 和 presets 都可以定义 options
9. babel preset 可以针对使用场景和宿主进行优化。因为主流浏览器已经开始支持部分 es6 的特性，如果只是全部转换成 es5，不但文件尺寸大浪费资源，也有可能应用不到新语法的特性和性能优势。