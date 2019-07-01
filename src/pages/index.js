import React, { Component } from 'react'
import { SearchBar, WingBlank, Carousel } from 'antd-mobile';
import styles from './css/index.css';
import Link from 'umi/link'
import isLogin from '../services/isLogin'

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      data: ['1', '2', '3'],
    }
  }
  componentDidMount () {
    if (isLogin) {
      this.setState({
        login: "已登录"
      })
    } else {
      this.setState({
        login: "请登录"
      })
    }
    setTimeout(() => {
      this.setState({
        data: ['https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4115302147,4187931386&fm=27&gp=0.jpg',
          'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=426778248,4142618175&fm=27&gp=0.jpg',
          'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3034622708,2623399241&fm=26&gp=0.jpg'],
      });
    }, 100);
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
          <WingBlank>
            <Carousel
              infinite

            >
              {this.state.data.map(val => (
                <a
                  key={val}
                  href="https://github.com/ccLXYcc/react-umi"
                >
                  <img
                    src={val}
                    alt=""
                    className={styles.img}
                  />
                </a>
              ))}
            </Carousel>
          </WingBlank>
        </div>
      </div>
    )
  }
}
export default index
