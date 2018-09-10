/**
 * 用户信息授权弹框
 * @Author: PDK
 * @Date:   2018-09-04
 * @Last modified by:   PDK
 * @Last modified time: 2018-09-04
 */

import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'

import './index.scss'

export default class AuthModal extends Component {

 handleClick = () => {
   this.props.onToggleModal()
 }

 handleUserInfo = (res) => {
   if (res.detail.errMsg === 'getUserInfo:ok') {
     this.props.onCloseAuthModal()
   }
 }

 render () {
   return (
     <View className='auth-modal'>
       <View className='auth-modal-container'>
         <View className='title'>
           <Text className='text'>用户信息授权</Text>
         </View>
         <View className='content'>
           <Text className='text'>FOK ONE需要获取用户的头像和昵称</Text>
         </View>
         <View className='divider'></View>
         <View className='btn-container'>
           <Button
             className='auth-btn'
             open-type='getUserInfo'
             onGetUserInfo={this.handleUserInfo}
           >
              <Text className='text'>确认授权</Text>
            </Button>
         </View>
       </View>
     </View>
   )
 }
}
