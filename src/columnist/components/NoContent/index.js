/**
 * 无数据页面
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-05-02
 * Last modified  : 2019-05-02
 */
import Taro, { Component } from '@tarojs/taro'
import { Block, View, Image } from '@tarojs/components'
import NoContentIcon from '@assets/icon/no_content.png'
import styles from './index.module.css'

class NoContent extends Component {
  render() {
    return (
      <Block>
        <View className={styles.container}>
          <Image className={styles.noContent} src={NoContentIcon} />
          <View className={styles.text}>暂未找到符合条件数据</View>
        </View>
      </Block>
    )
  }
}

export default NoContent
