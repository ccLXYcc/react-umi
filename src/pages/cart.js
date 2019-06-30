/* eslint-disable no-unused-expressions */
import React, { Component } from 'react'
import { NavBar, Icon, Button, Toast } from 'antd-mobile';
//import axios from 'axios'
import styles from './css/cart.css'
import { Checkbox, Popconfirm, message } from 'antd';
import { getCart, getDel } from '../services/product'
import isLogin from '../services/isLogin'

class cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      list: [],
      quantity: 0,
      price: 0
    }
  }
  cartHandle () {
    this.props.history.replace({
      pathname: 'list'
    })
  }
  componentDidMount () {
    if (isLogin) {
      /*  axios.get('https://api.cat-shop.penkuoer.com/api/v1/shop_carts', {
         headers: { authorization: `Bearer ${isLogin}` }
       }).then(res => {
         //console.log(res.data)
         this.setState({
           list: res.data
         })
       }) */
      getCart().then(res => {
        this.setState({
          list: res.data
        })
      })
    } else {
      Toast.info('请登录')
    }
  }

  confirm (id) {
    //const isLogin = localStorage.getItem('token')
    /* axios.delete(`https://api.cat-shop.penkuoer.com/api/v1/shop_carts/${id}`, {
      headers: { authorization: `Bearer ${isLogin}` }
    }) */
    getDel(id)
    message.success('删除成功')
  }
  cancel () {
    message.error('取消删除');
  }
  allChange (e) {
    console.log(e.target.checked)
    if (e.target.checked === true) {
      this.setState({
        list: this.state.list.map((item) => {
          item.checked = true
          return item
        })
      })
    } else if (e.target.checked === false) {
      this.setState({
        list: this.state.list.map((item) => {
          item.checked = false
          return item
        })
      })
    }
  }
  checkedBoxHandle (index, price, quantity, e) {
    let arr = this.state.list.filter(item => item.product)
    arr[index].checked = !arr[index].checked
    this.setState({
      list: arr
    })
    if (e.target.checked === true) {
      this.setState({
        price: quantity * price
      })
    } else if (e.target.checked === false) {
      this.setState({
        price: 0
      })
    }
    console.log(quantity * price)
  }
  render () {
    const { list, name, price } = this.state
    return (
      <div>
        <NavBar
          className={styles.navbar}
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.cartHandle.bind(this)}
        ><span>购物车</span></NavBar>
        <h1>{name}</h1>
        <div className={styles.cart}>
          <ul>
            {list.filter(item => item.product).map((item, index) =>
              <li key={item._id} checked={false}>
                <Checkbox
                  style={{ float: 'left' }}
                  checked={item.checked}
                  onChange={this.checkedBoxHandle.bind(this, index, item.product.price, item.quantity)}
                ></Checkbox>
                <img src={`https://api.cat-shop.penkuoer.com/${item.product.coverImg}`} alt={item.product.name} />
                <h3>{item.product.name}</h3>
                <p>{item.product.descriptions}</p>
                <i>{'￥'}{item.product.price}</i>
                数量：<b>{item.quantity}</b>
                <Popconfirm
                  title="确定删除?"
                  onConfirm={this.confirm.bind(this, item._id)}
                  onCancel={this.cancel.bind(this)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button className={styles.del} type="warning"
                  >删除</Button>
                </Popconfirm>
              </li>
            )}
          </ul>
          <div className={styles.footer}>
            <Checkbox onChange={this.allChange.bind(this)}>全选</Checkbox>
            <span style={{ marginLeft: '7rem' }}>{'￥'}{price}</span>
            <Button type="warning"
              className={styles.btn}
            >结算</Button>
          </div>
        </div>
      </div >
    )
  }
}

export default cart
