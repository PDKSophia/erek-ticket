import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { Block, View, Image, Text } from '@tarojs/components'
import styles from './index.module.css'

const cx = classnames.bind(styles)
class Entrance extends Component {
  static propTypes = {
    fokErekEntry: PropTypes.array // 入口专区
  }

  config = {
    navigationBarTitleText: '首页'
  }

  componentDidMount() {}

  handleEntryArea = type => {
    Taro.navigateTo({
      url: `/columnist/pages/${type}/index`
    })
  }

  render() {
    const { listEntry } = this.props
    return (
      <Block>
        {listEntry.map((item, index) => {
          return (
            <View className={styles.container} key={index}>
              <View className={styles.items} onClick={() => this.handleEntryArea(item.type)}>
                <View className={styles.cell}>
                  <Image className={styles.icon} src={item.icon} alt='' />
                </View>
                <View className={cx('cell', 'context')}>
                  <Text className={styles.text}>{item.title}</Text>
                </View>
                <View className={styles.cell}>
                  <Image src={item.arrow} alt='' className={styles.arrow} />
                </View>
              </View>
            </View>
          )
        })}
      </Block>
    )
  }
}

export default Entrance
