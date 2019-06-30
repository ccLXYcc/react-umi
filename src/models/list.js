import { getProduct } from '../services/product'
export default {
  namespace: 'lists',
  state: {
    list: []
  },
  reducers: {
    list (state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    *loadData ({ payload }, { cell, put }) {
      const result = yield getProduct()
      console.log(result)
      yield put({
        type: 'list',
        payload: {
          list: result.data.products
        }
      })
    }
  }
}
