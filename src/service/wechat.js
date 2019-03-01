// 微信小程序相关的接口

import Taro from '@tarojs/taro'

/**
 * 微信登录，换取code
 */
export const wxLogin = async () => {
  try {
    const { code } = await Taro.login()
    return code
  } catch (err) {
    err.code = 2000
    err.message = '微信login失败'
    throw err
  }
}

/**
 * 微信获取用户信息
 */
export const wxGetUserInfo = async () => {
  try {
    return await Taro.getUserInfo()
  } catch (err) {
    err.code = 2001
    err.message = '微信获取用户信息失败'
    throw err
  }
}

/**
 * 微信获取系统信息
 */
export const wxGetSystemInfo = async () => {
  try {
    return Taro.getSystemInfoSync()
  } catch (err) {
    err.code = 2002
    err.message = '微信获取系统设备信息失败'
    throw err
  }
}

/**
 * 微信获取用户的权限信息
 */
export const wxGetSetting = async () => {
  try {
    return Taro.getSetting()
  } catch (err) {
    err.code = 2003
    err.message = '微信获取用户的权限信息失败'
    throw err
  }
}

/**
 * 微信设置copy剪贴板的内容
 */
export const wxCopyData = async data => {
  try {
    return Taro.setClipboardData({
      data: data
    })
  } catch (err) {
    err.code = 2004
    err.message = '微信复制剪贴板内容失败'
    throw err
  }
}
