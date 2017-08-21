import React, { Component } from 'react';

export default class ProductNavigation extends Component {
  constructor(props){
    super(props);
    this.state = {
      isActiveProduct: this.props.isActiveProduct,
      isActiveProductGroup: this.props.isActiveProductGroup,
      isActiveProductType: this.props.isActiveProductType
    }
  }

  render(){
    const productInstance = (
      <section className="hero is-info">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              <span className="icon is-medium"><i className="fa fa-barcode"></i></span> Product
            </h1>
          </div>
        </div >
        <div className="hero-foot">
          <nav className="tabs is-boxed is-fullwidth">
            <div className="container">
              <ul>
                <li className={this.state.isActiveProduct ? 'is-active' : ''}>
                  <a href={process.env.PUBLIC_URL + '/product'}>Overview</a>
                </li>
                <li className={this.state.isActiveProductGroup ? 'is-active' : ''}>
                  <a href={process.env.PUBLIC_URL + '/product/group'}>Product Group</a>
                </li>
                <li className={this.state.isActiveProductType ? 'is-active' : ''}>
                  <a href={process.env.PUBLIC_URL + '/product/type'}>Product Type</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </section>
    );
    return (productInstance);
  }
}
