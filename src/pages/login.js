import React, { Component } from 'react'
import { List, InputItem, NavBar, Button, WingBlank, Icon, Toast } from 'antd-mobile';
import styles from './css/login.css'
import Link from 'umi/link'
//import axios from 'axios'
import { getLogin } from '../services/auth'
class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
    }
  }
  backHandle () {
    this.props.history.replace({
      pathname: '/'
    })
  }
  handleLogin () {
    if (this.state.userName === '' || this.state.password === '') {
      Toast.fail('请登录')
    }
    else {
      /* axios.post('https://api.cat-shop.penkuoer.com/api/v1/auth/login', {
       userName: this.state.userName,
       password: this.state.password,
     }) */
      getLogin({
        userName: this.state.userName,
        password: this.state.password
      }).then(res => {
        //console.log(res.data.token)
        localStorage.setItem('token', res.data.token)
        this.props.history.replace({
          pathname: '/'
        })
      })
      Toast.success('登录成功')
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
        <NavBar
          icon={<Icon type="left" />}
          onLeftClick={this.backHandle.bind(this)}
          mode="light"
          className={styles.nav}>
          <span>登录</span>
        </NavBar>
        <List className={styles.content}>
          <InputItem onChange={v => this.handleChange('userName', v)}>用户名</InputItem>
          <InputItem onChange={v => this.handleChange('password', v)} type="password">密码</InputItem>
        </List>
        <Link to={{ pathname: 'regest' }}>没账号？请注册</Link>

        <WingBlank size="md">
          <Button type="warning" onClick={this.handleLogin.bind(this)}>登录</Button>
        </WingBlank>
      </div>
    )
  }
}

export default login;
