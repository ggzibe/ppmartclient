import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Global from '../global';
import 'whatwg-fetch';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      global: new Global()
    }
  }

  logout() {
    fetch('https://ppmartservices.herokuapp.com/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + (this.state.global.getCurrentUser() != null ? this.state.global.getCurrentUser().token : ''),
        }
    }).then((response) => {
      if(response.status >= 200 && response.status < 300){
        return response.json();
      }
      else{
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    }).then((data) => {
        console.log(data);
    }).catch((ex) => {
        console.log('logout failed', ex);
    });
  }

  render() {
    const AuthNav = withRouter(({ history }) => (
      this.state.global.hasCurrentUser() ? (
          <div>
            <nav className="navbar">
              <div className="navbar-brand">
                <a className="navbar-item" href={process.env.PUBLIC_URL + '/'}>
                  React - Bulma
                </a>
              </div>
              <div id="navMenu" className="navbar-menu">
                <div className="navbar-start">
                  <a className="navbar-item" href={process.env.PUBLIC_URL + '/'}>Home</a>
                  <a className="navbar-item" href={process.env.PUBLIC_URL + '/product'}>Product</a>
                  <div className="navbar-item has-dropdown is-hoverable">
                    <a className="navbar-link">Console</a>
                    <div className="navbar-dropdown">
                      <a className="navbar-item" href={process.env.PUBLIC_URL + '/console'}>Overview</a>
                      <hr className="navbar-divider" />
                      <div className="navbar-item">
                        <div>version</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="navbar-end">
                  <div className="navbar-item">
                    <div className="field is-grouped">
                       <p className="control">
                         <a className="button is-primary" href="" target="_blank">
                           <span className="icon">
                             <i className="fa fa-external-link"></i>
                           </span>
                           <span>Store</span>
                         </a>
                       </p>
                    </div>
                  </div>
                  <div className="navbar-item has-dropdown is-hoverable">
                    <a className="navbar-link">
                      <span className="icon">
                        <i className="fa fa-user"></i>
                      </span>
                      <span>{this.state.global.getCurrentUser() != null ? this.state.global.getCurrentUser().user.username : 'Account'}</span>
                    </a>
                    <div className="navbar-dropdown">
                      <a className="navbar-item" onClick={() => {
                            this.logout();
                            this.state.global.unAuthenticated(() => history.push(process.env.PUBLIC_URL + '/login'));
                          }}>
                        <span className="icon is-small"><i className="fa fa-power-off"></i></span>&nbsp;<span>Logout</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        )
        : (<div></div>)
    ))

    const navInstance = (
        <div>
          <AuthNav />
        </div>
    );

    return (navInstance);
  }
}

export default Navigation;
