import React from 'react'
import { NavBar, Icon } from 'antd-mobile';
import Link from 'umi/link'
import styles from './css/list.css'
import { connect } from 'dva'
import { useEffect } from 'react'


function list (props) {
  //console.log(props)
  const { list } = props.lists
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    dispatch({
      type: "lists/loadData",
      payload: {}
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const { dispatch } = props
  const onLeftClick = () => {
    props.history.replace({
      pathname: '/'
    })
  }

  return (
    <div>
      <NavBar
        className={styles.navbar}
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={onLeftClick}
      ><span>商品列表</span></NavBar>
      <ul className={styles.content}>
        {list.map(item => <li key={item._id}>
          <Link to={{ pathname: 'detail', query: { id: item._id } }}>
            <img src={`https://api.cat-shop.penkuoer.com${item.coverImg}`} alt={item.name} />
            <p>{item.name}</p>
            <span>价格：{"￥"}{item.price}</span>
            <em>库存：{item.quantity}</em>
          </Link>
        </li>)}
      </ul>
    </div>
  )
}


/* class list extends Component {
  /* constructor(props) {
    super(props);
    this.state = {
      list: []
    }
  }
  async componentDidMount () {
    const result = await getProduct()
    this.setState({
      list: result.data.products
    })
    //console.log(result.data.products)
  }
  onLeftClick () {
    this.props.history.replace({
      pathname: '/'
    })
  }
  render () {
    const { list } = this.state
    return (
      <div>
        <NavBar
          className={styles.navbar}
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={this.onLeftClick.bind(this)}
        ><span>商品列表</span></NavBar>
        <ul className={styles.content}>
          {list.map(item => <li key={item._id}>
            <Link to={{ pathname: 'detail', query: { id: item._id } }}>
              <img src={`https://api.cat-shop.penkuoer.com${item.coverImg}`} alt={item.name} />
              <p>{item.name}</p>
              <span>价格：{"￥"}{item.price}</span>
              <em>库存：{item.quantity}</em>
            </Link>
          </li>)}
        </ul>
      </div>
    )
  }
}
 */
export default connect(state => state)(list)
