/**
 * 首页的grid
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2018-03-03
 * Last modified  : 2018-03-14
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import BusIcon from '@assets/icon/busIcon.png'
import MovieIcon from '@assets/icon/movieIcon.png'
import TrainIcon from '@assets/icon/trainIcon.png'
import PlaneIcon from '@assets/icon/planeIcon.png'
import styles from './index.module.css'

class IndexGrid extends Component {
  state = {
    gridArr: [
      {
        iconPath: PlaneIcon,
        text: '飞机',
        type: 'plane'
      },
      {
        iconPath: TrainIcon,
        text: '火车票',
        type: 'train'
      },
      {
        iconPath: BusIcon,
        text: '汽车票',
        type: 'bus'
      },
      {
        iconPath: MovieIcon,
        text: '电影票',
        type: 'entrance'
      }
    ]
  }

  handleChangeUrl = type => {
    Taro.navigateTo({
      url: `/columnist/pages/${type}/index`
    })
  }
  render() {
    const { gridArr } = this.state
    return (
      <View className={styles.container}>
        {gridArr.map((item, index) => {
          return (
            <View className={styles.items} key={index} onClick={this.handleChangeUrl.bind(this, item.type)}>
              <Image className={styles.icon} src={item.iconPath} />
              <View className={styles.text}>{item.text}</View>
            </View>
          )
        })}
      </View>
    )
  }
}

export default IndexGrid
