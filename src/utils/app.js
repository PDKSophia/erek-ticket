/**
 * 其他配置
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-02-18
 * Last modified  : 2019-02-18
 */

export const AppConfig = {
  APP_NAME: 'Erek Ticket',
  APP_TEXT: '一款超强大的抢票系统',
  APP_SUMMARY: '想看首映 ? 但是总抢不到票 ? 想买个情侣座 ? 但总抢不到合适的位置 ? 你说春运票难抢 ?',
  APP_AUTHOR: '彭道宽'
}

export const SwiperImage = [
  'http://dimg04.c-ctrip.com/images/700i11000000qvtb15B17_1080_216_25.jpg',
  'http://dimg04.c-ctrip.com/images/700710000000qipp2E93F_1080_216_25.jpg',
  'http://dimg04.c-ctrip.com/images/700f11000000qr6jb7E86_1080_216_25.jpg',
  'http://dimg04.c-ctrip.com/images/700i10000000pfcwe7C77_1080_216_25.jpg'
]

export const RecommendPositon = [
  {
    title: '成都',
    cover:
      'https://gw.alicdn.com/imgextra/i2/2882533541/TB2IsADrcUrBKNjSZPxXXX00pXa_!!2882533541-0-wefliggy.jpg_110x10000Q75.jpg_.webp',
    english: 'chengdu'
  },
  {
    title: '香港',
    cover: 'https://gw.alicdn.com/imgextra/i4/669272/TB2ZzvXrVXXXXadXXXXXXXXXXXX_!!0-travel.jpg_110x10000Q75.jpg_.webp',
    english: 'xianggang'
  },
  {
    title: '曼谷',
    cover: 'https://gw.alicdn.com/imgextra/i1/669272/TB2mR7YspXXXXcJXpXXXXXXXXXX_!!0-travel.jpg_110x10000Q75.jpg_.webp',
    english: 'mangu'
  },
  {
    title: '惠州',
    cover: 'https://gw.alicdn.com/tps/TB1EQxUOVXXXXX6XFXXXXXXXXXX-800-800.jpg_110x10000Q75.jpg_.webp',
    english: 'huizhou'
  },
  {
    title: '丽江',
    cover: 'https://gw.alicdn.com/tfs/TB17l52RFXXXXchXpXXXXXXXXXX-750-750.png_110x10000.jpg_.webp',
    english: 'lijiang'
  }
]

export const CallPhoeConfig = {
  title: '你将拨打此电话',
  phone: '18976078869',
  okText: '拨打',
  cancleText: '算了'
}

export const PlaneList = [
  {
    type: 'plane',
    from: '广州',
    to: '成都',
    time: '2019-02-16 11:55 - 14:30',
    price: 630,
    airline: '川航3U8732',
    from_air_terminal: '白云机场',
    to_air_terminal: '双流机场',
    grade: '经济舱',
    orderNum: '28169472',
    status: 10, // 待出票
    user: {
      name: '彭道宽',
      ticket: '985861926123',
      phone: '18976078869', // 票号
      extraMap: {}
    }
  },
  {
    type: 'plane',
    from: '成都',
    to: '长沙',
    time: '2019-02-19 14:35 - 16:30',
    price: 490,
    airline: '中国南方航空U8162',
    from_air_terminal: '双流机场',
    to_air_terminal: '黄花机场',
    grade: '经济舱',
    orderNum: '49871924',
    status: 20, // 已出票
    user: {
      name: '彭道宽',
      ticket: '391877590273',
      phone: '18976078869', // 票号
      extraMap: {}
    }
  }
]
