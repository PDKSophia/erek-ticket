/**
 * 搜索飞机详情条目页面
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

class SearchPlaneItem extends Component {
  componentWillMount() {
    console.log('xxxx')
  }

  handleClick = id => {
    this.props.onHandleClick(id)
  }

  render() {
    return (
      <Block>
        <Block>
          <View className={styles.cell} onClick={() => { this.handleClick('1') }}>
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
                  <View>咸阳机场</View>
                  <Image style={{ visibility: "hidden" }} className={styles.icon} src={ArrowIcon} />
                  <View>美兰机场</View>
                </View>
              </View>
              <View className={styles.right}>
                <View className={styles.tab}>持续涨价中</View>
              </View>
            </View>
            <View className={styles.flex}>
              <View className={styles.left}>
                <View className={styles.label}>
                  <View>中国南方航空JZ8261 空客320(中)</View>
                </View>
              </View>
            </View>
          </View>
          <View className={styles.cell} onClick={() => { this.handleClick('2') }}>
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
                  <View>咸阳机场</View>
                  <Image style={{ visibility: "hidden" }} className={styles.icon} src={ArrowIcon} />
                  <View>美兰机场</View>
                </View>
              </View>
              <View className={styles.right}>
                <View className={styles.tab}>持续涨价中</View>
              </View>
            </View>
            <View className={styles.flex}>
              <View className={styles.left}>
                <View className={styles.label}>
                  <View>中国南方航空JZ8261 空客320(中)</View>
                </View>
              </View>
            </View>
          </View>
        </Block>
      </Block>
    )
  }
}

export default SearchPlaneItem
