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
import classnames from 'classnames'

import './index.scss'

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
      <View
        className={classnames({
          'plan-list-name': true,
          'cur-course': this.props.checked
        })}
        onClick={this.handleClick}
      >
        <Image className='image' src={this.props.cover} />
        <View className='title'>{this.props.title}</View>
      </View>
    )
  }
}

export default RecommendListName
