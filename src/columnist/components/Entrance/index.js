import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View, Image, Text } from '@tarojs/components'
import './index.scss'

class Entrance extends Component {
  static propTypes = {
    fokErekEntry: PropTypes.array // 入口专区
  }

  config = {
    navigationBarTitleText: '首页'
  }

  componentDidMount() {}
  handleEntryArea = type => {
    Taro.navigateTo({
      url: `/pages/${type}/index`
    })
  }

  render() {
    return (
      <View>
        {this.props.fokErekEntry.map((ety, index) => {
          return (
            <View className='entry-box' key={index}>
              <View className='media-type' onClick={this.handleEntryArea.bind(this, ety.type)}>
                <View class='cell'>
                  <Image src={ety.icon} alt='' />
                </View>
                <View className='cell context'>
                  <Text className='text'>{ety.title}</Text>
                </View>
                <View className='cell'>
                  <Image src={ety.arrow} alt='' className='arrow' />
                </View>
              </View>
            </View>
          )
        })}
      </View>
    )
  }
}

export default Entrance
