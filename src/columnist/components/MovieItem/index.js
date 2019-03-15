/**
 * 电影条目
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-03-15
 * Last modified  : 2019-03-15
 */
import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { Block, View, Image, Button, Text } from '@tarojs/components'
import styles from './index.module.css'

class MovieItem extends Component {
  static propTypes = {
    movieItems: PropTypes.object // 每条电影数据
  }
  config = {
    navigationBarTitleText: '首页'
  }

  componentDidMount() {}

  handleClick = item => {
    console.log(item)
  }

  render() {
    const { name, score, type, director, cover } = this.props.movieItems
    return (
      <Block>
        <View className={styles.container}>
          <View className={styles.left}>
            <Image className={styles.cover} src={cover} />
          </View>
          <View className={styles.middle} onClick={() => this.handleClick(this.props.movieItems)}>
            <View className={styles.title}>{name}</View>
            <View className={styles.text}>
              评分 : <Text style={{ color: '#faaf00' }}>{score}</Text>
            </View>
            <View className={styles.text}>类型 : {type}</View>
            <View className={styles.text}>导演 : {director}</View>
          </View>
          <View className={styles.right}>
            <Button className={styles.button}>购买</Button>
          </View>
        </View>
      </Block>
    )
  }
}

export default MovieItem
