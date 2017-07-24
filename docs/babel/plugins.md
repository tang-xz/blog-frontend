# Babel Plugins

Babel 是编译器。编译代码的过程中执行3个阶段：语法解析（parsing）, 转换（transforming）和 生成（generation），类似其他编译器一样。

>
如果想了解一个 厉害的/简易版 的编译器指南，可以查看 [the-super-tiny-compiler](https://github.com/thejameskyle/the-super-tiny-compiler)，里面解释了 babel 是怎么工作的。

Babel 主要执行了 `const babel = code => code;` 操作，解析代码然后生成相似代码并返回。

你需要一些插件（plugins）来使 babel 处理一些特定的问题（插件主要是在第2阶段起作用 - 转换）。


## 预置（Presets）

不想聚集你自己的 plugins（Don’t want to assemble your own set of plugins）？没问题，预置共享 `.babelrc` 配置，或者简单的定义一组 plugins 数组即可。

### 官方的预置

官方针对通用场景，提供了一些预置集合：

>
过去的‘每年的’预置只提供了当年被批准的编译语法。`babel-preset-env` 可以替代 es2015，es2016，es2017 和 最新的。

- env
- es2015
- es2016
- es2017
- latest (deprecated in favor of env)
- react
- flow

### 阶段-X（实验性质的预置）（Stage-X (Experimental Presets)）

所有在 stage-x 预置阶段的转换，都是在变更中，还没有被最新发布的 javascript 正式引入的特性（如：es6/es2015）。

>
变更中的特性 - 指的是那些正在开发中，希望被添加到标准中的，已经提出参考方案至实现完整说明的新功能。

> ⚠️ 注意：        
使用这些特性一定要谨慎，尤其是在 stage-3 中的特性。我们的计划是：被提出的建议特性已经通过 TC39 大会后才会更新到 stage-x 中。

TC39 的建议书类别有如下几个阶段：

- Stage-0 - 稻草人：只是一个想法，可能有 Babel 插件
- Stage-0 - 建议的（proposal）：值得花费精力的
- Stage-0 - 草稿：初步细化说明
- Stage-0 - 候选人：有完整的说明书，浏览器开始兼容实现
- Stage-0 - 完结的：会被添加到下一次年度发版中

## 转换插件（Transform Plugins）

在代码中应用转换功能

>
转换插件会允许相应的语法功能，即只需要引用需要的即可，不用全部引入。

### ES3
es3-member-expression-literals
es3-property-literals

### ES5
es5-property-mutators

### ES2015
- check-es2015-constants
- es2015-arrow-functions
- es2015-block-scoped-functions
- es2015-block-scoping
- es2015-classes
- es2015-computed-properties
- es2015-destructuring
- es2015-duplicate-keys
- es2015-for-of
- es2015-function-name
- es2015-literals
- es2015-object-super
- es2015-parameters
- es2015-shorthand-properties
- es2015-spread
- es2015-sticky-regex
- es2015-template-literals
- es2015-typeof-symbol
- es2015-unicode-regex

### ES2016
- exponentiation-operator

### ES2017
- async-to-generator

### Modules
- es2015-modules-amd
- es2015-modules-commonjs
- es2015-modules-systemjs
- es2015-modules-umd

### Experimental
- async-generator-functions
- async-to-module-method
- class-constructor-call (deprecated)
- class-properties
- decorators
- do-expressions
- export-extensions
- function-bind
- object-rest-spread

### Minification（压缩）
Check out [our minifier based on Babel](https://github.com/babel/babili)!
These plugins are in the minify repo.

- inline-environment-variables
- inline-consecutive-adds
- member-expression-literals
- merge-sibling-variables
- minify-booleans
- minify-constant-folding
- minify-dead-code-elimination
- minify-flip-comparisons
- minify-guarded-expressions
- minify-infinity
- minify-mangle-names
- minify-numeric-literals
- minify-replace
- minify-simplify
- minify-type-constructors
- node-env-inline
- property-literals
- regexp-constructors
- remove-console
- remove-debugger
- simplify-comparison-operators
- undefined-to-void

### React
- react-constant-elements
- react-display-name
- react-inline-elements
- react-jsx
- react-jsx-compat
- react-jsx-self
- react-jsx-source

### Other
- eval
- flow-comments
- flow-strip-types
- jscript
- object-assign
- object-set-prototype-of-to-assign
- proto-to-assign
- regenerator
- runtime
- strict-mode

## “杂项”插件（Misc Plugins）
- external-helpers
- undeclared-variables-check

## 语法插件（Syntax Plugins）

todo 未完待续...










