import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navigation from './navigation';
import ProductNavigation from './product.navigation';
import ProductTypeSearch from '../props/producttype/producttypesearch';
import ProductTypeList from '../props/producttype/producttypelist';
import ProductTypeForm from '../props/producttype/producttypeform';
import Confirm from '../props/confirm';

export default class ProductType extends Component {
  onOpenForm = (model = null) => {
    this.childProductTypeForm.onOpen(model);
  }

  onListUpdated = () => {
    this.childProductTypeList.onRefresh();
  }

  onListDeleted = (model) => {
    this.context.selected = model;
    this.childConfirm.onDisplay("Are you sure to delete?", "You're deleting product type : " + this.context.selected.name);
  }

  onSearchList = (str = "") => {
    this.childProductTypeList.onFilter(str);
  }

  onConfirmed = () => {
    this.childProductTypeList.onConfirmDelete(this.context.selected);
  }

  render(){
    const producttypeInstance = (
      <div>
        <Navigation />
        <div>
          <ProductNavigation isActiveProductType="true" />
          <section className="section">
            <div className="container">
              <ProductTypeSearch onRef={ref => (this.childProductSearch = ref)} onCreate={this.onOpenForm} onSearch={this.onSearchList} />
              <ProductTypeList onRef={ref => (this.childProductTypeList = ref)} onEdit={this.onOpenForm} onDelete={this.onListDeleted} />
            </div>
          </section>
        </div>
        <ProductTypeForm onRef={ref => (this.childProductTypeForm = ref)} onUpdate={this.onListUpdated} />
        <Confirm onRef={ref => (this.childConfirm = ref)} onConfirm={this.onConfirmed} />
      </div>
    );
    return (producttypeInstance);
  }
}

ProductType.contextTypes = {
  selected: PropTypes.array
}
