import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navigation from './navigation';
import ProductNavigation from './product.navigation';
import ProductGroupList from '../props/productgroup/productgrouplist';
import Confirm from '../props/confirm';

export default class ProductGroup extends Component {
  onOpenForm = (model = null) => {
    //this.childProductTypeForm.onOpen(model);
  }

  // onListUpdated = () => {
  //   this.childProductGroupList.onRefresh();
  // }

  onListDeleted = (model) => {
    this.context.selected = model;
    this.childConfirm.onDisplay("Are you sure to delete?", "You're deleting product group : " + this.context.selected.name);
  }

  // onSearchList = (str = "") => {
  //   this.childProductGroupList.onFilter(str);
  // }

  onConfirmed = () => {
    this.childProductGroupList.onConfirmDelete(this.context.selected);
  }

  render(){
    const productgroupInstance = (
      <div>
        <Navigation />
        <div>
          <ProductNavigation isActiveProductGroup="true" />
          <section className="section">
            <div className="container">
            <ProductGroupList onRef={ref => (this.childProductGroupList = ref)} onEdit={this.onOpenForm} onDelete={this.onListDeleted} />
            </div>
          </section>
        </div>
        <Confirm onRef={ref => (this.childConfirm = ref)} onConfirm={this.onConfirmed} />
      </div>
    );

    return (productgroupInstance);
  }
}

ProductGroup.contextTypes = {
  selected: PropTypes.array
}
