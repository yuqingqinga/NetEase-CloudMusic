#### 文件目录结构说明
+ assets: 存放项目资源，包括css，img，font等
+ common：公共的数据、常量等
+ components：多个页面间共享的组件
+ pages：划分各个页面
+ router：路由配置
+ services：网络请求
+ store：redux合并
+ utils：js的工具
##### 导入文件的规范
1. 导入第三方模块（最上）
2. 功能性东西（网络请求，actionCreators、utils）
3. 导入组件

**本项目使用React.memo()来帮助我们控制何时重新渲染组件。组件仅在它的 props 发生改变的时候进行重新渲染。通常来说，在组件树中 React 组件，只要有变化就会走一遍渲染流程。但是通过 PureComponent 和 React.memo()，我们可以仅仅让某些组件进行渲染，从而提升性能。PureComponent 用于类组件，React.memo()用于函数组件**

####  css重置
安装normalize.css `yarn add normalize.css`，并通过`@import "~normalize.css"; `模块化导入。

#### 项目配置别名
1.  `yarn add @craco/craco`
2. 在package.json内修改项目启动配置
![原package.json](https://upload-images.jianshu.io/upload_images/17839328-03ba297f917fd83d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![修改后](https://upload-images.jianshu.io/upload_images/17839328-0046e0f7cf022fd4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
3. 在根目录下创建craco.config.js添加配置
4. 重新启动该项目
#### 项目结构划分
##### 添加路由
+ `yarn add react-router-dom`
+ 使用`yarn add react-router-config`将所有路由配置统一管理
+ 使用`renderRoutes`函数完成配置
+ 网易云音乐使用HashRouter
#### AppHeader和AppFooter布局
+ 安装`yarn add style-components`，编写css样式
+ 导航栏采用flex布局
+ 导航栏前三项为路由跳转，后三项为超链接跳转
+ 导航栏选项卡提前配置成数组数据，在`local-config.js`文件内导出，使用时只需要遍历数组即可
+ 搜索框使用antdesign  `yarn add antd` 
引入`yarn add @ant-design/icons`，使用图标库
`@import "~ant/dist/antd.css";`在reset.css内引入
#### discover子路由的搭建和配备
+ discover文件夹下创建c-pages文件夹，放入子组件
+ 项目中引入axios发送网络请求 `yarn add axios`
#### 使用Hooks useState和axios获取数据
#### 使用antDesign组件制作轮播图（走马灯）
+ 轮播图背景图：高斯模糊图片；是由原图片拼接上`"?imageView&blur=40x20"`后得到。
### 轮播图下内容制作
+ 将每个相似样式的标题组件抽出到公共组件中，`components`文件夹下`theme-header-rcm`文件夹中
+ 热门推荐中每个歌曲封面相同样式也抽到公共组件中，`components`文件夹下`songs-sover`文件夹中
+ 对音乐播放量数字处理的函数`getCount()`写在`utils`文件夹的`format-utils.js`文件内
+ 优化页面性能：图片大小优化（对获取到的封面图片大小处理的函数`getSizeImage()`也写在`utils`文件夹的`format-utils.js`文件内）
### 新碟上架
+ 新碟上架的分页效果采用轮播图方法制作
### 榜单
+ 榜单的自定义组件也在components文件夹内的top-ranking文件内
### 播放音乐
+ 使用h5新增audio标签播放音乐，通过增加点击事件播放音乐；使用antd的滑动输入条组件更改样式模仿

+ 使用audio标签中的onTimeUpdate={CurrentTime}属性获得当前音乐播放时间，利用useState()保存音乐进度时间

+ 实时更新进度条：antd的滑动输入条自带value={progress}属性，可以实时更新进度

+ 新增`const [isChanging, setIsChanging] = useState(false);`来判断当前进度条是否正在改变，以便于当用户正在播放音乐并滑动滚动条时，滚动条可以滑动
+ 利用antd的滑动输入条自带onChange和onAfterChange的API可以得到进度条滑动的位置和滑动后结束的位置
![antd滑动输入条API](https://upload-images.jianshu.io/upload_images/17839328-e1f7b6f19faa21fb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

+ useCallback()使用：当把一个回调函数传入到自定义组件内部的时候用其做一个包裹；目的是不希望子组件进行多次渲染；是为了进行性能的优化
isPlaying,playMusic] )

+ 播放和暂停播放

### 音乐播放工具栏的实现
+ 逻辑为：当点击推荐音乐的榜单组件内每个歌曲的播放图标时，判断该歌曲是否在播放列表内，如果不在则添加该歌曲到播放列表内并播放该歌曲；如果在则获取该歌曲在列表中的位置，将其位置放在最顶端，并播放该歌曲。
+ 跨组件间的事件传递使用到了事件总线，安装events`yarn add events`
**events常用的API：**
    - 创建EventEmitter对象：eventBus对象；
    - 发出事件：eventBus.emit("事件名称", 参数列表
    - 监听事件：eventBus.addListener("事件名称", 监听函数)；
    - 移除事件：eventBus.removeListener("事件名称", 监听函数)；

