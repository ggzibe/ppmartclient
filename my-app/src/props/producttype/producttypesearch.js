import React, {Component} from 'react';

export default class ProductTypeSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtSearch: ""
    };
    this.handleInputChanged = this.handleInputChange.bind(this);
    this.handleCreated = this.handleCreate.bind(this);
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
    this.props.onSearch(value);
  }

  handleCreate(){
    this.props.onCreate();
  }

  render(){
    const instance = (
      <div className="box">
        <nav className="level">
          <div className="level-left">
            <div className="level-item">
              <div className="field has-addons">
                <p className="control has-icons-left has-icons-right">
                  <input className="input" type="text" placeholder="Find product type" name="txtSearch"
                    value={this.state.txtSearch} onChange={this.handleInputChanged} />
                  <span className="icon is-small is-left"><i className="fa fa-search"></i></span>
                </p>
              </div>
            </div>
          </div>
          <div className="level-right">
            <p className="level-item">
              <a className="button is-success" onClick={this.handleCreated}>
                <span className="icon is-small"><i className="fa fa-plus"></i></span>
                <span>New Create</span>
              </a>
            </p>
          </div>
        </nav>
      </div>
    );
    return (instance);
  }
}
