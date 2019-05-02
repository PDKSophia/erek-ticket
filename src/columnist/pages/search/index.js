/**
 * 搜索详情页面
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-05-01
 * Last modified  : 2019-05-01
 */
import Taro, { Component } from '@tarojs/taro'
import { Block, View } from '@tarojs/components'
import styles from './index.module.css'
import { connect } from '@tarojs/redux'
import SearchPlaneItem from '@/columnist/components/SearchPlaneItem'
import SearchTrainItem from '@/columnist/components/SearchTrainItem'
import SearchBusItem from '@/columnist/components/SearchBusItem'

class Search extends Component {
  config = {
    navigationBarTitleText: '查询详情',
    navigationBarBackgroundColor: '#fecf03'
  }

  handleClick = (item, index, type) => {
    console.log('当前点击的', item, index, type)
    this.$preload('curDetail', item)
    Taro.navigateTo({
      url: `/columnist/pages/line/index?fromType=${type}&index=${index}`
    })
  }

  render() {
    const { searchType } = this.$router.params
    const { planeState, trainState } = this.props
    return (
      <Block>
        <View className={styles.container}>
          <View className={styles.cell} style={{ paddingBottom: '8px' }}>
            <View className={styles.title}>
              😄 近七日呈上涨趋势，宜尽早购票
            </View>
          </View>
          {searchType === 'plane' && <SearchPlaneItem list={planeState.lineList} onHandleClick={this.handleClick} />}
          {searchType === 'train' && <SearchTrainItem list={trainState.lineList} onHandleClick={this.handleClick} />}
          {searchType === 'bus' && <SearchBusItem onHandleClick={this.handleClick} />}
        </View>
      </Block>
    )
  }
}
const mapStateToProps = (state) => ({
  planeState: state.plane,
  trainState: state.train,
  busState: state.bus
})

export default connect(mapStateToProps)(Search)