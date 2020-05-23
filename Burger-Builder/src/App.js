import React, { Component } from 'react';
import * as actions from "./store/actions/index";
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom'

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
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCheckStatus: () => dispatch(actions.checkStatus())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
