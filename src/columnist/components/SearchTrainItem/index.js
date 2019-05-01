/**
 * 搜索火车详情条目页面
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

class SearchTrainItem extends Component {
  componentWillMount() {
    console.log('xxxx')
  }

  render() {
    return (
      <Block>
        <View className={styles.cell}>
          <View className={styles.flex}>
            <View className={styles.left}>
              <View className={styles.time}>
                <View>17:10</View>
                <Image className={styles.icon} src={ArrowIcon} />
                <View>22:21</View>
              </View>
            </View>
            <View className={styles.right}>
              <View className={styles.price}>￥ <Text className={styles.priceText}>829</Text></View>
            </View>
          </View>
          <View className={styles.flex}>
            <View className={styles.left}>
              <View className={styles.label}>
                <View>长沙南站</View>
                <View>G4828</View>
                <View>上海虹桥站</View>
              </View>
            </View>
          </View>
          <View className={styles.flex}>
            <View className={styles.ticket}>软卧<Text className={styles.tickNum}>84张</Text></View>
            <View className={styles.ticket}>硬卧<Text className={styles.tickNum}>75张</Text></View>
            <View className={styles.ticket}>硬座<Text className={styles.tickNum}>12张</Text></View>
            <View className={styles.ticket}>无座<Text className={styles.tickNum}>36张</Text></View>
          </View>
        </View>
        <View className={styles.cell}>
          <View className={styles.flex}>
            <View className={styles.left}>
              <View className={styles.time}>
                <View>17:10</View>
                <Image className={styles.icon} src={ArrowIcon} />
                <View>22:21</View>
              </View>
            </View>
            <View className={styles.right}>
              <View className={styles.price}>￥ <Text className={styles.priceText}>829</Text></View>
            </View>
          </View>
          <View className={styles.flex}>
            <View className={styles.left}>
              <View className={styles.label}>
                <View>长沙南站</View>
                <View>G4828</View>
                <View>上海虹桥站</View>
              </View>
            </View>
          </View>
          <View className={styles.flex}>
            <View className={styles.ticket}>软卧<Text className={styles.tickNum}>84张</Text></View>
            <View className={styles.ticket}>硬卧<Text className={styles.tickNum}>75张</Text></View>
            <View className={styles.ticket}>硬座<Text className={styles.tickNum}>12张</Text></View>
            <View className={styles.ticket}>无座<Text className={styles.tickNum}>36张</Text></View>
          </View>
        </View>
      </Block>
    )
  }
}

export default SearchTrainItem
