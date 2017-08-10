import React, {Component} from 'react';
import 'whatwg-fetch';
import Global from '../../global';

class ProductTypeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productTypes: [],
      global: new Global()
    };
    this.handleEdited = this.handleEdit.bind(this);
  }

  componentDidMount() {
    this.props.onRef(this);
    this.getProductTypeList();
  }

  handleEdit(model){
    this.props.onEdit(model);
  }

  onRefresh(){
    this.getProductTypeList();
  }

  onFilter(str){
    
  }

  getProductTypeList() {
    fetch('https://ppmartservices.herokuapp.com/product/types/list',{
      headers: {
        'Authorization': 'Token ' + (this.state.global.getCurrentUser() !== null ? this.state.global.getCurrentUser().token : ''),
      },
    })
    .then((response) => {
      return response.json();
    }).then((data) => {
      this.setState({
          productTypes: data
      });
    }).catch((ex) => {
      console.log('parsing failed', ex);
    });
  }

  render(){
    const list = this.state.productTypes.map((item) => {
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
                <a className="level-item">
                  <span className="icon"><i className="fa fa-trash-o"></i></span>
                </a>
              </div>
            </nav>
          </div>
        </article>
      );
    });
    return (
      <div className="box">{list}</div>
    );
  }
}

export default ProductTypeList;
