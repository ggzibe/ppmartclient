import React, { Component } from 'react';

export default class Alert extends Component {
    constructor(props){
      super(props);
      this.state = {
        type: '', // primary, info, success, warning, danger
        header: '',
        message: '',
        isShow: false
      }
      this.onDeleted = this.onDelete.bind(this);
    }

    componentDidMount() {
      this.props.onRef(this);
    }

    onAlert(_type, _header, _message){
      this.setState({
        type: _type,
        header: _header,
        message: _message,
        isShow: true
      });
    }

    onDelete(event){
      this.setState({
        type: '',
        header: '',
        message: '',
        isShow: false
      });
    }

    render() {
      const classType = "message is-" + this.state.type;
      const alertInstance = this.state.isShow ? (
          <article className={classType}>
            <div className="message-header">
              <p>{this.state.header}</p>
              <button className="delete" onClick={this.onDeleted}></button>
            </div>
            <div className="message-body">
              {this.state.message}
            </div>
          </article>
      ) : <div></div> ;
      return (alertInstance);
    }
}
