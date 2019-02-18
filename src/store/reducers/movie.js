/**
 * @Author: PDK
 * @Date:   2018-08-31
 * @Last modified by:   PDK
 * @Last modified time: 2018-08-31
 */
import {
  REQUEST_MOVIE_LIST,
  RECEIVE_MOVIE_LIST,
  TIGGER_SAVE_CURRENT_MOVIE,
  REQUEST_CINEMA_LIST,
  RECEIVE_CINEMA_LIST,
  TIGGER_SAVE_CURRENT_CINEMA
} from '../constants/movie'

const INITIAL_STATE = {
  isFetchMovieList: false, // 是否请求电影列表
  movieList: [
    {
      desc:
        '时好意会造成恶果，人反而被自己所造成的结果所困扰。伊桑·亨特（汤姆·克鲁斯）和他的IMF团队（亚历克·鲍德温、西蒙·佩吉、文·瑞姆斯）再度回归，他们会与观众们熟悉的盟友（丽贝卡·弗格森、米歇尔·莫娜汉）一起与时间赛跑，应对一次任务中出现的',
      director: '克里斯托弗·麦奎里',
      id: 1,
      name: '碟中谍6：全面瓦解',
      picture: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2529365085.jpg',
      produceTime: '2018-08-31(内地)',
      score: 8,
      type: '动作 / 惊悚 / 冒险',
      cinemaList: [
        {
          cinemaID: 1,
          uniqueID: 1, // 购票的电影唯一ID
          name: '银都国际影城（吉利西路店）',
          location: '雨湖区九华示范区吉利西路铭鸿新衫世纪广场2栋4楼',
          online: [
            // 上映两场
            {
              time: '2016-09-18 14:03:21',
              ticketSum: 20,
              ticketOdd: 15,
              price: 32
            },
            {
              time: '2016-09-19 21:03:21',
              ticketSum: 20,
              ticketOdd: 10,
              price: 39
            }
          ]
        }
      ]
    },
    {
      desc:
        '斯科特·朗迎来了自己作为超级英雄和孩子父亲的双重身份。一方面，他在背负着蚁人职责的同时努力过好自己的生活；另一方面，二代黄蜂女霍普·凡·戴恩和汉克·皮姆博士又向他传达了一项紧迫的新任务。斯科特必须再次穿上战衣，与黄蜂女并肩作战，共同破解来自',
      director: '佩顿·里德',
      id: 2,
      name: '蚁人2：黄蜂女现身',
      picture: 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2529389608.jpg',
      produceTime: '2018-08-24(内地)',
      score: 8,
      type: '动作 / 惊悚 / 冒险',
      cinemaList: [
        {
          cinemaID: 2,
          uniqueID: 2,
          name: '星影国际影城',
          location: '雨湖区韶山中路安国大厦3楼',
          online: [
            // 上映两场
            {
              time: '2016-09-18 14:03:21',
              ticketSum: 20,
              ticketOdd: 15,
              price: 42
            },
            {
              time: '2016-09-19 21:03:21',
              ticketSum: 20,
              ticketOdd: 10,
              price: 32
            }
          ]
        }
      ]
    },
    {
      desc:
        '有一个每天耍贱整蛊妹妹、毫无家庭感的哥哥是一种什么感受？油炸还是蒸锅？时秒只希望哥哥时分彻底消失！连珍贵的生日愿望都是“快把我哥带走”。不料愿望成真，哥哥变成闺蜜妙妙的哥哥，时秒同情妙妙的同时心里暗爽摆脱“大魔王”！变成独生女的时秒感觉生',
      director: '郑芬芬',
      id: 3,
      name: '快把我哥带走',
      picture: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2531080870.jpg',
      produceTime: '2018-08-17(内地)',
      score: 7,
      type: '喜剧 / 奇幻',
      cinemaList: [
        {
          cinemaID: 1,
          uniqueID: 1, // 购票的电影唯一ID
          name: '银都国际影城（吉利西路店）',
          location: '雨湖区九华示范区吉利西路铭鸿新衫世纪广场2栋4楼',
          online: [
            // 上映两场
            {
              time: '2016-09-18 14:03:21',
              ticketSum: 20,
              ticketOdd: 15,
              price: 32
            },
            {
              time: '2016-09-19 21:03:21',
              ticketSum: 20,
              ticketOdd: 10,
              price: 39
            }
          ]
        }
      ]
    },
    {
      desc:
        '来自印度北方小镇的苏丹遇见了摔跤教练的女儿，苏丹为了心仪女孩，不仅开始学起摔跤，在短时间内就获得地方冠军，展现了他的决心和天分。他不但娶得美人归，还和妻子一起代表印度参加奥运，但就在苏丹获得奥运金牌的同时，他却因为骄傲自大而失去了挚爱的家庭',
      director: '阿里·阿巴斯·札法',
      id: 4,
      name: '苏丹',
      picture: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2529570494.jpg',
      produceTime: '2018-08-31(内地)',
      score: 7,
      type: '剧情 / 运动 / 动作',
      cinemaList: [
        {
          cinemaID: 1,
          uniqueID: 1, // 购票的电影唯一ID
          name: '银都国际影城（吉利西路店）',
          location: '雨湖区九华示范区吉利西路铭鸿新衫世纪广场2栋4楼',
          online: [
            // 上映两场
            {
              time: '2016-09-18 14:03:21',
              ticketSum: 20,
              ticketOdd: 15,
              price: 32
            },
            {
              time: '2016-09-19 21:03:21',
              ticketSum: 20,
              ticketOdd: 10,
              price: 39
            }
          ]
        }
      ]
    },
    {
      desc:
        '讲述了二战期间，发生在长江边上的一座悲情城市里的凄婉美丽的女人故事，通过回忆的视角再现了那个腥风血雨的年代，一群不同身份、性情各异的女子，在家仇国恨面前，抛弃前嫌，不计恩怨，与日寇、汉奸、汪伪特工巧妙周旋、斗智斗勇，最后不惜牺牲性命，在血与火的洗礼中涅槃永生',
      director: '吴贻弓',
      id: 5,
      name: '那些女人',
      picture: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2530146643.jpg',
      produceTime: '2018-09-03(内地)',
      score: 7,
      type: '剧情 / 历史 / 战争',
      cinemaList: [
        {
          cinemaID: 1,
          uniqueID: 1, // 购票的电影唯一ID
          name: '银都国际影城（吉利西路店）',
          location: '雨湖区九华示范区吉利西路铭鸿新衫世纪广场2栋4楼',
          online: [
            // 上映两场
            {
              time: '2016-09-18 14:03:21',
              ticketSum: 20,
              ticketOdd: 15,
              price: 32
            },
            {
              time: '2016-09-19 21:03:21',
              ticketSum: 20,
              ticketOdd: 10,
              price: 39
            }
          ]
        },
        {
          cinemaID: 2,
          uniqueID: 2,
          name: '星影国际影城',
          location: '雨湖区韶山中路安国大厦3楼',
          online: [
            // 上映两场
            {
              time: '2016-09-18 14:03:21',
              ticketSum: 20,
              ticketOdd: 15,
              price: 42
            },
            {
              time: '2016-09-19 21:03:21',
              ticketSum: 20,
              ticketOdd: 10,
              price: 32
            }
          ]
        }
      ]
    }
  ], // 电影列表
  currentMovie: {}, // 当前点击的某条电影
  isFetchCinemaList: false, // 是否获取影院列表
  cinemaList: [
    {
      cinemaID: 1,
      name: '银都国际影城（吉利西路店）',
      location: '雨湖区九华示范区吉利西路铭鸿新衫世纪广场2栋4楼',
      onlineMovie: [
        {
          id: 1, // 电影的id
          name: '碟中谍6：全面瓦解',
          desc:
            '时好意会造成恶果，人反而被自己所造成的结果所困扰。伊桑·亨特（汤姆·克鲁斯）和他的IMF团队（亚历克·鲍德温、西蒙·佩吉、文·瑞姆斯）再度回归，他们会与观众们熟悉的盟友（丽贝卡·弗格森、米歇尔·莫娜汉）一起与时间赛跑，应对一次任务中出现的',
          picture: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2529365085.jpg',
          time: '9/13/18 09:40:00 AM', // 这个是安排该影院电影上映的时间，不是电影的时间
          type: '动作 / 惊悚 / 冒险',
          director: '克里斯托弗·麦奎里',
          score: 9,
          online: [
            {
              time: '2016-09-18 14:03:21', // 时间段
              ticketSum: 20, // 在这个时间段的这部电影的总票数
              ticketOdd: 10, // 剩余位置
              price: 32
            },
            {
              time: '2016-09-19 16:03:21', // 时间段
              ticketSum: 20, // 在这个时间段的这部电影的总票数
              ticketOdd: 14, // 剩余位置
              price: 36
            }
          ],
          uniqueID: 1 // 购票所用的ID，购票的接口中传入这个值
        },
        {
          id: 2,
          name: '蚁人2：黄蜂女现身',
          desc:
            '斯科特·朗迎来了自己作为超级英雄和孩子父亲的双重身份。一方面，他在背负着蚁人职责的同时努力过好自己的生活；另一方面，二代黄蜂女霍普·凡·戴恩和汉克·皮姆博士又向他传达了一项紧迫的新任务。斯科特必须再次穿上战衣，与黄蜂女并肩作战，共同破解来自',
          picture: 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2529389608.jpg',
          time: '9/13/18 09:40:00 AM', // 这个是安排该影院电影上映的时间，不是电影的时间
          type: '动作 / 惊悚 / 冒险',
          director: '佩顿·里德',
          score: 8,
          online: [
            {
              time: '2016-09-16 11:03:21', // 时间段
              ticketSum: 20, // 在这个时间段的这部电影的总票数
              ticketOdd: 10, // 剩余位置
              price: 29.9
            },
            {
              time: '2016-09-15 14:03:21', // 时间段
              ticketSum: 20, // 在这个时间段的这部电影的总票数
              ticketOdd: 12, // 剩余位置
              price: 36
            }
          ],
          uniqueID: 2 // 购票所用的ID，购票的接口中传入这个值
        },
        {
          id: 3,
          name: '快把我哥带走',
          desc:
            '有一个每天耍贱整蛊妹妹、毫无家庭感的哥哥是一种什么感受？油炸还是蒸锅？时秒只希望哥哥时分彻底消失！连珍贵的生日愿望都是“快把我哥带走”。不料愿望成真，哥哥变成闺蜜妙妙的哥哥，时秒同情妙妙的同时心里暗爽摆脱“大魔王”！变成独生女的时秒感觉生',
          picture: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2531080870.jpg',
          time: '9/13/18 09:40:00 AM', // 这个是安排该影院电影上映的时间，不是电影的时间
          type: '喜剧 / 奇幻',
          director: '郑芬芬',
          score: 7,
          online: [
            {
              time: '2016-09-15 12:03:21', // 时间段
              ticketSum: 20, // 在这个时间段的这部电影的总票数
              ticketOdd: 11, // 剩余位置
              price: 32
            },
            {
              time: '2016-09-18 21:03:21', // 时间段
              ticketSum: 20, // 在这个时间段的这部电影的总票数
              ticketOdd: 12, // 剩余位置
              price: 29
            }
          ],
          uniqueID: 3 // 购票所用的ID，购票的接口中传入这个值
        },
        {
          id: 4,
          name: '苏丹',
          desc:
            '来自印度北方小镇的苏丹遇见了摔跤教练的女儿，苏丹为了心仪女孩，不仅开始学起摔跤，在短时间内就获得地方冠军，展现了他的决心和天分。他不但娶得美人归，还和妻子一起代表印度参加奥运，但就在苏丹获得奥运金牌的同时，他却因为骄傲自大而失去了挚爱的家庭',
          picture: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2529570494.jpg',
          time: '9/13/18 09:40:00 AM', // 这个是安排该影院电影上映的时间，不是电影的时间
          type: '剧情 / 运动 / 动作',
          director: '阿里·阿巴斯·札法',
          score: 7,
          online: [
            {
              time: '2016-09-11 14:03:21', // 时间段
              ticketSum: 20, // 在这个时间段的这部电影的总票数
              ticketOdd: 10, // 剩余位置
              price: 32
            },
            {
              time: '2016-09-14 11:23:21', // 时间段
              ticketSum: 20, // 在这个时间段的这部电影的总票数
              ticketOdd: 15, // 剩余位置
              price: 52
            }
          ],
          uniqueID: 4 // 购票所用的ID，购票的接口中传入这个值
        },
        {
          id: 5,
          name: '那些女人',
          desc:
            '讲述了二战期间，发生在长江边上的一座悲情城市里的凄婉美丽的女人故事，通过回忆的视角再现了那个腥风血雨的年代，一群不同身份、性情各异的女子，在家仇国恨面前，抛弃前嫌，不计恩怨，与日寇、汉奸、汪伪特工巧妙周旋、斗智斗勇，最后不惜牺牲性命，在血与火的洗礼中涅槃永生',
          picture: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2530146643.jpg',
          time: '9/13/18 09:40:00 AM',
          type: '剧情 / 历史 / 战争',
          director: '吴贻弓',
          score: 7,
          online: [
            {
              time: '2016-09-18 09:03:21', // 时间段
              ticketSum: 20, // 在这个时间段的这部电影的总票数
              ticketOdd: 10, // 剩余位置
              price: 32
            },
            {
              time: '2016-09-21 11:23:21', // 时间段
              ticketSum: 20, // 在这个时间段的这部电影的总票数
              ticketOdd: 15, // 剩余位置
              price: 41
            }
          ],
          uniqueID: 5 // 购票所用的ID，购票的接口中传入这个值
        }
      ]
    },
    {
      cinemaID: 2,
      name: '星影国际影城',
      location: '雨湖区韶山中路安国大厦3楼',
      onlineMovie: [
        {
          id: 1, // 电影的id
          name: '碟中谍6：全面瓦解',
          desc:
            '时好意会造成恶果，人反而被自己所造成的结果所困扰。伊桑·亨特（汤姆·克鲁斯）和他的IMF团队（亚历克·鲍德温、西蒙·佩吉、文·瑞姆斯）再度回归，他们会与观众们熟悉的盟友（丽贝卡·弗格森、米歇尔·莫娜汉）一起与时间赛跑，应对一次任务中出现的',
          picture: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2529365085.jpg',
          time: '9/13/18 09:40:00 AM', // 这个是安排该影院电影上映的时间，不是电影的时间
          type: '动作 / 惊悚 / 冒险',
          director: '克里斯托弗·麦奎里',
          score: 9,
          online: [
            {
              time: '2016-09-18 14:03:21', // 时间段
              ticketSum: 20, // 在这个时间段的这部电影的总票数
              ticketOdd: 10, // 剩余位置
              price: 32
            },
            {
              time: '2016-09-18 14:03:21', // 时间段
              ticketSum: 20, // 在这个时间段的这部电影的总票数
              ticketOdd: 10, // 剩余位置
              price: 32
            }
          ],
          uniqueID: 1 // 购票所用的ID，购票的接口中传入这个值
        }
      ]
    },
    {
      cinemaID: 3,
      name: '大地影院',
      location: '雨湖区建设北路5号城市魔方4楼',
      onlineMovie: [
        {
          id: 1, // 电影的id
          name: '碟中谍6：全面瓦解',
          desc:
            '时好意会造成恶果，人反而被自己所造成的结果所困扰。伊桑·亨特（汤姆·克鲁斯）和他的IMF团队（亚历克·鲍德温、西蒙·佩吉、文·瑞姆斯）再度回归，他们会与观众们熟悉的盟友（丽贝卡·弗格森、米歇尔·莫娜汉）一起与时间赛跑，应对一次任务中出现的',
          picture: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2529365085.jpg',
          time: '9/13/18 09:40:00 AM', // 这个是安排该影院电影上映的时间，不是电影的时间
          type: '动作 / 惊悚 / 冒险',
          director: '克里斯托弗·麦奎里',
          score: 9,
          online: [
            {
              time: '2016-09-18 14:03:21', // 时间段
              ticketSum: 20, // 在这个时间段的这部电影的总票数
              ticketOdd: 10, // 剩余位置
              price: 32
            },
            {
              time: '2016-09-18 14:03:21', // 时间段
              ticketSum: 20, // 在这个时间段的这部电影的总票数
              ticketOdd: 10, // 剩余位置
              price: 32
            }
          ],
          uniqueID: 1 // 购票所用的ID，购票的接口中传入这个值
        }
      ]
    },
    {
      cinemaID: 4,
      name: '左岸国际影城',
      location: '雨湖区建设北路8号白石商业广场6楼',
      onlineMovie: [
        {
          id: 1, // 电影的id
          name: '碟中谍6：全面瓦解',
          desc:
            '时好意会造成恶果，人反而被自己所造成的结果所困扰。伊桑·亨特（汤姆·克鲁斯）和他的IMF团队（亚历克·鲍德温、西蒙·佩吉、文·瑞姆斯）再度回归，他们会与观众们熟悉的盟友（丽贝卡·弗格森、米歇尔·莫娜汉）一起与时间赛跑，应对一次任务中出现的',
          picture: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2529365085.jpg',
          time: '9/13/18 09:40:00 AM', // 这个是安排该影院电影上映的时间，不是电影的时间
          type: '动作 / 惊悚 / 冒险',
          director: '克里斯托弗·麦奎里',
          score: 9,
          online: [
            {
              time: '2016-09-18 14:03:21', // 时间段
              ticketSum: 20, // 在这个时间段的这部电影的总票数
              ticketOdd: 10, // 剩余位置
              price: 32
            },
            {
              time: '2016-09-18 14:03:21', // 时间段
              ticketSum: 20, // 在这个时间段的这部电影的总票数
              ticketOdd: 10, // 剩余位置
              price: 32
            }
          ],
          uniqueID: 1 // 购票所用的ID，购票的接口中传入这个值
        }
      ]
    },
    {
      cinemaID: 5,
      name: '潇湘国际影城',
      location: '岳塘区福星中路福星国际商业中心天虹百货5楼',
      onlineMovie: [
        {
          id: 1, // 电影的id
          name: '碟中谍6：全面瓦解',
          desc:
            '时好意会造成恶果，人反而被自己所造成的结果所困扰。伊桑·亨特（汤姆·克鲁斯）和他的IMF团队（亚历克·鲍德温、西蒙·佩吉、文·瑞姆斯）再度回归，他们会与观众们熟悉的盟友（丽贝卡·弗格森、米歇尔·莫娜汉）一起与时间赛跑，应对一次任务中出现的',
          picture: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2529365085.jpg',
          time: '9/13/18 09:40:00 AM', // 这个是安排该影院电影上映的时间，不是电影的时间
          type: '动作 / 惊悚 / 冒险',
          director: '克里斯托弗·麦奎里',
          score: 9,
          online: [
            {
              time: '2016-09-18 14:03:21', // 时间段
              ticketSum: 20, // 在这个时间段的这部电影的总票数
              ticketOdd: 10, // 剩余位置
              price: 32
            },
            {
              time: '2016-09-18 14:03:21', // 时间段
              ticketSum: 20, // 在这个时间段的这部电影的总票数
              ticketOdd: 10, // 剩余位置
              price: 32
            }
          ],
          uniqueID: 1 // 购票所用的ID，购票的接口中传入这个值
        }
      ]
    },
    {
      cinemaID: 6,
      name: '横店IMAX电影城（步步高店）',
      location: '岳塘区建设路口步步高广场8楼',
      onlineMovie: [
        {
          id: 1, // 电影的id
          name: '碟中谍6：全面瓦解',
          desc:
            '时好意会造成恶果，人反而被自己所造成的结果所困扰。伊桑·亨特（汤姆·克鲁斯）和他的IMF团队（亚历克·鲍德温、西蒙·佩吉、文·瑞姆斯）再度回归，他们会与观众们熟悉的盟友（丽贝卡·弗格森、米歇尔·莫娜汉）一起与时间赛跑，应对一次任务中出现的',
          picture: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2529365085.jpg',
          time: '9/13/18 09:40:00 AM', // 这个是安排该影院电影上映的时间，不是电影的时间
          type: '动作 / 惊悚 / 冒险',
          director: '克里斯托弗·麦奎里',
          score: 9,
          online: [
            {
              time: '2016-09-18 14:03:21', // 时间段
              ticketSum: 20, // 在这个时间段的这部电影的总票数
              ticketOdd: 10, // 剩余位置
              price: 32
            },
            {
              time: '2016-09-18 14:03:21', // 时间段
              ticketSum: 20, // 在这个时间段的这部电影的总票数
              ticketOdd: 10, // 剩余位置
              price: 32
            }
          ],
          uniqueID: 1 // 购票所用的ID，购票的接口中传入这个值
        }
      ]
    }
  ], // 影院列表
  currentCinema: {} // 当前点击的某条影院
}

export default function movie(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_MOVIE_LIST:
      return {
        ...state,
        isFetchMovieList: true
      }
    case RECEIVE_MOVIE_LIST:
      let newList = state.movieList
      newList = action.data
      return {
        ...state,
        movieList: newList
      }
    case TIGGER_SAVE_CURRENT_MOVIE:
      let curMovie = action.data
      return {
        ...state,
        currentMovie: curMovie
      }
    case REQUEST_CINEMA_LIST:
      return {
        ...state,
        isFetchCinemaList: true
      }
    case RECEIVE_CINEMA_LIST:
      let newcinemaList = state.cinemaList
      newcinemaList = action.data
      return {
        ...state,
        cinemaList: newcinemaList
      }
    case TIGGER_SAVE_CURRENT_CINEMA:
      let curCinema = action.data
      return {
        ...state,
        currentCinema: curCinema
      }
    default:
      return state
  }
}
