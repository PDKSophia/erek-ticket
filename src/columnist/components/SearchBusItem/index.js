/**
 * 搜索大巴详情条目页面
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
import NoContent from '@/columnist/components/NoContent'

class SearchBusItem extends Component {
  state = {
    isNoContent: true, // 是否暂无数据
    lineList: [] // 渲染的数据
  }

  componentWillMount() {
    const { list } = this.props
    try {
      if (list) {
        this.setState({
          lineList: [...list],
          isNoContent: false
        })
      } else {
        this.setState({
          isNoContent: true
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  handleClick = (item, index) => {
    this.props.onHandleClick(item, index, 'bus')
  }

  render() {
    const { lineList, isNoContent } = this.state
    return (
      <Block>
        {isNoContent === true ? <NoContent /> : (
          <View>
            {lineList.map((item, index) => {
              return <View className={styles.cell} key={item.id} onClick={() => { this.handleClick(item, index) }}>
                <View className={styles.flex}>
                  <View className={styles.left}>
                    <View className={styles.time}>
                      <View>{item.startDate}</View>
                      <Image className={styles.icon} src={ArrowIcon} />
                      <View>{item.endDate}</View>
                    </View>
                  </View>
                  <View className={styles.right}>
                    <View className={styles.price}>￥ <Text className={styles.priceText}>{item.price}</Text></View>
                  </View>
                </View>
                <View className={styles.flex}>
                  <View className={styles.left}>
                    <View className={styles.label}>
                      <View>始发站 : {item.prefix.fromPosName}</View>
                    </View>
                  </View>
                  <View className={styles.right}>
                    <View className={styles.tickNum}>{item.surplus}张</View>
                  </View>
                </View>
                <View className={styles.flex}>
                  <View className={styles.left}>
                    <View className={styles.label}>
                      <View>终点站 : {item.prefix.toPosName}</View>
                    </View>
                  </View>
                </View>
              </View>
            })}
          </View>
        )}
      </Block>
    )
  }
}

export default SearchBusItem
