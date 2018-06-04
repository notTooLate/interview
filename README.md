# www

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
## 项目说明

``` bash
项目是vue+webpack构建的单页面应用，采用了vue-route、vuex、axios以及ES6语法，采用组件化思想搭建
整个项目，从而使组件高度复用，代码十分简洁。其中UI使用了vux部分组件，better-scroll作为页面滚动
及上拉加载下拉刷新，vue-lazyload图片懒加载，echarts图表等。首页采用CDN加载资源，路由使用懒加载
，减小首次加载资源，提高首屏打开速度。

项目架构：
1.使用vue框架，以及vue-router构建单页面应用。 
2.使用vue+webpack构建项目环境。 
3.采用手机淘宝适配方案Flexible。
4.使用阿里矢量图标库。

调试和测试工具：
1、vconsole
2、postman
3、mock.js
4、Fiddler 2

```
ps:此项目所有请求均为easy-mock上的模拟数据。

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
