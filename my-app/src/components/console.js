import React, { Component } from 'react';
import Navigation from './navigation';

export default class Console extends Component {
  render() {
    const consoleInstance = (
      <div>
        <Navigation />
        <div>
          <section className="hero is-info">
            <div className="hero-body">
              <div className="container">
                <h1 className="title">
                  <span className="icon is-medium"><i className="fa fa-tasks"></i></span> Console
                </h1>
              </div>
            </div >
          </section>
          Console
        </div>
      </div>
    );
    return (consoleInstance);
  }
}
