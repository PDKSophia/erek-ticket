/**
 * 用户信息授权弹框
 * @Author: PDK
 * @Date:   2019-04-12
 * @Last modified by:   PDK
 * @Last modified time: 2019-04-12
 */

import Taro, { Component } from '@tarojs/taro'
import { Block, View, Text, Button } from '@tarojs/components'
import styles from './index.module.css'

export default class AuthModal extends Component {
  handleClick = () => {
    this.props.onToggleModal()
  }

  handleUserInfo = res => {
    if (res.detail.errMsg === 'getUserInfo:ok') {
      this.props.onCloseAuthModal()
    }
  }

  render() {
    return (
      <Block className={styles.modal}>
        <View className={styles.container}>
          <View className={styles.title}>
            <Text className={styles.titleText}>用户信息授权</Text>
          </View>
          <View className={styles.content}>
            <Text className={styles.contentText}>Erek-Ticket 需要获取用户的头像和昵称</Text>
          </View>
          <View className={styles.divider} />
          <View className={styles.buttons}>
            <Button className={styles.authButton} open-type='getUserInfo' onGetUserInfo={this.handleUserInfo}>
              <Text className={styles.btnText}>确认授权</Text>
            </Button>
          </View>
        </View>
      </Block>
    )
  }
}
