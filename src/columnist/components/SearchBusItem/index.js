/**
 * 搜索大巴详情条目页面
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-05-01
 * Last modified  : 2019-05-01
 */
import Taro, { Component } from '@tarojs/taro'
import { Block, View, Image } from '@tarojs/components'
import styles from './index.module.css'
import ArrowIcon from '@assets/icon/arrow.png'

class SearchBusItem extends Component {
  componentWillMount() {
    console.log('xxxx')
  }

  render() {
    return (
      <Block>
        <Block>
          <View className={styles.cell}>
            <View className={styles.flex}>
              <View className={styles.left}>
                <View className={styles.time}>
                  <View>17:10</View>
                  <Image className={styles.icon} src={ArrowIcon} />
                  <View>19:55</View>
                </View>
              </View>
              <View className={styles.right}>
                <View className={styles.price}>￥ <Text className={styles.priceText}>829</Text></View>
              </View>
            </View>
            <View className={styles.flex}>
              <View className={styles.left}>
                <View className={styles.label}>
                  <View>始发站 : 湘潭汽车站</View>
                </View>
              </View>
              <View className={styles.right}>
                <View className={styles.tickNum}>32张</View>
              </View>
            </View>
            <View className={styles.flex}>
              <View className={styles.left}>
                <View className={styles.label}>
                  <View>终点站 : 衡阳中心汽车站</View>
                </View>
              </View>
            </View>
          </View>
        </Block>
      </Block>
    )
  }
}

export default SearchBusItem
