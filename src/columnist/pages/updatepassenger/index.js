/**
 * 新增/编辑 乘坐人页面
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-05-23
 * Last modified  : 2019-05-23
 */
import Taro, { Component } from '@tarojs/taro'
import { Block, View } from '@tarojs/components'
import classnames from 'classnames/bind'
import { connect } from '@tarojs/redux'
import { actions as userActions } from '@redux/user'
import MainButton from '@components/MainButton'
import styles from './index.module.css'

const cx = classnames.bind(styles)

class UpdatePassenger extends Component {
  config = {
    navigationBarTitleText: '乘客信息',
    navigationBarBackgroundColor: '#fecf03'
  }

  state = {
    selector: ['身份证', '护照', '出身证明', '户口薄', '港澳台居民居住证', '军人证', '其他'],
    selectorChecked: '身份证',
    selectorValue: '',
    nickname: '',
    phone: ''
  }

  onChange = e => {
    this.setState({
      selectorChecked: this.state.selector[e.detail.value]
    })
  }

  componentWillMount() {
    try {
      const curPassenger = this.$router.preload.curClickPassenger
      this.setState({
        selectorChecked: curPassenger.type,
        selectorValue: curPassenger.uniqueId,
        nickname: curPassenger.nickname,
        phone: curPassenger.phone
      })
    } catch (err) {
      console.log('error')
    }
  }

  handleSavePassenger = async () => {
    const { type, index } = this.$router.params
    if (this.state.nickname && this.state.selectorValue && this.state.phone) {
      if (type === 'create') {
        await this.props.dispatch(
          userActions.createPassenger({
            type: this.state.selectorChecked,
            uniqueId: this.state.selectorValue,
            nickname: this.state.nickname,
            phone: this.state.phone
          })
        )
      } else {
        await this.props.dispatch(
          userActions.updatePassenger(
            {
              type: this.state.selectorChecked,
              uniqueId: this.state.selectorValue,
              nickname: this.state.nickname,
              phone: this.state.phone
            },
            index
          )
        )
      }
      Taro.navigateBack()
    } else {
      Taro.showToast({
        title: '还有未输入信息',
        duration: 2000,
        icon: 'none'
      })
    }
  }

  handleChangeValue = event => {
    let label = event.currentTarget.dataset.label
    this.setState({
      [label]: event.currentTarget.value
    })

    // setTimeout(() => {
    //   console.log(this.state)
    // }, 200)
  }

  handleClickInput = event => {
    // console.log('event: ', event.currentTarget.id)
    // console.log('点击')
  }

  render() {
    return (
      <Block>
        <View className={styles.container}>
          <View className={cx('main', 'flex')}>
            <View className={styles.label}>乘客姓名</View>
            <Input
              id='nickname'
              type='text'
              className={styles.input}
              value={this.state.nickname}
              data-label='nickname'
              onChange={this.handleChangeValue}
              onClick={this.handleClickInput}
            />
          </View>
          <View className={cx('main', 'flex')}>
            <View className={styles.label}>证件类型</View>
            <View className={styles.nickname}>
              <Picker mode='selector' range={this.state.selector} onChange={this.onChange}>
                <View className='picker'>{this.state.selectorChecked}</View>
              </Picker>
            </View>
          </View>
          <View className={cx('main', 'flex')}>
            <View className={styles.label}>证件号码</View>
            <Input
              id='selectorValue'
              type='text'
              className={styles.input}
              value={this.state.selectorValue}
              data-label='selectorValue'
              onChange={this.handleChangeValue}
              onClick={this.handleClickInput}
            />
          </View>
          <View className={cx('main', 'flex')}>
            <View className={styles.label}>电话号码</View>
            <Input
              id='phone'
              type='text'
              className={styles.input}
              value={this.state.phone}
              data-label='phone'
              onChange={this.handleChangeValue}
              onClick={this.handleClickInput}
            />
          </View>
          <View className={styles.button}>
            <MainButton
              text='保存'
              color='primary'
              size='normal'
              width='75%'
              onHandleClick={this.handleSavePassenger}
            />
          </View>
        </View>
      </Block>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  ...user
})

export default connect(mapStateToProps)(UpdatePassenger)
