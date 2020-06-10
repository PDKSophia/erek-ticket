简体中文 | [English](./README.en.md)

<div align='center'>
  <img src='https://github.com/PDKSophia/erek-ticket/raw/master/images/logo.png' width=260 height=130 />
</div>

<div align="center">
  <img src="https://img.shields.io/badge/taro-1.2.13-blue.svg" alt="taro">
  <img src="https://img.shields.io/badge/license-MIT-orange.svg" alt="MIT">
  <img src="https://img.shields.io/badge/react-16.4.1-yellow.svg" alt="react">
  <img src="https://img.shields.io/badge/react--redux-5.0.7-green.svg" alt="redux">
  <img src="https://img.shields.io/badge/redux--logger-3.0.6-red.svg" alt="redux-logger">
  <img src="https://img.shields.io/badge/redux--thunk-2.3.0-yellow.svg" alt="redux-thunk">
</div>

## 介绍

> 一款微信小程序抢票系统，满足 ✈️ 飞机票、 🚄 火车票、🚌 大巴票、🎬 电影票等抢票需求，此项目为博主的毕业设计

> 所有版权均归博主 : 彭道宽

## 技术栈

1. [Taro](https://nervjs.github.io/taro/) 框架，使用 React 风格编写微信小程序
2. React 框架
3. 微信小程序接口调用
4. Redux 管理小程序状态
5. prop-types 、 classnames 等第三方依赖库
6. redux-thunk、redux-logger 等中间件
7. ....

## 目标功能

- [x] 授权登陆
- [x] 飞机航班
- [x] 火车班次
- [x] 大巴班次
- [x] 定位城市
- [x] 订单生成

## 其他功能

- [x] 选取城市 A-Z
- [x] 获取用户设备信息
- [x] Swiper 左右滑动切换 tab
- [ ] 积分赚取
- [ ] 图片懒加载

## 项目环境

> Node 版本 v10.0 以上，微信开发者工具最新版，taro 最新版本

## v1 版本说明

```javascript
    1 : 采用 taro init 初始化项目

    2 : 采用css扩展语言scss

    3 : 统一发送请求，api调用request自定义request进行接口调用

    4 : 对请求错误码做统一处理

    5 : redux的管理化

    6 : 采用 css module 模块化，搭配 classnames/bind 共同使用

    7 : 小程序采用分包模式，分为 主包/购票专栏分包/关于分包

```

## 使用

```javascript
 1 : git clone          // 克隆项目

 2 : cd ticket          // 进入目录

 3 : npm install        // 安装依赖

 4 : npm run dev:weapp  // 启动
```

## 其他说明

```javascript
  个人中心 - 飞机票列表 / 火车票列表 / 大巴票列表 的 Swiper Height 说明

  由于Swiper的height要自适应，不能直接写死，写100%无效，所以采用的是 array.length * 每条的尺寸高度

  但是因为taro默认的设计稿是以 iphone 6 为基础，换算规则为 :

  const DEVICE_RATIO = {
    '640': ' 2.34rpx / 2px ',     // iphone5 ，宽为320px
    '750': ' 2rpx / 2px ',        // iphone6 ，宽为375px
    '828': ' 1.81rpx / 2px '      // iphone6plus， 宽为414px
  }

  换句话说，iphone6 下，css中定义每条item的高度为 100px， 就会换算成 100rpx，即真渲染的时候是50px

  而换成不同机子，比如iphone5，那么就会是按照 2.34 / 2 来换算，css中定义每条item的高度为 100px， 就会换算成 117rpx，真渲染时候是58.5px

  这会导致在iphone6中正常，而iphone5中swiper的height不够，导致显示不完，而在iphone6 plus中height太大，留出一片空白

  解决方法 : wx.getSystemInfo() 接口获取设备信息，根据windowWidth来判断，然后设计稿换算，从而解决问题

```

## 小程序支付说明

[支付需满足以下条件](https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_3&index=1):

- 需要接入 JSAPI 或者 JSSDK 调起微信支付 (✔)

- 需要统一获取到用户的 openId (✔)

- 调起数据签名: appId,nonceStr,package,signType,timeStamp (✔)

- 调起支付页面协议: HTTPS (✔)

- 支付目录: (X)

- 授权域名: (X)

由于未存在授权域名，且域名必须为 `HTTPS`, 得配置 `SSL证书`，固此处仅模拟支付，后期会尝试加入此功能

## 授权登陆流程说明

- 通过 `wx.getSetting()` 接口，判断 `authSetting['scope.userInfo']`是否为空, 是则显示 modal 弹窗引导用户登陆，否则进行 `wx.checkSession()` 接口，判断 `session` 是否失效，如果失效，重新发起登录 `Login` 请求

- session 没失效，则 `wx.getStorageSync('authToken')` 拿到缓存的 token，如果 token 存在，就不请求，不存在则请求 Login

- 请求授权，触发 `Login()` 方法，然后当你的 `data.normalResult.code === 200` 后，调用 `wx.setStorageSync(data.loginCode)` 缓存，接着通过 `wx.getUserInfo()` 拿用户信息

- 拿到用户信息，然后进行渲染，全程和后端的沟通链接就是在 `Login(code)` 这个方法，而在我如果 `session` 没过期的情况，并且 `wx.getStorageSync('authToken')` 能拿到缓存的 token 情况下，我直接 `wx.getUserInfo()` 拿用户信息了，即授权登陆这边不关服务器的事情，所以这时候是没有 money 的。

- 解决方法: 初次登陆进行授权，然后 `wx.getUserInfo()` 拿用户信息，把这个信息发给你，你存在用户表中，然后如果我 session 没过期的情况，并且 `wx.getStorageSync('authToken')` 能拿到缓存的 token 情况下，我不通过 `wx.getUserInfo()` 拿用户信息，而是请求后端，拿用户数据，这时候就用 money 了

### 优化点

- 通过 `Block` 块的概念，由于 React 特性，在每一个组件中，必须有一个根`<div>`，在这里通过 `Block` ，优化项目，减少了一层 DOM 节点

- 不在组件中直接 `list.map`，原因是，可能 list 中只是修改了值，但是由于 react 是浅比较，并且在 react 中，如果 state 或者 props 发生改变，当前组件包括子组件重新渲染，这样的话不断渲染会导致性能问题，将 list 列表抽象成一个组件，然后传递 props list 即可，react 在渲染的时候，diff 比较的时候会认为并没有改变，这样就不会重新渲染了。(比如 name: 1 => 改为 name = 2，react 认为是没改变的)

- 搜索航班列表页，点击至某航班详情页，通过 taro 新增的 [this.\$preload](https://github.com/NervJS/taro/commit/ae4ad6d) 进行页面之间传递数据，减少对 redux 的使用

### redux 的设计

- 关于 redux 状态在 `src/redux` 中，不存在于 store 里，关于 redux 的设计，共分为 `global`

- 对于所有的 redux 操作，经过 utils 中的 process 操作，剔除部分不需要的数据，扁平化数据，是的 redux 在比较的时，只需要比较前两三层即可，否则后端返回层次较深的一个树状级的数据，会导致比较的时候会太慢

### 小程序体验二维码 (体验版，需联系管理员添加用户)

<img src="https://github.com/PDKSophia/erek-ticket/raw/master/images/ticket.jpg" width=120 height=120>
