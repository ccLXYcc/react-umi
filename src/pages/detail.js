import React, { Component } from 'react'
import { NavBar, Icon, Button, Toast } from 'antd-mobile';
import { getProductDetail, getAddCart } from '../services/product'
import styles from './css/detail.css'
//import axios from 'axios'
import isLogin from '../services/isLogin'

class detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: {}
    }
  }
  goBacks () {
    this.props.history.replace({
      pathname: 'list'
    })
  }
  componentDidMount () {
    /* axios.get(`https://api.cat-shop.penkuoer.com/api/v1/products/${this.props.location.query.id}`
    ).then(res => {
      this.setState({
        list: res.data
      })
    }) */
    // console.log(this.props.location.query.id)
    getProductDetail(this.props.location.query.id).then(res => {
      this.setState({
        list: res.data
      })
    })
  }
  cartHandle () {
    //console.log(this.state.list._id)
    if (isLogin) {
      /* axios.post('https://api.cat-shop.penkuoer.com/api/v1/shop_carts',
        { product: this.state.list._id, quantity: 1 },
        { headers: { authorization: `Bearer ${isLogin}` } }
      )*/
      getAddCart({
        product: this.state.list._id,
        quantity: 1
      })
    } else {
      Toast.info('请登录')
    }
  }
  render () {
    const { list } = this.state
    return (
      <div>
        <NavBar
          className={styles.navbar}
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.goBacks.bind(this)}
        ><span>商品详情</span></NavBar>
        <div className={styles.detail}>
          <img src={list.coverImg ? `https://api.cat-shop.penkuoer.com${list.coverImg}` : ''} alt={list.name} />
          <h3>{list.name}</h3>
          <p>{list.descriptions}</p>
          <i>{'￥'}{list.price}</i>
          <Button
            onClick={this.cartHandle.bind(this)}
            type="warning"
            className={styles.btn}>
            加购物车
          </Button>
        </div>
      </div>)
  }
}

export default detail
