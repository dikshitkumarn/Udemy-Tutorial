import React, { Component } from 'react';
import * as actions from "./store/actions/index";
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout'
import Orders from "./containers/Orders/Orders";
import Auth from './containers/Auth/Auth'
import Logout from "./containers/Logout/Logout";

class App extends Component {

  componentDidMount() {
    this.props.onCheckStatus()
  }

  render () {
    console.log(this.props)
    let routes =(
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact render={() => <BurgerBuilder />} />
        <Redirect to="/" />
      </Switch>
    )
    if(this.props.isAuth){
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact render={() => <BurgerBuilder />} />
          <Redirect to="/" />
        </Switch>
      )
    }
    return (
      <div>
        <Layout>
          <Switch>
            {routes}
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token != null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCheckStatus: () => dispatch(actions.checkStatus())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
