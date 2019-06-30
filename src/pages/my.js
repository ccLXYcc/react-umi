import React, { Component } from 'react'
import { NavBar, Icon, Button } from 'antd-mobile';
import Link from 'umi/link'
import axios from 'axios'

class my extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      btn: ''
    }
  }
  myHandle () {
    this.props.history.replace({
      pathname: '/'
    })
  }
  componentDidMount () {
    const isLogin = localStorage.getItem('token')
    if (isLogin) {
      axios.get('https://api.cat-shop.penkuoer.com/api/v1/users/info', {
        headers: { authorization: `Bearer ${isLogin}` }
      }).then(res => {
        this.setState({
          name: res.data.userName,
          btn: <Button onClick={this.logout.bind(this)}
            type="warning" className='btn'>退出登录</Button>
        })
      })
    } else {
      this.setState({
        name: <Link to={{ pathname: 'login' }}>请登录</Link>,
        btn: ''
      })
    }
  }
  logout () {
    const isLogin = localStorage.getItem('token')
    if (isLogin) {
      localStorage.removeItem('token')
    }
  }
  render () {
    const { name, btn } = this.state
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.myHandle.bind(this)}
        >我的</NavBar>
        <h1>{name}</h1>
        {btn}
      </div>
    )
  }
}

export default my
