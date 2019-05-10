# TickNet 技术分享与百词斩实习总结

## 自我介绍

- github : https://github.com/PDKSophia

- 书单 : https://github.com/PDKSophia/read-booklist

- 博客: https://github.com/PDKSophia/blog.io

- 掘金: https://juejin.im/user/594ca8a35188250d892f4139/posts

- 邮箱 : 1063137960@qq.com

## 主要流程

- [技术分享](##技术分享)
  - [代码编程规范?](###代码编程规范)
  - [什么是前后端分离?](###什么是前后端分离)
  - [如何在众多编程语言中找到归属感?](###如何在众多编程语言中找到归属感)
- [实习总结](##实习总结)
  - [在公司里学到了什么?](###在公司里学到了什么)
  - [遇到问题该如何去排查?](###遇到问题该如何去排查)
  - [如何独立去做一个开源项目?](###如何独立去做一个开源项目)
- [其它相关](##其他相关)
  - [我认为大学哪些课程重要?](###我认为大学哪些课程重要)
  - [该如何提高自己的技术水平?](###该如何提高自己的技术水平)
- [答疑阶段](##答疑阶段)

---

## 技术分享

### 代码编程规范

其实，我们有时候看别人的代码，一坨乱七八糟的，如果你以后去了公司，你写的代码或者你接管的代码，没采用一些规范去约束的话，你会发现，真的，贼鸡儿难受。举个例子:

👉 未经过命名规范或者 css、js 规范的代码，是这样的 :

```html
<button class="button_main">
  主操作
</button>
<button class="button_success">
  成功按钮
</button>
<button class="button_danger">
  危险按钮
</button>
```

```css
.button_main {
  display: inline-block;
  border-radius: 3px;
  padding: 7px 12px;
  border: 1px solid #d5d5d5;
  background-image: linear-gradient(#eee, #ddd);
  font: 700 13px/18px Helvetica, arial;
}
.button_success {
  display: inline-block;
  border-radius: 3px;
  padding: 7px 12px;
  border: 1px solid #d5d5d5;
  background-image: linear-gradient(#eee, #ddd);
  font: 700 13px/18px Helvetica, arial;
  color: #fff;
  background: #569e3d linear-gradient(#79d858, #569e3d) repeat-x;
  border-color: #4a993e;
}
.button_danger {
  display: inline-block;
  border-radius: 3px;
  padding: 7px 12px;
  border: 1px solid #d5d5d5;
  background-image: linear-gradient(#eee, #ddd);
  font: 700 13px/18px Helvetica, arial;
  color: #900;
}
```

❤ 当我们使用了符合 `BEM 理论规范` 规范了之后，我们再看代码:

```html
<button class="button">
  主操作
</button>
<button class="button button--state-success">
  成功按钮
</button>
<button class="button button--state-danger">
  危险按钮
</button>
```

```css
.button {
  display: inline-block;
  border-radius: 3px;
  padding: 7px 12px;
  border: 1px solid #d5d5d5;
  background-image: linear-gradient(#eee, #ddd);
  font: 700 13px/18px Helvetica, arial;
}
.button--state-success {
  color: #fff;
  background: #569e3d linear-gradient(#79d858, #569e3d) repeat-x;
  border-color: #4a993e;
}
.button--state-danger {
  color: #900;
}
```

是不是好看了很多，并且我们学会了`抽离`(做通用组件的必备)技巧，将`button`样式抽离了出来。

说完了`html`和`css`之后，我们再来说说`javascript`，这就不多说了，直接去搜一下，`ESLint 中的 standard` 规范

---

### 什么是前后端分离

**核心思想是前端 html 页面通过 ajax 调用后端的 restuful api 接口并使用 json 数据进行交互。**

- Web 服务器：一般指像 nginx，apache 这类的服务器，他们一般只能解析静态资源。

- 应用服务器：一般指像 tomcat，jetty，resin 这类的服务器可以解析动态资源也可以解析静态资源，但解析静态资源的能力没有 web 服务器好。

我们要知道一点就是: 作为后端工程师，追求的是：三高（高并发，高可用，高性能），安全，存储，业务等等。前端工程师追求的是：页面表现，速度流畅，兼容性，用户体验等等。

下边以 ThinkPHP 举个例子，采用的是 `MVC` 设计模式，`M-Model`、`V-View`、`C-Controller`，也就是说，我们还是在`Controller`中写逻辑，它接受请求，并根据请求信息将它们分发不同的`View`层去渲染页面，而 HTML 页面中嵌套着 PHP 的代码。

#### ⚠ 会有什么问题？

1. 动态资源和静态资源全部耦合在一起，服务器压力大，因为服务器会收到各种 http 请求，例如 css 的 http 请求，js 的，图片的等等。一旦服务器出现状况，前后台一起玩完，用户体验极差。

2. 前端工程师只负责将 UI 设计图写成 HTML，之后需要由后端工程师来将 HTML 套到 PHP 页面，出错率较高（因为页面中经常会出现大量的 js 代码），并且修改问题时需要双方协同开发，效率低下。

3. PHP 内有较多标签和表达式，前端工程师在修改页面时会遇到很多痛点。

4. 需要前端工程师使用后端的环境和 IDE，比如后端采用 java，那么你需要`eclipse`，以及需要配置各种后端的开发环境

5. 如果集成前端和后端出现了问题，ok，前端返工，然后修改，接口出错，也要修改，之后二次集成，如果仍出现问题，继续如上诉操作

。。。。。。。。

不说了，问题真的很多，所以，知道为什么要`前后端`分离了吧？

ok，那怎样进行前后端分离 ?

- 从代码上分离，从部署上分离，从后端只提供数据，渲染由前端控制分离

- 前端只做前端的事情，后端只做后端的工作，一切的沟通，通过发起请求如 `jQuery的 Ajax`, `Vue 的 Axios`，`Fetch` 进行联系

- 前端可通过与后端协商，可在 `rap2`、`swagger` 等接口管理工具上，书写及管理接口，之后按照这个进行开发即可

- 前端在前期时，可通过 `Mock.js` 进行模拟，通过判断当前环境是否是本地还是线上，本地则请求本地模拟数据，线上则请求线上 Restful API

- 后端在设计开发接口，可通过 `Postman` 进行接口的测试

- 这样工作量是并行开发，而不是谁等谁，然后集成时候，只需要将请求接口的 URL 替换即可

---

### 如何在众多编程语言中找到归属感

（....就不打字了）

---

## 实习总结

### 在公司里学到了什么

`眼界`、`主动承担`、`学会看源码`、`读老大代码` ....

---

### 遇到问题该如何去排查

切记 : `沉着冷静`

一遍一遍排查代码，从头走一遍逻辑流程，我举个例子:

👇 下边以微信授权登陆为例子

```javascript
  // html 文件

  import { authToken } from '@service/api'

  // 生命周期
  componentDidShow() {
    if (process.env.NODE_ENV === 'development') {
      Taro.getSetting().then(res => {
        if (!res.authSetting['scope.userInfo']) {
          this.setState({
            showAuthModal: true
          })
        } else {
          Taro.checkSession()
            .then(() => {
              // 判断session是否失效，如果失效，重新发起登录
              const token = Taro.getStorageSync('authToken')
              // this.login()  // 开发者工具和手机环境出现冲突，就使用这个方法重新token
              if (!token) {
                this.login()
              } else {
                this.props.dispatch(userActions.retrieveUserInfo())
              }
            })
            .catch(() => {
              // session失效，重新登录
              this.login()
            })
        }
      })
    }
  }

  login = () => {
    Taro.showLoading({
      title: '加载中',
      mask: true
    })
    Taro.login()
      .then(async res => {
        const code = res.code
        const user = await Taro.getUserInfo()
        let options = {
          nickname: user.userInfo.nickName,
          avatar: user.userInfo.avatarUrl,
          code: code
        }
        return authToken(options)
      })
      .then(async result => {
        await Taro.setStorageSync('authToken', result.token)
        this.props.dispatch(userActions.retrieveUserInfo())
      })
      .then(
        () => {
          Taro.hideLoading()
        },
        () => {
          Taro.hideLoading()
        }
      )
  }
```

```javascript
// API文件
// 用户模块
/**
 * @desc 通过code换取openId，返回token
 * @param  {Object} options
 * @return {[type]}
 */
export const authToken = options => {
  return request(
    {
      url: `${baseUrl}/api/login/oauth-code`,
      method: 'POST',
      data: options,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    },
    Taro.request,
    false
  )
}
```

不要慌，我们理下逻辑

- 通过 `Taro.getSetting()` 接口，判断 `authSetting['scope.userInfo']`是否为空, 是则显示 modal 弹窗引导用户登陆，否则进行 `Taro.checkSession()` 接口，判断 `session` 是否失效，如果失效，重新发起登录 `Login` 请求

- session 没失效，则 `Taro.getStorageSync('authToken')` 拿到缓存的 token，如果 token 存在，就不请求，不存在则请求 Login

- 请求授权，触发 `Login()` 方法，然后当你的 `data.code === 1` 后，调用 `Taro.setStorageSync(data.loginCode)` 缓存，接着通过 `Taro.getUserInfo()` 拿用户信息

- 拿到用户信息，然后进行渲染，全程和后端的沟通链接就是在 `Login(code)` 这个方法，而在我如果 `session` 没过期的情况，并且 `Taro.getStorageSync('authToken')` 能拿到缓存的 token 情况下，我直接 `Taro.getUserInfo()` 拿用户信息了，即授权登陆这边不关服务器的事情

- 所以在初次登陆进行授权，然后 `Taro.getUserInfo()` 拿用户信息，把这个信息发给你，你存在用户表中，然后如果我 session 没过期的情况，并且 `Taro.getStorageSync('authToken')` 能拿到缓存的 token 情况下，我不通过 `Taro.getUserInfo()` 拿用户信息，而是请求后端，拿数据库中用户的数据

👆 上述的逻辑搞懂了之后，假设我们这里一直报错，那可咋整，记住了，**沉着冷静**，一步一步排查

1. 首先，先查看 NetWork，判断是否向后端发送了请求

2. 确定请求是否发送，如果发送了，可将问题缩小到请求这里，然后检查 API 的 URL、params、request body 等是否跟后端需要的一致，比如 404，那就是 URL 不对，比如 400，那就是后端无法理解前端请求的格式，也就是传参错误，那么如果检查都 ok 了，然后报 500 错误，那就是后端的问题，你找后端背锅

3. 如果请求没发送，那么说明问题就出在请求发送之前，将请求发送前的那段代码再读一读，如果实在不知道问题在哪，那就一步一步的 debug，比如一步一步的`console.log('打印些啥?')`打印，如果上一个 debug 打印了出来，而中间隔的两行代码后，再次打印，发现没打印出来，说明问题就在这两行代码了。

4. 一步一步排查，如果代码量很大，那么，你可以采用二分法，先从中间打印，然后...你懂的。

5. 如果发现你的逻辑没问题，但是就是不发送请求，可以转换一下角度，可能问题在 `api.js` 文件中，然后再次排查，如果 `api.js` 文件没问题，那就可能在 `request.js` 文件中

---

### 如何独立去做一个开源项目

其实我在百词斩实习了那么久，第一次做项目组的后台管理，采用的 [pro-ant-design](https://github.com/ant-design/ant-design-pro) 快速开发框架，感觉还挺爽，虽然很多代码都看不懂，但是开发效率也是快了一些，于是心血来潮，仿者做了一个 vue 的快速开发框架 👉 [vue-erek-manage](https://github.com/PDKSophia/vue-erek-manage) ，并且还基于了这么个垃圾玩意，做了自己毕业设计的后台管理，实在是想吐槽骂自己这个傻逼的开发者，居然能写的那么垃圾...

那么为什么我想做一个这样的玩意呢？其实你要搞清楚以下这几个事情 :

- 你是否有激情去做这个？

- 是否是心血来潮三分热度？

- 做了这个玩意，你能收获什么？

- 是否对你目前在学习或者求职中有所帮助？

以我为例子，我是很想有这个激情去完成这么一个事情，为什么呢？**因为懒**，举个例子，我当时手上有校车的后台管理、校内共享平台的后台管理、包括云简历的后台管理等...那对我而言，用别人的快速开发框架固然方便，可是有一个弊端就是，看不懂！看不懂别人怎么写的，就只会用，那我就自己去仿着做一个自己看得懂的快速开发框架嘛，这样以后我写后台管理的时候，就能够方便使用了～

那么做了这个玩意，能收获到什么 : **从中学到一些设计思想**，说来惭愧，虽说仿着 pro-and-design ，但是人家的源码我都没深入去研究，只看过其中的一丢丢～但是对我而言，也算是一个很大的帮助了，结合实习的收获，我能够知道优秀的团队如何封装 request 请求，如何对菜单栏做简单的权限验证，如何用高阶组件进行表单封装处理，在文件夹设置方面如何简单明了等～

- request 如何封装？

- 菜单栏的简单权限验证

- 高阶组件如何进行表单封装处理

- 文件夹架构设计

- ....

当你的代码量到了一定程度之后，你不能够继续写一些无用的代码，要学会优化，学会提高代码质量，我并不是说我的代码写的多好，而是继续写一些简单的代码，已经不能够有所提高；ok，我们不仅学到了设计思想，还能够通过造轮子，去学到其中的一些代码技巧，我举个例子

👉 [通过 vue + vuex + axios 去做一个完整的 demo](https://shimo.im/docs/PcfSh17NPLccmT6U)

那么对我目前在学习或者求职中有所帮助？其实帮助很大，你会发现你做完一个项目之后，你的进步是很明显的，不仅是设计方面，包括代码质量，你都会有一个提升，但是我不鼓励每个人都去做，我只是举个例子...**旨在让你们多看源码，多参考借鉴**，你才能更加了解某个框架技术

其次，对你的求职帮助也是很大的，我 CVTE 一面的时候，看我做了一个开源框架，就让我当场设计一个 button 组件，包括问我做开源项目的一个心得，遇到了什么困难，应当考虑什么

---

## 其它相关

### 我认为大学哪些课程重要

- 操作系统（主要后端）⭐⭐⭐⭐

- 计算机网络（前后端都要必备）⭐⭐⭐⭐

- 数据结构（前后端必备）⭐⭐⭐⭐

- 数据库（后端必备）⭐⭐⭐⭐

- 计算机组成原理（主要后端，前端也得了解一些）⭐⭐⭐⭐

举个例子: [从输入 URL 到页面加载完成的过程](https://github.com/PDKSophia/blog.io/blob/master/%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95-%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C%E7%AF%87.md#%E4%BB%8E%E8%BE%93%E5%85%A5url%E5%88%B0%E9%A1%B5%E9%9D%A2%E5%8A%A0%E8%BD%BD%E5%AE%8C%E6%88%90%E7%9A%84%E8%BF%87%E7%A8%8B)

考察范围: 计算机网络，网站性能优化，浏览器相关知识、JS 异步同步、Promise、Event Loop 等

---

### 该如何提高自己的技术水平

每天搬砖? 写着同样的东西? 看着文档就能撸代码?

**基础扎实 + 实战演练**

前端，你会用 Vue，那你知道 Vue 一些原理吗，比如双向绑定原理、NextTick 原理？

你说你用 jQuery 中的 Ajax 发起请求，那么，为什么这样写，就能实现发送了呢？

```javascript
$.ajax({
  url: 'https://www.ticket.cn/login.php',
  method: 'GET',
  dataType: 'json',
  success: function(res) {
    console.log('数据：res')
  }
})
```

你说你通过 jQuery 中的 appendTo 方法，就能添加到页面，那最底层的原理是什么呢？

```javascript
var str = '<div>测试</div>'

$('.parent').appendTo(str)
```

后端，你说你还是用的 tp5 文档中某个方法，就能实现了这个功能，比如说调用这个方法，就能获取到这个表中的所有符合条件`status=1`的数据

```sql
Db::table('tp_user')->where('status', 1)->select();
```

那么，如果你不用它自身的方法，你怎么实现这个，你的 sql 该如何写呢？

```javascript
var sql = `SELECT * FROM tp_user WHERE status = 1`
```

那如果连表查询呢，如果是几千上万条呢，如果是高并发高性能的呢，sql 该如何写，数据库优化方式有哪些？

像 TP5，里边就有一个`database.php`，它已经将你的数据库都配好了，你只需要把用户名和密码，数据表名修改一下就好了，但是你知道它是怎样将 php 和 mysql 连接起来的吗？

可以自己手写一个框架，然后去看别人成熟的项目，别人如何设计文件夹架构，如何封装通用组件、抽离封装通用方法，我相信，你认真搞，你一定会从中学到很多东西！

---

## 答疑阶段

大家有什么问题就问....🙋‍‍‍‍‍‍‍‍‍‍‍‍‍
