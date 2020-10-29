# react-mini-virtrual-list

## 项目安装和依赖说明
```
说明：react16.8, react-router4.x以上
依赖：下载项目后在项目根目录运行命令：
      1. 设置依赖镜像源：
         如果镜像源为国内淘宝镜像https://registry.npm.taobao.org,则:
           npm config set registry https://registry.npm.taobao.org
           或cnpm config set registry https://registry.npm.taobao.org
           或yarn config set registry https://registry.npm.taobao.org
         如果镜像源为yarn官方镜像https://registry.yarnpkg.com,则:
           yarn config set registry https://registry.yarnpkg.com
      2. 下载所有的依赖： npm install 或 cnpm install 或yarn install
```
### 项目运行说明
```
npm run dev 运行项目
npm run build 打包
npm run eslint 检查js规范
npm run csslint 检查css规范
```
### 组件说明
```
轻量级虚拟列表
实现原理：在数据渲染之前根据设定的尺寸进行计算需要渲染的索引项，然后开始渲染
适用场景: 一次性加载巨量数据时使用
特点: 1. 支持可视区域内的渲染,可视区域外的将会被卸载
      2. 支持自定义渲染数据, 但需要指定尺寸itemSize
      3. 支持横向和竖向的滚动
```
### API
待说明(或看代码说明)
### example
```
import VirtualList from 'react-mini-virtrual-list';
<VirtualList
   width="auto"
   // scrollToAlignment="start"
   // scrollToIndex={30}
   scrollOffset={500}
   height={400}
   limit={200}
   dataSource={this.state.dataSource}
   renderItem={this.renderItem}
   onItemsRendered={this.renderOn}
   itemSize={50}
   className="VirtualList"
  />
```
### 目录说明和相应规范
```
    |-- .babelrc //babel配置文件
    |-- .eslintrc.js //eslint规则配置
    |-- .gitignore  // git提交忽略
    |-- .prettier.config.js //prettier插件配置信息
    |-- .stylelintrc.js // stylelint插件配置信息
    |-- package.json
    |-- postcss.config.js // postcss配置信息
    |-- tsconfig.json // ts配置
    |-- example
    |   |-- pages // 示例代码
    |   |   |-- index.js // 入口js
    |   |-- routes // 路由所在文件夹
    |   |-- utils   // js工具方法
    |-- lib // 打包代码
    |-- public // 模板
    |-- src // 源文件
    |-- less         // 全局的基础css配置文件夹, 全局样式写在这里
    |   |-- base   // 基础原子标签样式和公共基础类
    |   |-- components // ui组件库的自定义样式(自定义组件和开源ui组件)
    |   |-- constants // 公共的less常量
    |   |-- pages  // 页面业务相关的公共类
    |       |-- index.less
    |-- static     // 打包时要拷贝的静态资源, 需要在webpack/configs文件中配置引用路径后才能生效
    |-- webpack   // webpack配置文件夹
        |-- configs.js  // 自定义配置
        |-- webpack.dev.js // 开发环境
        |-- webpack.prod.js // 生产环境
```
