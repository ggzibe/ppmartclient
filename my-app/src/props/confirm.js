import React, {Component} from 'react';

export default class Confirm extends Component {
  constructor(props){
    super(props);
    this.state = {
      isShow: false,
      title: '',
      detail: ''
    }
    this.handleClosed = this.handleClose.bind(this);
    this.handleConfirmed = this.handleConfirm.bind(this);
  }

  componentDidMount(){
    this.props.onRef(this);
  }

  handleConfirm(){
    this.handleClose();
    this.props.onConfirm();
  }

  handleClose(){
    this.setState({
      isShow: false,
      title: '',
      detail: ''
    });
  }

  onDisplay(_title, _detail){
    this.setState({
      isShow: true,
      title: _title,
      detail: _detail
    });
  }

  render(){
    const instance = this.state.isShow ? (
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="card">
          <header className="card-head">
            <p className="card-header-title">{this.state.title}</p>
          </header>
          <section className="card-content">
            <div className="content">{this.state.detail}</div>
          </section>
          <footer className="card-footer">
            <a className="card-footer-item" onClick={this.handleConfirmed}>Yes</a>
            <a className="card-footer-item" onClick={this.handleClosed}>No</a>
          </footer>
        </div>
      </div>
    ) : <div></div>;
    return (instance);
  }

}
