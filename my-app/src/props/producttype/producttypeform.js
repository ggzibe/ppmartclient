import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Global from '../../global';

export default class ProductTypeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      description: ""
    };
    this.handleClosed = this.handleClose.bind(this);
    this.handleInputChanged = this.handleInputChange.bind(this);
    this.handleSubmitted = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.onRef(this);
    this.context.global = new Global();
    this.context.isOpen = false;
  }

  onOpen(model){
    if(model !== null){
      this.context.mode = "edit";
      this.context.isOpen = true;
      this.setState({
        id: model.id,
        name: model.name,
        description: model.description
      });
    }
    else{
      this.context.mode = "add";
      this.context.isOpen = true;
      this.setState({
        id: "",
        name: "",
        description: ""
      });
    }
  }

  handleClose(){
    this.context.isOpen = false;
    this.setState({
      id: "",
      name: "",
      description: ""
    });
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    this.saveProductType();
    event.preventDefault();
  }

  saveProductType() {
    this.context.global.startLoader(document.getElementById("loader"));
    var url = "https://ppmartservices.herokuapp.com/product/types/list";
    var callMethod = "POST";
    if(this.context.mode === "edit"){
      url = "https://ppmartservices.herokuapp.com/product/types/detail/" + this.state.id;
      callMethod = "PUT";
    }
    fetch(url, {
        method: callMethod,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + (this.context.global.getCurrentUser() != null ? this.context.global.getCurrentUser().token : ''),
        },
        body: JSON.stringify({
          name: this.state.name,
          description: this.state.description
        })
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
        this.context.global.endLoader(document.getElementById("loader"));
        setTimeout(() => {
          this.props.onUpdate();
          this.handleClose();
        }, 1000);
    })
    .catch((ex) => {
        this.context.global.endLoader(document.getElementById("loader"));
    });
  }

  render(){
    const modal = this.context.isOpen ? (
      <div className="modal is-active">
        <div className="modal-background" onClick={this.handleClosed}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Product Type</p>
          </header>
          <section className="modal-card-body">
            <div className="field">
              <label className="label">Type Name</label>
              <div className="control">
                <input className="input" type="text" name="name" value={this.state.name} onChange={this.handleInputChanged} />
              </div>
            </div>
            <div className="field">
              <label className="label">Type Description</label>
              <div className="control">
                <input className="input" type="text" name="description" value={this.state.description || ""} onChange={this.handleInputChanged} />
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <a className="button is-primary" onClick={this.handleSubmitted}>
              <i className="fa fa-spinner fa-pulse fa-3x fa-fw" id="loader" style={{ display: "none" }}></i>&nbsp;Save changes&nbsp;
            </a>
            <a className="button" onClick={this.handleClosed}>Cancel</a>
          </footer>
        </div>
      </div>
    ) : <div></div>;
    return (modal);
  }
}

ProductTypeForm.contextTypes = {
  isOpen: PropTypes.bool,
  mode: PropTypes.string,
  global: PropTypes.object
};
