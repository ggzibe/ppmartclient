import React, { Component } from 'react';
import Navigation from './navigation';
import ProductNavigation from './product.navigation';

class ProductType extends Component {
  render(){
    const producttypeInstance = (
      <div>
        <Navigation />
        <div>
          <ProductNavigation isActiveProductType="true" />
          <section className="section">
            Product Type
          </section>
        </div>
      </div>
    );
    return (producttypeInstance);
  }
}

export default ProductType;
