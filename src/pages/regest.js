import React, { Component } from 'react'
import { List, InputItem, NavBar, Button, WingBlank, Icon, Toast } from 'antd-mobile';
import styles from './css/login.css'
import Link from 'umi/link'
//import axios from 'axios'
import { getRegest } from '../services/auth'

class regest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      suerPassword: ''
    }
  }
  backHandle () {
    this.props.history.replace({ pathname: '/' })
  }
  /* handleRegister () {
    if (this.state.suerPassword === this.state.password) {
      axios.post('https://api.cat-shop.penkuoer.com/api/v1/auth/reg', {
        userName: this.state.userName,
        password: this.state.password,
      }).then(res => {
        //console.log(res.data.token)
        localStorage.setItem('token', res.data.token)
        this.props.history.replace({
          pathname: '/'
        })
      })
    } else {
      Toast.fail('请重新输入密码')
    }
  } */
  handleRegister () {
    if (this.state.suerPassword === this.state.password) {
      getRegest({
        userName: this.state.userName, password: this.state.password
      }).then(res => {
        localStorage.setItem('token', res.data.token)
        this.props.history.replace({
          pathname: '/'
        })
      })
    } else {
      Toast.fail('请重新输入密码')
    }
  }
  //监控输入框的变化，及时更新state中的值
  handleChange (key, val) {
    this.setState({
      [key]: val
    })
  }
  render () {
    return (
      <div>
        <NavBar mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.backHandle.bind(this)}
          className={styles.nav}>
          <span>注册</span>
        </NavBar>
        <List className={styles.content}>
          <InputItem onChange={v => this.handleChange('userName', v)}>用户名</InputItem>
          <InputItem onChange={v => this.handleChange('password', v)} type="password">密码</InputItem>
          <InputItem onChange={v => this.handleChange('suerPassword', v)} type="password">确认密码</InputItem>
        </List>
        <Link to={{ pathname: 'login' }}>已有账号？请登录</Link>
        <WingBlank size="md">
          <Button onClick={this.handleRegister.bind(this)} type="warning">注册</Button>
        </WingBlank>
      </div >
    )
  }
}

export default regest

