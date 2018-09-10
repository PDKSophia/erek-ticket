/**
 * 电影单数
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2018-09-04
 * Last modified  : 2018-09-04
 */
import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View, Image, Button, Text } from '@tarojs/components'
import './index.scss'

class MovieItem extends Component {
  static propTypes = {
    movieItems: PropTypes.object, // 每条电影数据
    onHandleTiggerMovie: PropTypes.func // 保存当前触发的电影数据
  }
  config = {
    navigationBarTitleText: '首页'
  }

  componentDidMount () {
  }
    
  handleViewMovie = (item) => {
    this.props.onHandleTiggerMovie(item)
    Taro.navigateTo({
      url: `/pages/movie/introduce?id=${item.id}`
    })
  }
  
  render () {
    return (
      <View>
        <View className='flex-box'>
          <View className='left-cell'>
            <Image className='image' src={this.props.movieItems.picture} />
          </View>
          <View className='middle-cell' onClick={this.handleViewMovie.bind(this, this.props.movieItems)}>
            <View className='title'>{this.props.movieItems.name}</View>
            <View className='main-content'>评分 : <Text style={{ color: '#faaf00' }}>{this.props.movieItems.score}</Text></View>
            <View className='main-content'>类型 : {this.props.movieItems.type}</View>
            <View className='main-content'>导演 : {this.props.movieItems.director}</View>
          </View>
          <View className='right-cell'>
            <Button className='main-btn order'>购买</Button>
          </View>
        </View>
      </View>
    )
  }
}

export default MovieItem
