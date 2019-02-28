/**
 * 推荐条目
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-02-18
 * Last modified  : 2019-02-18
 */
import Taro, { PureComponent } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View, Image } from '@tarojs/components'
import classnames from 'classnames/bind'
import styles from './index.module.css'

const cx = classnames.bind(styles)

class RecommendListName extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    cover: PropTypes.string
  }

  handleClick() {
    this.props.onClickRecommend(this.props.index)
  }
  render() {
    return (
      <View className={cx('list')} onClick={this.handleClick}>
        <Image className={styles.image} src={this.props.cover} />
        <View className={styles.title}>{this.props.title}</View>
      </View>
    )
  }
}

export default RecommendListName
