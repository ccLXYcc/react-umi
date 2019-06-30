import React, { Component } from 'react'
import { SearchBar } from 'antd-mobile';
import styles from './css/index.css';
import Link from 'umi/link'

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
    }
  }
  componentDidMount () {
    const isLogin = localStorage.getItem('token')
    if (isLogin) {
      this.setState({
        login: "已登录"
      })
    } else {
      this.setState({
        login: "请登录"
      })
    }
  }
  render () {
    return (
      <div>
        <div className={styles.nav}>
          <Link to={{ pathname: 'login' }}><span className={styles.login}>{this.state.login}</span></Link>
          <div className={styles.seach}>
            <SearchBar
              placeholder="夏天来点冰"
            /></div>
        </div>
      </div>
    )
  }
}
export default index
