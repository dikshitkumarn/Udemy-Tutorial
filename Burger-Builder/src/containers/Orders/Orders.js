import React, { Component } from 'react'

import axios from '../../axios-orders'
import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandling from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount(){
        axios.get('/orders.json')
        .then(res => {
            const fetchedOrders = []
            for( let key in res.data ){
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                })
            }
            this.setState({orders: fetchedOrders, loading: false})
            console.log(res.data)
        })
        .catch(error => {
            this.setState({loading: false})
        })
    }

    render(){
        let orders = <Spinner />
        if(this.state.orders){
            orders = this.state.orders.map(
                order => (
                    <Order key={order.id} 
                        price={order.price} 
                        ingredients={order.ingredients}
                    />
                )
            )
        }
        return (
            <div>
                {orders}
            </div>
        )
    }
}

export default withErrorHandling(Orders, axios)