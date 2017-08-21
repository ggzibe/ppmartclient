import React, {Component} from 'react';
import PropTypes from 'prop-types';
import 'whatwg-fetch';
import Global from '../../global';

export default class ProductGroupList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productGroups: []
    };
    this.handleEdited = this.handleEdit.bind(this);
    this.handleDeleted = this.handleDelete.bind(this);
  }

    componentDidMount() {
      this.props.onRef(this);
      this.context.global = new Global();
      this.getProductGroupList();
    }

    handleEdit(model){
      this.props.onEdit(model);
    }

    handleDelete(model){
      this.props.onDelete(model);
    }

    onRefresh(){
      this.getProductGroupList();
    }

    onFilter(str){
      this.context.filterField = str;
      this.injectToState();
    }

    onConfirmDelete(model){
      fetch('https://ppmartservices.herokuapp.com/product/groups/detail/' + model.id , {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + (this.context.global.getCurrentUser() != null ? this.context.global.getCurrentUser().token : ''),
          }
      })
      .then((response) => {
        if(response.status >= 200 && response.status < 300){
          return response.json();
        }
        else{
          var error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
      })
      .then((data) => {
        this.onRefresh();
      })
      .catch((ex) => {
        console.log('delete failed', ex);
      });
    }

    getProductGroupList() {
      fetch('https://ppmartservices.herokuapp.com/product/groups/list',{
        headers: {
          'Authorization': 'Token ' + (this.context.global.getCurrentUser() !== null ? this.context.global.getCurrentUser().token : ''),
        },
      })
      .then((response) => {
        if(response.status >= 200 && response.status < 300){
          return response.json();
        }
        else{
          var error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
      })
      .then((data) => {
          this.context.dataList = data;
          this.injectToState();
      })
      .catch((ex) => {
        console.log('parsing failed', ex);
      });
    }

    injectToState(){
      if(this.context.filterField !== undefined && this.context.filterField !== null && this.context.filterField !== "")
      {
        this.setState({
            productGroups: this.context.dataList.filter((item) =>
              item.name.toLowerCase().indexOf(this.context.filterField.toLowerCase()) > -1 ||
              (item.description !== null && item.description.toLowerCase().indexOf(this.context.filterField.toLowerCase()) > -1)
            )
        });
      }
      else{
        this.setState({
            productGroups: this.context.dataList
        });
      }
    }

    render(){
      const list = this.state.productGroups.map((item) => {
        return (
          <article className="media" key={item.name}>
            <div className="media-content">
              <div className="content">
                <p><strong>{item.name}</strong></p>
                <p><small>{item.description}</small></p>
              </div>
              <nav className="level is-mobile">
                <div className="level-left"></div>
                <div className="level-right">
                  <a className="level-item" onClick={() => {this.handleEdited(item)}}>
                    <span className="icon"><i className="fa fa-edit"></i></span>
                  </a>
                  <a className="level-item" onClick={() => {this.handleDeleted(item)}}>
                    <span className="icon"><i className="fa fa-trash-o"></i></span>
                  </a>
                </div>
              </nav>
            </div>
          </article>
        );
      });
      const instance = this.state.productGroups.length > 0 ? (
        <div className="box">
          {list}
        </div>
      ) : (<div>No record.</div>);
      return (instance);
    }
}

ProductGroupList.contextTypes = {
  dataList: PropTypes.array,
  filterField: PropTypes.string,
  global: PropTypes.object
}
