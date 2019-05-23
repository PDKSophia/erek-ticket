/**
 * 乘客人列表页面
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-05-23
 * Last modified  : 2019-05-23
 */
import Taro, { Component } from '@tarojs/taro'
import { Block, View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { actions as userActions } from '@redux/user'
import styles from './index.module.css'

class PassengerList extends Component {
  config = {
    navigationBarTitleText: '乘客列表',
    navigationBarBackgroundColor: '#fecf03'
  }

  state = {
    list: []
  }

  componentWillMount() {
    let passengerList = JSON.parse(this.props.user.prefix).passengerList
    this.setState({
      list: [...passengerList]
    })
  }

  componentWillReceiveProps(nextProps) {
    let nextPassengerList = JSON.parse(nextProps.user.prefix).passengerList
    this.setState({
      list: [...nextPassengerList]
    })
  }

  handleToggleModal = async (type, data, index) => {
    if (type === 'delete') {
      await this.props.dispatch(userActions.deletePassenger(index))
    } else {
      this.$preload('curClickPassenger', data)
      Taro.navigateTo({
        url: `/columnist/pages/updatepassenger/index?type=${type}&index=${index}`
      })
    }
  }

  render() {
    const { list } = this.state
    return (
      <Block>
        <View className={styles.container}>
          <View className={styles.addPassenger} onClick={() => this.handleToggleModal('create', null, -1)}>
            + 新增联系人
          </View>
          {list.map((item, index) => {
            return (
              <View className={styles.passenger} key={index}>
                <View>
                  <Text className={styles.nickname}>{item.nickname}</Text>
                  <Text className={styles.edit} onClick={() => this.handleToggleModal('update', item, index)}>
                    编辑
                  </Text>
                </View>
                <View>
                  <Text className={styles.idcard}>
                    {' '}
                    {item.type} {item.uniqueId}
                  </Text>
                  <Text className={styles.delete} onClick={() => this.handleToggleModal('delete', item, index)}>
                    删除
                  </Text>
                </View>
              </View>
            )
          })}
        </View>
      </Block>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  ...user
})

export default connect(mapStateToProps)(PassengerList)
