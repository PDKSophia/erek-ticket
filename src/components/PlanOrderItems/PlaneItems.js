/**
 * 飞机票条目组件，展示型组件，不做任何操作
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-02-25
 * Last modified  : 2019-02-25
 */
import Taro, { PureComponent } from '@tarojs/taro'
import { Block, View, Image, Text } from '@tarojs/components'
import PlaneIcon from '@assets/planeIcon.png'
import './index.scss'

class PlaneItems extends PureComponent {
  componentWillMount() {}

  render() {
    return (
      <Block>
        <View className='plan_pager_item_container'>
          <View className='plan_item_title'>
            <View className='plan_item_left'>
              <Image src={PlaneIcon} className='item_icon' alt='' />
              <Text className='item_title'>机票</Text>
            </View>
            <View className='plan_item_right order_status_30'>出票完成</View>
          </View>
          <View className='plan_item_content'>
            <View className='item_order_left'>
              <View className='item_order_name'>广州 - 成都</View>
              <View className='item_order_date'>2019-02-16 11:55 - 14:30</View>
              <View className='item_order_tag'>川航3U8732</View>
            </View>
            <View className='item_order_right'>
              <Text className='item_order_price'>¥ 499</Text>
            </View>
          </View>
          <View className='plan_item_action'>
            <View className='item_action_button'>查看详情</View>
            <View className='item_action_button'>晒旅行</View>
          </View>
        </View>
        <View className='plan_pager_item_container'>
          <View className='plan_item_title'>
            <View className='plan_item_left'>
              <Image src={PlaneIcon} className='item_icon' alt='' />
              <Text className='item_title'>机票</Text>
            </View>
            <View className='plan_item_right order_status_30'>出票完成</View>
          </View>
          <View className='plan_item_content'>
            <View className='item_order_left'>
              <View className='item_order_name'>广州 - 成都</View>
              <View className='item_order_date'>2019-02-16 11:55 - 14:30</View>
              <View className='item_order_tag'>川航3U8732</View>
            </View>
            <View className='item_order_right'>
              <Text className='item_order_price'>¥ 499</Text>
            </View>
          </View>
          <View className='plan_item_action'>
            <View className='item_action_button'>查看详情</View>
            <View className='item_action_button'>晒旅行</View>
          </View>
        </View>
        <View className='plan_pager_item_container'>
          <View className='plan_item_title'>
            <View className='plan_item_left'>
              <Image src={PlaneIcon} className='item_icon' alt='' />
              <Text className='item_title'>机票</Text>
            </View>
            <View className='plan_item_right order_status_30'>出票完成</View>
          </View>
          <View className='plan_item_content'>
            <View className='item_order_left'>
              <View className='item_order_name'>广州 - 成都</View>
              <View className='item_order_date'>2019-02-16 11:55 - 14:30</View>
              <View className='item_order_tag'>川航3U8732</View>
            </View>
            <View className='item_order_right'>
              <Text className='item_order_price'>¥ 499</Text>
            </View>
          </View>
          <View className='plan_item_action'>
            <View className='item_action_button'>查看详情</View>
            <View className='item_action_button'>晒旅行</View>
          </View>
        </View>
      </Block>
    )
  }
}

export default PlaneItems
