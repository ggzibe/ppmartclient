import React, { Component } from 'react';
import Navigation from './navigation';
import ProductNavigation from './product.navigation';

class Product extends Component {
  render(){
    const productInstance = (
      <div>
        <Navigation />
        <div>
          <ProductNavigation isActiveProduct="true" />
          <section className="section">
            Product
          </section>
        </div>
      </div>
    );
    return (productInstance);
  }
}

export default Product;
