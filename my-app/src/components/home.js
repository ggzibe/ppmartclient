import React, { Component } from 'react';
import Navigation from './navigation';
import UserList from '../props/user/userlist';
import ManageUser from '../props/user/manageuser';

export default class Home extends Component {
  onUpdated = () => {
    this.childUserList.handleRefresh();
  }

  render() {
    const homeInstance = (
      <div>
        <Navigation />
        <div>
          <section className="hero is-info">
            <div className="hero-body">
              <div className="container">
                <h1 className="title">
                  <span className="icon is-medium"><i className="fa fa-home"></i></span> Home
                </h1>
              </div>
            </div >
          </section>
          <UserList onRef={ref => (this.childUserList = ref)} deleteItem="false" editItem="false" />
          <ManageUser onUpdate={this.onUpdated} />
        </div>
      </div>

    );
    return (homeInstance);
  }
}
