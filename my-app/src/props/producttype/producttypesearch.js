import React, {Component} from 'react';

class ProductTypeSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtSearch: ""
    };
    this.handleInputChanged = this.handleInputChange.bind(this);
    this.handleCreated = this.handleCreate.bind(this);
    this.handleSearched = this.handleSearch.bind(this);
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  }

  handleCreate(){
    this.props.onCreate();
  }

  handleSearch(){
    this.props.onSearch(this.state.txtSearch);
  }

  render(){
    const instance = (
      <div className="box">
        <nav className="level">
          <div className="level-left">
            <div className="level-item">
              <div className="field has-addons">
                <p className="control">
                  <input className="input" type="text" placeholder="Find a type" name="txtSearch"
                    value={this.state.txtSearch} onChange={this.handleInputChanged} />
                </p>
                <p className="control">
                  <button className="button" onClick={this.handleSearched}>
                    <span className="icon is-small"><i className="fa fa-search"></i></span>
                  </button>
                </p>
              </div>
            </div>
          </div>
          <div className="level-right">
            <p className="level-item">
              <a className="button is-success" onClick={this.handleCreated}>
                <span className="icon is-small"><i className="fa fa-plus"></i></span>
                <span>New</span>
              </a>
            </p>
          </div>
        </nav>
      </div>
    );
    return (instance);
  }
}

export default ProductTypeSearch;
