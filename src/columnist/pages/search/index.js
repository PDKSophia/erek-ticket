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
import cssStyles from './index.module.css'
import { connect } from '@tarojs/redux'
import SearchPlaneItem from '@/columnist/components/SearchPlaneItem'
import SearchTrainItem from '@/columnist/components/SearchTrainItem'
import SearchBusItem from '@/columnist/components/SearchBusItem'
import NoContent from '@/columnist/components/NoContent'

class Search extends Component {
  config = {
    navigationBarTitleText: '查询详情',
    navigationBarBackgroundColor: '#fecf03'
  }

  state = {
    isNoContent: true, // 是否暂无数据
    lineList: [], // 渲染的数据
    searchType: 'plane'
  }

  componentWillMount() {
    const { searchType } = this.$router.params
    const { planeState, trainState, busState } = this.props
    try {
      if (searchType === 'plane') {
        if (planeState.lineList.length !== 0) {
          this.setState({
            lineList: [...planeState.lineList],
            isNoContent: false,
            searchType: searchType
          })
        } else {
          this.setState({
            isNoContent: true,
            searchType: searchType
          })
        }
      } else if (searchType === 'train') {
        if (trainState.lineList.length !== 0) {
          this.setState({
            lineList: [...trainState.lineList],
            isNoContent: false,
            searchType: searchType
          })
        } else {
          this.setState({
            isNoContent: true,
            searchType: searchType
          })
        }
      } else {
        if (busState.lineList.length !== 0) {
          this.setState({
            lineList: [...busState.lineList],
            isNoContent: false,
            searchType: searchType
          })
        } else {
          this.setState({
            isNoContent: true,
            searchType: searchType
          })
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  handleClick = (item, index, type) => {
    this.$preload('curDetail', item)
    Taro.navigateTo({
      url: `/columnist/pages/line/index?fromType=${type}&index=${index}`
    })
  }

  render() {
    const { isNoContent, lineList } = this.state
    const { searchType } = this.$router.params
    return (
      <Block>
        <View className={cssStyles.container}>
          <View className={cssStyles.cell} style={{ paddingBottom: '8px' }}>
            <View className={cssStyles.title}>😄 近七日呈上涨趋势，宜尽早购票</View>
          </View>
          {isNoContent === true ? (
            <NoContent />
          ) : (
            <View>
              {searchType === 'plane' && <SearchPlaneItem list={lineList} onHandleClick={this.handleClick} />}
              {searchType === 'train' && <SearchTrainItem list={lineList} onHandleClick={this.handleClick} />}
              {searchType === 'bus' && <SearchBusItem list={lineList} onHandleClick={this.handleClick} />}
            </View>
          )}
        </View>
      </Block>
    )
  }
}
const mapStateToProps = state => ({
  planeState: state.plane,
  trainState: state.train,
  busState: state.bus
})

export default connect(mapStateToProps)(Search)
