import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'whatwg-fetch';
import Global from '../../global';

export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
    this.handleDeleted = this.handleDelete.bind(this);
    this.handleEdited = this.handleEdite.bind(this);
  }

  componentDidMount() {
    this.props.onRef(this);
    this.context.global = new Global();
    this.getUserList();
  }

  handleRefresh() {
    this.getUserList();
  }

  handleDelete(event) {
    alert('Delete: ' + event.target.value);
  }

  handleEdite(event) {
    alert('Edit: ' + event.target.value);
  }

  bindDelete(item){
      var element;
      if (this.props.deleteItem === true || this.props.deleteItem === 'true'){
         element = (<button class="button" onClick={this.handleDeleted} value={item}>Delete</button>);
      }
      return element;
  }

  bindEdit(item){
      var element;
      if (this.props.editItem === true || this.props.editItem === 'true'){
         element = (<button class="button" onClick={this.handleEdited} value={item}>Edit</button>);
      }
      return element;
  }

  getUserList() {
    fetch('https://ppmartservices.herokuapp.com/users/all',{
      headers: {
        'Authorization': 'Token ' + (this.context.global.getCurrentUser() !== null ? this.context.global.getCurrentUser().token : ''),
      },
    })
    .then((response) => {
      return response.json();
    }).then((data) => {
      this.setState({
          users: data
      });
    }).catch((ex) => {
      console.log('parsing failed', ex);
    });
  }

  render() {
    const list = this.state.users.map((item) => {
      return (
        <div className="container" key={item.username}>
          <h1 className="title">{item.username}</h1>
          <h2 className="subtitle">{item.email}</h2>
          <div>{this.bindDelete(item.username)}</div>
          <div>{this.bindEdit(item.username)}</div>
        </div>
      );
    });
    return (
      <section className="section">
        {list}
      </section>
    );
  }
}

UserList.contextTypes = {
  global: PropTypes.object
}
