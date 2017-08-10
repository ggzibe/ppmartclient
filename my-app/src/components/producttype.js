import React, { Component } from 'react';
import Navigation from './navigation';
import ProductNavigation from './product.navigation';
import ProductTypeSearch from '../props/producttype/producttypesearch';
import ProductTypeList from '../props/producttype/producttypelist';
import ProductTypeForm from '../props/producttype/producttypeform';

class ProductType extends Component {
  onOpenForm = (model = null) => {
    this.childProductTypeForm.onOpen(model);
  }

  onListUpdated = () => {
    this.childProductTypeList.onRefresh();
  }

  onSearchList = (str = null) => {
    this.childProductTypeList.onFilter(str);
  }

  render(){
    const producttypeInstance = (
      <div>
        <Navigation />
        <div>
          <ProductNavigation isActiveProductType="true" />
          <section className="section">
            <div className="container">
              <ProductTypeSearch onCreate={this.onOpenForm} onSearch={this.onSearchList} />
              <ProductTypeList onRef={ref => (this.childProductTypeList = ref)} onEdit={this.onOpenForm} />
            </div>
          </section>
        </div>
        <ProductTypeForm onRef={ref => (this.childProductTypeForm = ref)} onUpdate={this.onListUpdated} />
      </div>
    );
    return (producttypeInstance);
  }
}

export default ProductType;
