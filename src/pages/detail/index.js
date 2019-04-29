/**
 * 城市详情页面
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-04-24
 * Last modified  : 2019-04-28
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { actions as globalActions } from '@redux/global'
import styles from './index.module.css'

class Detail extends Component {
  config = {
    navigationBarTitleText: '查看详情',
    navigationBarBackgroundColor: '#fecf03'
  }

  state = {
    cityId: 0,
    cityName: '',
    text: '西安是中华文明和中华民族重要发祥地之一。长安多次为都城，其先后有西周、秦、西汉、新莽、东汉、西晋、前赵、前秦、后秦、西魏、北周、隋、唐13个王朝在此建都。丰镐都城、秦阿房宫、兵马俑，汉未央宫、长乐宫，隋大兴城，唐大明宫、兴庆宫等勾勒出“长安情结”'
  }

  async componentWillMount() {
    try {
      const { cityId, cityName } = this.$router.params
      this.setState({
        cityId: cityId,
        cityName: cityName
      })
      this.props.dispatch(globalActions.setToCity(cityName))
    } catch (err) {
      this.setState({
        cityId: 0,
        cityName: '西安'
      })
    }
    console.log(this.props)
  }

  handleChoosePosition = () => {
    Taro.navigateTo({
      url: `/columnist/pages/detail/index`
    })
  }

  render() {
    const { city_name, city_cover, city_desc, city_status, city_score, city_summary, city_visited } = this.props.currentCity
    return (
      <View className={styles.backgroundContainer}>
        <View className={styles.container}>
          <Image className={styles.cityCover} src={city_cover} />
          {/* <View className={styles.summary}>西安</View> */}
        </View>
        <View className={styles.introduce}>
          <View className={styles.cell}>
            <View className={styles.left}>
              <View className={styles.title}>{city_name}</View>
              <Button className={styles.button}>{city_summary}</Button>
              <View className={styles.prefix}>
                <View>类型: {city_status === 1 ? '省会城市' : '其他城市'}</View>
                <View>国家: 中国/{city_name}</View>
                <View>特色: 古都/美食/经济</View>
              </View>
            </View>
            <View className={styles.right}>
              <View className={styles.square}>
                <View className={styles.score}>大众评分</View>
                <View className={styles.get_score}>{city_score}分</View>
                <View className={styles.score}>{city_visited}人去过</View>
              </View>
            </View>
          </View>
          <View className={styles.content}>
            <View className={styles.label}>简介</View>
            <View className={styles.text} id="summary_content">{city_desc}</View>
          </View>
        </View>
        <View className={styles.orderButton} onClick={() => this.handleChoosePosition()}>去购票</View>
      </View>
    )
  }
}

const mapStateToProps = ({ global }) => ({
  ...global
})

export default connect(mapStateToProps)(Detail)
