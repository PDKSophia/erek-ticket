/**
 * 用户页面
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2018-09-04
 * Last modified  : 2018-09-04
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import PropTypes from 'prop-types'
import { fetchAuthUserInfo } from '../../store/actions/user'
import Grid from '../../components/Grid'
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
      <View>
        <View className='user'>
          <View className='bg-mask'>
            {/* <Image className='mask-image' src={this.props.userObj.avatarUrl} alt='avatar' /> */}
          </View>
          <View className='user-avatar'>
            <Image className='avatar' src='https://www.pengdaokuan.cn/static/assets/userpdk.jpeg' alt='avatar' />
            <View className='username'>彭道宽</View>
          </View>
        </View>
        <Grid />
      </View>
    )
  }
}

const mapStateToProps = state => {
  let userObj = state.user.userObj
  return {
    userObj
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUserInfo: () => {
      dispatch(fetchAuthUserInfo())
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User)
