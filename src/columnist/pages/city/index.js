/**
 * 城市页面
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-04-23
 * Last modified  : 2019-04-23
 */
import Taro, { Component } from '@tarojs/taro'
import { Block, View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { actions as planeActions } from '@redux/plane'
import { actions as trainActions } from '@redux/train'
import { actions as busActions } from '@redux/bus'
import styles from './index.module.css'
import { AtoZ } from '@utils/app'
import { cityList } from '@utils/citylist'

class City extends Component {
  config = {
    navigationBarTitleText: '选择城市',
    navigationBarBackgroundColor: '#fecf03'
  }
  state = {
    scrollAZ: null,
    scrollNow: 0,
    fromUrl: 'plane',
    typeCity: 'fromCity',
    clickCity: ''
  }

  componentWillMount() {
    const { params } = this.$router
    try {
      const { typeCity, fromUrl } = params
      console.log('等一哈~', typeCity, fromUrl)
      this.setState({
        typeCity: typeCity,
        fromUrl: fromUrl
      })
    } catch (err) {
      console.log('error')
    }
  }

  handleBindAZ = async event => {
    const currentLetter = event.currentTarget.dataset.az
    const that = this
    // 放入A-Z的scrollTop参数
    if (that.state.scrollAZ === null) {
      Taro.createSelectorQuery().selectAll('.index-module__labels___3OlzL').fields({
        dataset: true,
        size: true,
        rect: true
      }, function (res) {
        res.forEach(result => {
          if (currentLetter === result.dataset.labels) {
            Taro.pageScrollTo({
              scrollTop: result.top + that.state.scrollNow - 55.5,
              duration: 300
            })
          }
        })
      }).exec()
    } else {
      that.state.scrollAZ.forEach(item => {
        if (currentLetter === item.dataset.cityname) {
          Taro.pageScrollTo({
            scrollTop: item.top + that.state.scrollNow - 55.5,
            duration: 300
          })
        }
      })
    }
  }

  // 获取当前滚动条位置
  onPageScroll = e => {
    this.setState({
      scrollNow: e.scrollTop
    })
  }

  // 选中城市
  handleCitySelected = event => {
    const cityName = event.currentTarget.dataset.cityname
    if (this.state.fromUrl === 'plane') {
      if (this.state.typeCity === 'fromCity') {
        this.props.dispatch(planeActions.setFromCity(cityName))
      } else {
        this.props.dispatch(planeActions.setToCity(cityName))
      }
    } else if (this.state.fromUrl === 'train') {
      if (this.state.typeCity === 'fromCity') {
        this.props.dispatch(trainActions.setFromCity(cityName))
      } else {
        this.props.dispatch(trainActions.setToCity(cityName))
      }
    } else {
      if (this.state.typeCity === 'fromCity') {
        this.props.dispatch(busActions.setFromCity(cityName))
      } else {
        this.props.dispatch(busActions.setToCity(cityName))
      }
    }
    Taro.navigateBack()
  }

  render() {
    return (
      <Block>
        <View className={styles.containerAtoZ}>
          {AtoZ.map((item, index) => {
            return (
              <View key={index}>
                <View data-az={item.text} onClick={this.handleBindAZ.bind(event)}>{item.text}</View>
              </View>
            )
          })}
        </View>
        <View className={styles.content}>
          {cityList.map((iCity, index) => {
            return (
              <View key={index} className={styles.cityContainer}>
                <View data-labels={iCity.label} className={styles.labels}>{iCity.label}</View>
                {iCity.list.map((items, idx) => {
                  return (
                    <View
                      key={idx}
                      className={styles.pyItemCity}
                      data-cityname={items.cityName}
                      onClick={this.handleCitySelected.bind(items)}
                    >
                      {items.cityName}
                    </View>)
                })}
              </View>
            )
          })}
        </View>
      </Block >
    )
  }
}

const mapStateToProps = ({ plane }) => ({
  ...plane
})

export default connect(mapStateToProps)(City)
