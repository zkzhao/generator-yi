var generators= require('yeoman-generator');
var chalk = require('chalk');
var mkdirp = require('mkdirp');
module.exports= generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this,arguments);
  },
  prompting: function () {
    var _this=this;
    var done= this.async();
    var prompts=[{
      type: 'input',
      name: 'name',
      message: '1、新项目叫什么名字？'
    },{
      type: 'checkbox',
      name: 'frame',
      message: '2、请选择需要的框架（多选）：',
      choices: [{
        name: 'jQuery',
        value: 'includeJquery',
        checked: true
      },{
        name: 'Bootstrap',
        value: 'includeBootstrap',
        checked: true
      }]
    },{
      type: 'checkbox',
      name: 'js',
      message: '3、请选择需要的插件（多选）：',
      choices: [{
        name: '表单验证',
        value: 'includeValidate',
        checked: false
      },{
        name: '日历',
        value: 'includeDatepicker',
        checked: false
      },{
        name: 'toastr提示窗',
        value: 'includeToastr',
        checked: false
      },{
        name: 'font-awesome图标字体',
        value: 'includeAwesome',
        checked: false
      }]
    },{
      type: 'list',
      name: 'css',
      message: '4.请选择你需要的（单选）：',
      choices: ['css','sass']
    }];
    this.prompt(prompts,function(answers){
      var frame = answers.frame, js= answers.js;
      function hasFrame(feat){
        return frame && frame.indexOf(feat)!==-1;
      }
      function hasJS(feat){
        return js && js.indexOf(feat)!==-1;
      }
      _this.includeJquery= hasFrame('includeJquery');
      _this.includeBootstrap= hasFrame('includeBootstrap');
      _this.includeValidate= hasJS('includeValidate');
      _this.includeDatepicker= hasJS('includeDatepicker');
      _this.includeToastr= hasJS('includeToastr');
      _this.includeAwesome= hasJS('includeAwesome');
      _this.includeSass=  answers.css=='sass'; 
      _this.includeName= answers.name;
      done();
    });
  },
  writing:{
    copyFolder: function(){
      mkdirp('asset/images');
      mkdirp('asset/scripts');
      mkdirp('asset/styles');
      mkdirp('asset/vendors');
    },
    copyFiles: function(){      
      if(this.includeJquery){
        this.fs.copy(
          this.templatePath('../../lib/jquery.min.js'),
          this.destinationPath('asset/vendors/jquery.min.js')
        );
      }
      if(this.includeBootstrap){
        this.fs.copy(
          this.templatePath('../../lib/bootstrap'),
          this.destinationPath('asset/vendors/bootstrap')
        );
      }
      if(this.includeValidate){
        this.fs.copy(
          this.templatePath('../../lib/jquery.validate.min.js'),
          this.destinationPath('asset/vendors/jquery.validate.min.js')
        );
      }
      if(this.includeDatepicker){
        this.fs.copy(
          this.templatePath('../../lib/eonasdan-datetimepicker'),
          this.destinationPath('asset/vendors/eonasdan-datetimepicker')
        );
      }
      if(this.includeToastr){
        this.fs.copy(
          this.templatePath('../../lib/toastr'),
          this.destinationPath('asset/vendors/toastr')
        );
      }
      if(this.includeAwesome){
        this.fs.copy(
          this.templatePath('../../lib/font-awesome'),
          this.destinationPath('asset/vendors/font-awesome')
        );
      }
      this.fs.copy(
        this.templatePath('../../lib/respond.min.js'),
        this.destinationPath('asset/vendors/respond.min.js')
      );
      this.fs.copy(
        this.templatePath('../../lib/html5shiv.min.js'),
        this.destinationPath('asset/vendors/html5shiv.min.js')
      );
      this.fs.copy(
        this.templatePath('base.css'),
        this.destinationPath('asset/styles/base.css')
      );
    },
    gulpfile: function () {
      this.fs.copyTpl(
        this.templatePath('gulpfile.js'),
        this.destinationPath('gulpfile.js'),
        {
          includeSass: this.includeSass
        }
      );
    },
    packageJSON: function(){
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {
          includeName: this.includeName,
          includeSass: this.includeSass
        }
      );
    },
    editorConfig: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
    },
    html: function(){
      this.fs.copyTpl(
        this.templatePath('index.html'),
        this.destinationPath('index.html'),
        {
          includeJquery: this.includeJquery,
          includeBootstrap: this.includeBootstrap,
          includeValidate: this.includeValidate,
          includeDatepicker: this.includeDatepicker,
          includeToastr: this.includeToastr,
          includeAwesome: this.includeAwesome,
          includeName: this.includeName
        }
      );
    }
  },
  install: function(){
    this.npmInstall();
  },
  end: function(){
    this.log(chalk.green.bold('感谢您使用')+chalk.blue.bold('yi')+chalk.green.bold('构建系统！'))
  }
});