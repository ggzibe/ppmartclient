import React, { Component } from 'react';
import Navigation from './navigation';
import ProductNavigation from './product.navigation';

class ProductGroup extends Component{
  render(){
    const productgroupInstance = (
      <div>
        <Navigation />
        <div>
          <ProductNavigation isActiveProductGroup="true" />
          <section className="section">
            Product Group
          </section>
        </div>
      </div>
    );

    return (productgroupInstance);
  }
}

export default ProductGroup;
