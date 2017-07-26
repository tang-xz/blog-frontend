1. hot-module-replacement 当前只是简单的在 cli 里面添加了 --hot，这样用无须用户手动处理。需要深入了解其机制。https://webpack.js.org/configuration/dev-server/#devserver-hot
√ 2. 需要后端配合处理前端不能匹配的路由地址，即前端 react-router 中未定义的。如：404 page。