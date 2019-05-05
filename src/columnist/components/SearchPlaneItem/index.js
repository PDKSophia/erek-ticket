/**
 * 搜索飞机详情条目页面
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-05-01
 * Last modified  : 2019-05-02
 */
import Taro, { Component } from '@tarojs/taro'
import { Block, View, Image } from '@tarojs/components'
import styles from './index.module.css'
import ArrowIcon from '@assets/icon/arrow.png'

class SearchPlaneItem extends Component {
  state = {
    lineList: [] // 渲染的数据
  }

  componentWillMount() {
    const { list } = this.props
    try {
      if (list) {
        this.setState({
          lineList: [...list]
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  handleClick = (item, index) => {
    this.props.onHandleClick(item, index, 'plane')
  }

  render() {
    const { lineList } = this.state
    return (
      <Block>
        {lineList.map((item, index) => {
          return (
            <View
              className={styles.cell}
              key={item.id}
              onClick={() => {
                this.handleClick(item, index)
              }}
            >
              <View className={styles.flex}>
                <View className={styles.left}>
                  <View className={styles.time}>
                    <View>{item.startDate}</View>
                    <Image className={styles.icon} src={ArrowIcon} />
                    <View>{item.endDate}</View>
                  </View>
                </View>
                <View className={styles.right}>
                  <View className={styles.price}>
                    ￥ <Text className={styles.priceText}>{item.record[0].price}</Text>
                  </View>
                </View>
              </View>
              <View className={styles.flex}>
                <View className={styles.left}>
                  <View className={styles.label}>
                    <View>{item.prefix.fromPosName}</View>
                    {/* <Image style={{ visibility: "hidden" }} className={styles.icon} src={ArrowIcon} /> */}
                    <View>{item.prefix.toPosName}</View>
                  </View>
                </View>
                <View className={styles.right}>
                  <View className={styles.tab}>持续涨价中</View>
                </View>
              </View>
              <View className={styles.flex}>
                <View className={styles.left}>
                  <View className={styles.label}>
                    <View>{item.name}</View>
                  </View>
                </View>
              </View>
            </View>
          )
        })}
      </Block>
    )
  }
}

export default SearchPlaneItem
