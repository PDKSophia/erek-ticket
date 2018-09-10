## 获取用户信息
```javascript
    /*
     * @ method : GET
     * @ url : '/GetUserInfo'
     * @ return object
    */

    data: {
      {
        normalResult: {
          code: 0,
          msg: string
        },
        money: 0,
        order: [
          {
            codeUrl: CodeUrls, // 二维码地址
            ticketCode: 'gusg213iu23', // 订单号
            pushCode: '3811 2821', // 取票码
            cinema: {
              id: 100,
              name: '银都国际影城（吉利西路店)',  // 电影院名称，用于 “ 我的二维码 ” 页面显示
              location: '雨湖区九华示范区吉利西路铭鸿新衫世纪广场2栋4楼' // 电影院地址，用于 “ 我的二维码 ” 页面显示
            },
            movie: {
              id: 200,
              name: '《蚁人2: 黄蜂女现身》',
              cover: 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2529389608.jpg',
              time: '2019-09-09 21:33:51', // 电影播放时间
            },
            seat: {
              seatID: 300  // 位置id
            },
            isRepay: true, // 是否支付
            time: '2019-09-06 21:33:51' // 订单购票时间
          }
        ]
    }

```

## 获取所有电影列表
```javascript
    /*
     * @ method : GET
     * @ url : '/GetMovieList'
     * @ return object
    */
    
    data: {
      {
        normalResult: {
          code: 0,
          msg: string
        },
        movieList: [
          {
            id: 0,
            name: 'string',
            desc: 'string',
            picture: 'string',
            produceTime: 'string',
            type: 'string',
            director: 'string',
            score: 0,
            cinemaList: [
              {
                cinemaID: 0,
                uniqueID: 0,
                online: [  // 上映场次总数
                  {
                    time: '',       // 时间段
                    ticketSum: 0,  // 在这个时间段的这部电影的总票数
                    ticketOdd: 0,  // 剩余位置
                    price: 0
                  }
                ]
              }
            ]
          }
        ]
      }
    }
    
```

## 获取所有影院列表 （携带该影院下上映的电影）
```javascript
    /*
     * @ method : GET
     * @ url : '/GetCinemaList'
     * @ return object
    */

    data: {
      {
        normalResult: {
          code: 0,
          msg: string
        },
        cinemaList: [
          {
            cinemaID: 0,
            name: "string",
            location: "string"
            onlineMovie: [
              {
                uniqueID: 0 // 购票所用的ID，购票的接口中传入这个值
                id: 0, // 电影的id
                name: 'string',
                desc: 'string',
                director: 'string',
                type: 'string',
                score: 0,
                picture: 'string',
                online: [
                  {
                    time: '',       // 时间段
                    ticketSum: 0,  // 在这个时间段的这部电影的总票数
                    ticketOdd: 0,  // 剩余位置
                    price: 0
                  }
                ]
              }
            ]
          }
        ]
      }
    }

```

## 获取某一影院的信息
```javascript
    /*
     * @ method : POST
     * @ url : '/GetOneCinemaInfo'
     * @ params  cinemaID
     * @ return object
    */

    params :  cinemaID 影院的ID
    
    data: {
      {
        normalResult: {
          code: 0,
          msg: string
        },
        onlineMovie: [
          {
            uniqueID: 0 // 购票所用的ID，购票的接口中传入这个值
            id: 0, // 电影的id
            name: 'string',
            desc: 'string',
            director: 'string',
            type: 'string',
            score: 0,
            picture: 'string',
            online: [
              {
                time: '',       // 时间段
                ticketSum: 0,  // 在这个时间段的这部电影的总票数
                ticketOdd: 0,  // 剩余位置
                price: 0
              }
            ]
          }
        ]
      }
    }

```

## 获取所有座位信息接口
```javascript
    /*
     * @ method : POST
     * @ url : '/GetMovieSeatInfo'
     * @ params : cinema_movieID 电影的uniqueID 和 cinemaID 电影院的ID
     * @ return object
    */

    params : cinema_movieID 电影的uniqueID && cinemaID 电影院的ID

    data: {
      normalResult: {
        code: 0,
        msg: string
      },
      seat: {
        cinemaID: 0, // 当前电影院的ID
        cinema_movieID: 0, // 电影的uniqueID
        list: [
          {
            seatID: 1,
            status: false // 没被选
          },
          {
            seatID: 2,
            status: true // 已被选
          }
        ] 
      }
    }
```


## 购票 ，（将 '获取购票结果' 这接口合在一起做）
```javascript
    /*
     * @ method : POST
     * @ url : '/RobTicket'
     * @ params : cinema_movieID 电影的uniqueID 和 cinemaID 电影院的ID 和 seatID 座位号
     * @ return object
    */

    // 抢票失败
    data: {
      normalResult: {
        code: -100,
        msg: '购票失败'
      },
      list: null 
    }

    // 抢票成功，返回一个订单。这样我前端统一对一个订单的数据，都可以对应到 订单 、 二维码 、 钱包等页面
    data: {
      normalResult: {
        code: 200,
        msg: '购票成功'
      },
      list: {
        codeUrl: CodeUrls, // 二维码地址
        ticketCode: 'gusg213iu23', // 订单号
        pushCode: '3811 2821', // 取票码
        cinema: {
          id: 100,
          name: '银都国际影城（吉利西路店)',  // 电影院名称，用于 “ 我的二维码 ” 页面显示
          location: '雨湖区九华示范区吉利西路铭鸿新衫世纪广场2栋4楼' // 电影院地址，用于 “ 我的二维码 ” 页面显示
        },
        movie: {
          id: 200,
          name: '《蚁人2: 黄蜂女现身》',
          cover: 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2529389608.jpg',
          time: '2019-09-09 21:33:51', // 电影播放时间
        },
        seat: {
          seatID: 300  // 位置id
        },
        isRepay: true, // 是否支付
        time: '2019-09-06 21:33:51' // 订单购票时间
      }
    }
```


## 充值接口
```javascript
    /*
     * @ method : POST
     * @ url : '/AddMoney'
     * @ return object
    */

    data: {
      code: 0,
      msg: string,
      money: 0  // 充值后的金额。不要让我自己加
    }

```

## 订单支付接口
```javascript
    /*
     * @ method : POST
     * @ url : '/ResumeTicket'
     * @ params : ticket_code 订单编号
     * @ return object
    */

    params : ticket_code 订单编号

    data: {
      code: 0,
      msg: string,
      money: 0, // 订单完成之后的余额
      order: [  // 返回所有订单，无论成功或者失败
        {
          codeUrl: CodeUrls, // 二维码地址
          ticketCode: 'gusg213iu23', // 订单号
          pushCode: '3811 2821', // 取票码
          cinema: {
            id: 100,
            name: '银都国际影城（吉利西路店)',  // 电影院名称，用于 “ 我的二维码 ” 页面显示
            location: '雨湖区九华示范区吉利西路铭鸿新衫世纪广场2栋4楼' // 电影院地址，用于 “ 我的二维码 ” 页面显示
          },
          movie: {
            id: 200,
            name: '《蚁人2: 黄蜂女现身》',
            cover: 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2529389608.jpg',
              time: '2019-09-09 21:33:51', // 电影播放时间
          },
          seat: {
            seatID: 300  // 位置id
          },
          isRepay: true, // 是否支付
          time: '2019-09-06 21:33:51' // 订单购票时间
        }
      ]
    }

```



