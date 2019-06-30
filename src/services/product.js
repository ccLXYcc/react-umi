import { get, post, del } from '../utils/request'
import isLogin from '../services/isLogin'

//列表
export function getProduct (pamars) {
  return get('/api/v1/products', {
    pamars
  })
};

//详情
export function getProductDetail (id) {
  return get(`/api/v1/products/${id}`)
}

//获取用户购物车
export function getCart () {
  return get('/api/v1/shop_carts', {
    headers: { authorization: `Bearer ${isLogin}` }
  })
}
//加入购物车
export function getAddCart (params) {
  return post('/api/v1/shop_carts', params, {
    headers: { authorization: `Bearer ${isLogin}` }
  })
}

//删除购物车

export function getDel (id) {
  return del(`api/v1/shop_carts/${id}`, {
    headers: { authorization: `Bearer ${isLogin}` }
  })
}
