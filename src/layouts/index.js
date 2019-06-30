import React, { Component } from 'react'
/* import Toast from 'antd-mobile' */
import styles from './index.css'
import NavLink from 'umi/navlink'

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'redTab',
      hidden: false,
      fullScreen: false,
    }
  }

  render () {
    return (
      <div id='app'>
        {this.props.children}
        <div className={styles.footer}>
          <ul>
            <li><NavLink exact to={{ pathname: '/' }} replace>首页</NavLink></li>
            <li><NavLink to={{ pathname: '/list' }} replace>列表</NavLink></li>
            <li><NavLink to={{ pathname: '/cart' }} replace>购物车</NavLink></li>
            <li><NavLink to={{ pathname: '/my' }} replace>我的</NavLink></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default index

