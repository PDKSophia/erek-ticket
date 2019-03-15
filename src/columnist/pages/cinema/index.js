/**
 * 影院列表 页面
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-03-15
 * Last modified  : 2019-03-15
 */
import Taro, { Component } from '@tarojs/taro'
import classnames from 'classnames/bind'
import { View, Text, Swiper, SwiperItem, Image, Block } from '@tarojs/components'
import { reduceArray } from '@utils/utils'
import { cinema, cinemaTag } from '@utils/app'
import styles from './index.module.css'

const cx = classnames.bind(styles)
const imgUrls = [
  'http://p1.meituan.net/mmc/b02ff81fda1b184ec54ee91e24bc270795149.jpg',
  'http://p1.meituan.net/mmc/af6c63f1febb7032bc9063b8e5fa1aef95977.jpg',
  'http://p1.meituan.net/mmc/0ce1405139953be69a9f4104a06b21a0149274.jpg'
]

class Cinema extends Component {
  config = {
    navigationBarTitleText: '影院专区'
  }

  componentDidMount() {}

  render() {
    cinema.map(item => {
      let tagArrag = []
      let number = Math.floor(Math.random() * cinemaTag.length) || 4
      let judgeIndex = 0
      for (let i = 0; i < number; i++) {
        let tagIndex = Math.floor(Math.random() * cinemaTag.length)
        if (tagIndex === judgeIndex) {
          judgeIndex = tagIndex
        } else {
          tagArrag.push(cinemaTag[tagIndex])
        }
      }
      item['tagArr'] = reduceArray(tagArrag)
    })

    return (
      <Block>
        <View className={styles.container}>
          <Swiper
            className={styles.swiper}
            indicatorColor='#999'
            indicatorActiveColor='#333'
            circular
            autoplay
            interval='1500'
          >
            {imgUrls.map((item, index) => {
              return (
                <SwiperItem key={index}>
                  <Image className={styles.cover} src={item} />
                </SwiperItem>
              )
            })}
          </Swiper>
        </View>
        <View className={styles.content}>
          {cinema.map((cinema, index) => {
            return (
              <View className={styles.items} key={index} onClick={this.handleViewOneCinema.bind(this, cinema)}>
                <View className={styles.name}>{cinema.name}</View>
                <View className={styles.address}>{cinema.location}</View>
                <View className={styles.tag}>
                  {cinema.tagArr.map((item, keys) => {
                    return (
                      <Text className={cx('tag-normal', `tag-${keys}`)} key={keys}>
                        {item}
                      </Text>
                    )
                  })}
                  <Text />
                </View>
              </View>
            )
          })}
        </View>
      </Block>
    )
  }
}

export default Cinema
