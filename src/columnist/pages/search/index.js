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
import { Block, View, Image } from '@tarojs/components'
import styles from './index.module.css'
import SearchPlaneItem from '@/columnist/components/SearchPlaneItem'
import SearchTrainItem from '@/columnist/components/SearchTrainItem'
import SearchBusItem from '@/columnist/components/SearchBusItem'

class Search extends Component {
  config = {
    navigationBarTitleText: '查询详情',
    navigationBarBackgroundColor: '#fecf03'
  }

  handleClick = id => {
    Taro.navigateTo({
      url: `/columnist/pages/line/index`
    })
  }

  render() {
    const { searchType } = this.$router.params
    return (
      <Block>
        <View className={styles.container}>
          <View className={styles.cell} style={{ paddingBottom: '8px' }}>
            <View className={styles.title}>
              😄 近七日呈上涨趋势，宜尽早购票
            </View>
          </View>
          {searchType === 'plane' && <SearchPlaneItem onHandleClick={this.handleClick} />}
          {searchType === 'train' && <SearchTrainItem onHandleClick={this.handleClick} />}
          {searchType === 'bus' && <SearchBusItem onHandleClick={this.handleClick} />}
        </View>
      </Block>
    )
  }
}

export default Search
