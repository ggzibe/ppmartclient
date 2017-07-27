import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Global from '../global';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      global: new Global()
    }
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
                  <div className="navbar-item has-dropdown is-hoverable">
                    <a className="navbar-link">{this.state.global.getCurrentUser() != null ? this.state.global.getCurrentUser().user.username : 'Account'}</a>
                    <div className="navbar-dropdown">
                      <a className="navbar-item" onClick={() => { this.state.global.unAuthenticated(() => history.push(process.env.PUBLIC_URL + '/login'))}}>
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
