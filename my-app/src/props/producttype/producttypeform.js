import React, {Component} from 'react';
import Global from '../../global';

class ProductTypeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      mode: "add",
      productType : {
        id: "",
        name: "",
        description: ""
      },
      global: new Global()
    };
    this.handleClosed = this.handleClose.bind(this);
    this.handleInputChanged = this.handleInputChange.bind(this);
    this.handleSubmitted = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.onRef(this);
    if(document.getElementById('loader') != null && document.getElementById('loader').style != null){
      document.getElementById('loader').style.display = 'none';
    }
  }

  onOpen(model){
    if(model !== null){
      this.setState({
        isOpen: true,
        mode: "edit",
        productType: model
      });
    }
    else{
      this.setState({
        isOpen: true,
        mode: "add",
        productType: {
          id: "",
          name: "",
          description: ""
        }
      });
    }
  }

  handleClose(){
    this.setState({
      isOpen: false
    });
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      productType : {
        [name]: value
      }
    });
  }

  handleSubmit(event) {
    this.saveProductType();
    event.preventDefault();
  }

  saveProductType() {
    if(document.getElementById('loader') != null && document.getElementById('loader').style != null){
      document.getElementById('loader').style.display = 'block';
    }
    var url = "https://ppmartservices.herokuapp.com/product/types/list";
    var callMethod = "POST";
    if(this.state.mode === "edit"){
      url = "https://ppmartservices.herokuapp.com/product/types/detail/" + this.state.productType.id;
      callMethod = "PUT";
    }
    fetch(url, {
        method: callMethod,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + (this.state.global.getCurrentUser() != null ? this.state.global.getCurrentUser().token : ''),
        },
        body: JSON.stringify({
          name: this.state.productType.name,
          description: this.state.productType.description
        })
    }).then((response) => {
      if(response.status >= 200 && response.status < 300){
        return response.json();
      }
      else{
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    }).then((data) => {
        if(document.getElementById('loader') != null && document.getElementById('loader').style != null){
          document.getElementById('loader').style.display = 'none';
        }
        setTimeout(() => {
          this.handleClose();
        }, 5000);
        this.props.onUpdate();
    }).catch((ex) => {
      if(document.getElementById('loader') != null && document.getElementById('loader').style != null){
        document.getElementById('loader').style.display = 'none';
      }
    });
  }

  render(){
    var classStyle = "modal";
    if(this.state.isOpen){
      classStyle = "modal is-active";
    }

    const modal = (
      <div className={classStyle}>
        <div className="modal-background" onClick={this.handleClosed}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Product Type</p>
          </header>
          <section className="modal-card-body">
            <div className="field">
              <label className="label">Type Name</label>
              <div className="control">
                <input className="input" type="text" name="name"
                  value={this.state.productType.name} onChange={this.handleInputChanged} />
              </div>
            </div>
            <div className="field">
              <label className="label">Type Description</label>
              <div className="control">
                <input className="input" type="text" name="description"
                  value={this.state.productType.description !== null ? this.state.productType.description : ""} onChange={this.handleInputChanged} />
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <a className="button is-primary" onClick={this.handleSubmitted}>
              <i className="fa fa-spinner fa-pulse fa-3x fa-fw" id="loader"></i>&nbsp;Save changes&nbsp;
            </a>
            <a className="button" onClick={this.handleClosed}>Cancel</a>
          </footer>
        </div>
      </div>
    );
    return (modal);
  }
}

export default ProductTypeForm;
