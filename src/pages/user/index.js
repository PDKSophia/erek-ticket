/**
 * 用户页面
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-02-19
 * Last modified  : 2019-04-15
 */
import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { Block, View, Image } from '@tarojs/components'
import UserGrid from '@components/UserGrid'
import styles from './index.module.css'

class User extends Component {
  config = {
    navigationBarTitleText: '个人专区',
    navigationBarBackgroundColor: '#fecf03'
  }

  render() {
    const { avatar, nickname } = this.props.user
    return (
      <Block>
        <View className={styles.container}>
          <Image className={styles.avatar} src={avatar} alt='avatar' />
          <View className={styles.username}>{nickname}</View>
        </View>
        <UserGrid />
      </Block>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  ...user
})

export default connect(mapStateToProps)(User)
