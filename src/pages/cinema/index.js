/**
 * 电影列表 页面
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2018-09-06
 * Last modified  : 2018-09-06
 */
import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { fetchAllCinemaList, tiggerSaveCurrentCinema } from '../../store/actions/movie'
import './index.scss'

const imgUrls = [
  'http://p1.meituan.net/mmc/b02ff81fda1b184ec54ee91e24bc270795149.jpg',
  'http://p1.meituan.net/mmc/af6c63f1febb7032bc9063b8e5fa1aef95977.jpg',
  'http://p1.meituan.net/mmc/0ce1405139953be69a9f4104a06b21a0149274.jpg'
]

const tag = ['小吃', '折扣卡', 'IMAX厅', '巨幕厅', '改签', '4D', '3D']
class Cinema extends Component {
  config = {
    navigationBarTitleText: '影院专区'
  }

  static propTypes = {
    saveTiggerMovie: PropTypes.func, // 保存当前影院
    getCinemaList: PropTypes.func, // 获取列表
    cinemaList: PropTypes.array // 电影院列表
  }
  static defaultProps = {}

  state = {}

  componentDidMount() {
    if (process.env.NODE_ENV !== 'development') {
      if (this.props.isFetchCinemaList) {
        Taro.showLoading({
          title: '获取影院列表',
          mask: true
        })
      }
      this.props.getCinemaList()
    }
  }

  // 保存当前点击的影院并进入该影院页面
  handleViewOneCinema = cinema => {
    this.props.saveTiggerMovie(cinema)
    Taro.navigateTo({
      url: `/pages/cinema/one?cinemaId=${cinema.cinemaID}`
    })
  }

  render() {
    if (process.env.NODE_ENV !== 'development') {
      if (this.props.isFetchCinemaList) {
        Taro.hideLoading()
      }
    }
    this.props.cinemaList.map(item => {
      let tagArrag = []
      let number = Math.floor(Math.random() * tag.length)
      let judgeIndex = 0
      for (let i = 0; i < number; i++) {
        let tagIndex = Math.floor(Math.random() * tag.length)
        if (tagIndex === judgeIndex) {
          judgeIndex = tagIndex
        } else {
          tagArrag.push(tag[tagIndex])
        }
      }
      item['tagArr'] = tagArrag
    })

    return (
      <View className='cinema'>
        <View className='swiper-image'>
          <Swiper
            className='swiper-container'
            indicatorColor='#999'
            indicatorActiveColor='#333'
            circular
            autoplay
            interval='1500'
          >
            {imgUrls.map((item, index) => {
              return (
                <SwiperItem key={index}>
                  <Image className='cover-image' style={{ width: '100%', height: '100%' }} src={item} />
                </SwiperItem>
              )
            })}
          </Swiper>
        </View>
        <View className='cinema-box'>
          {this.props.cinemaList.map((cinema, index) => {
            return (
              <View className='cinema-item' key={index} onClick={this.handleViewOneCinema.bind(this, cinema)}>
                <View className='cinema-name'>{cinema.name}</View>
                <View className='cinema-address'>{cinema.location}</View>
                <View className='tags'>
                  {cinema.tagArr.map((item, keys) => {
                    return (
                      <Text className={classnames('normal', `tag-${keys}`)} key={keys}>
                        {item}
                      </Text>
                    )
                  })}
                  <Text />
                </View>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  let isFetchCinemaList = state.movie.isFetchCinemaList
  let cinemaList = state.movie.cinemaList
  return {
    isFetchCinemaList,
    cinemaList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCinemaList: () => {
      dispatch(fetchAllCinemaList())
    },
    saveTiggerMovie: jsondata => {
      dispatch(tiggerSaveCurrentCinema(jsondata))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cinema)
