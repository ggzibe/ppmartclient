import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Login from './components/login';
import Console from './components/console';
import Home from './components/home';
import Product from './components/product';
import ProductGroup from './components/productgroup';
import ProductType from './components/producttype';
import Global from './global';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      global: new Global()
    }
  }

  render() {
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={props => (
        this.state.global.hasCurrentUser()
          ? (<Component {...props}/>)
          : (<Redirect to={{ pathname: process.env.PUBLIC_URL + '/login', state: { from: props.location }}}/>)
      )}/>
    );

    const navbarInstance = (
      <Router>
        <div>
          <Route path={process.env.PUBLIC_URL + '/login'}  component={Login}/>
          <PrivateRoute exact path={process.env.PUBLIC_URL + '/'} component={Home} />
          <PrivateRoute exact path={process.env.PUBLIC_URL + '/product'} component={Product} />
          <PrivateRoute exact path={process.env.PUBLIC_URL + '/product/group'} component={ProductGroup} />
          <PrivateRoute exact path={process.env.PUBLIC_URL + '/product/type'} component={ProductType} />
          <PrivateRoute path={process.env.PUBLIC_URL + '/console'} component={Console} />
        </div>
      </Router>
    );
    return (navbarInstance);
  }
}

export default App;
