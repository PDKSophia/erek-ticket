/**
 * 主按钮
 * @Author: PDK
 * @Date:   2019-02-21
 * @Last modified by:   PDK
 * @Last modified time: 2019-03-01
 */

import Taro, { PureComponent } from '@tarojs/taro'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { Button, Text } from '@tarojs/components'
import styles from './index.module.css'

const cx = classnames.bind(styles)
class MainButton extends PureComponent {
  static propTypes = {
    color: PropTypes.oneOf([
      'primary', // 主按钮
      'secondary', // 二级按钮
      'threedary' // 三级按钮
    ]),
    text: PropTypes.string,
    onClick: PropTypes.func,
    size: PropTypes.oneOf([
      'big', //主按钮 307px
      'normal', //二级按钮 302px
      'small' //三级按钮 250px
    ]),
    width: PropTypes.string
  }

  static defaultProps = {
    text: '搜索',
    type: 'begin',
    size: 'big',
    width: ''
  }

  handleClick = () => {
    this.props.onHandleClick()
  }

  render() {
    return (
      <Button
        className={cx('main-btn', `main-btn-${this.props.color}-bg`, {
          ' small ': this.props.size === 'small',
          ' normal ': this.props.size === 'normal'
        })}
        hoverClass={cx(`main-btn-${this.props.color}-hover-bg`)}
        onClick={this.handleClick}
        style={{ width: this.props.width }}
      >
        <Text className={styles.text}>{this.props.text}</Text>
      </Button>
    )
  }
}

export default MainButton
