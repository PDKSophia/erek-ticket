/**
 * 用户页面
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-02-19
 * Last modified  : 2019-02-19
 */
import Taro, { Component } from '@tarojs/taro'
import { Block, View, Image } from '@tarojs/components'
import PropTypes from 'prop-types'
import UserGrid from '../../components/UserGrid'
import './index.scss'

class User extends Component {
  static propTypes = {
    userObj: PropTypes.object, // 用户信息
    changeFetchUserInfo: PropTypes.func,
    fetchUserInfo: PropTypes.func // 获取用户其他相关信息
  }

  config = {
    navigationBarTitleText: '个人专区',
    navigationBarBackgroundColor: '#fecf03'
  }

  componentDidShow() {
    // this.props.fetchUserInfo()
  }

  componentDidHide() {}

  render() {
    return (
      <Block>
        <View className='user'>
          <View className='bg-mask'>
            {/* <Image className='mask-image' src={this.props.userObj.avatarUrl} alt='avatar' /> */}
          </View>
          <View className='user-avatar'>
            <Image className='avatar' src='https://www.pengdaokuan.cn/static/assets/userpdk.jpeg' alt='avatar' />
            <View className='username'>彭道宽</View>
          </View>
        </View>
        <UserGrid />
      </Block>
    )
  }
}

export default User
