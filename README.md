# 快速构建新项目前端目录

* 安装Yeoman，Gulp。 `npm install --g yo gulp-cli`
* 进入待构建目录，`yo yiju:new` 输入项目名称 。
* 选择需要的框架（多选：jQuery，Bootstrap），使用空格选择是否选中。
* 选择需要的插件（多选），使用空格选择是否选中。
* 选择是否使用sass（单选）。
* 自动开始安装gulp依赖node包。
* `gulp serve` 开启server服务、sass编译、eslint代码效验。
* `gulp sass` 监听sass编译。
* `gulp lint` 代码验证。
