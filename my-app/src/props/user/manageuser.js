import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'whatwg-fetch';
import Global from '../../global';

export default class ManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isAdmin: false
    };
    this.handleInputChanged = this.handleInputChange.bind(this);
    this.handleSubmitted = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.context.global = new Global();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    this.createUser();
    event.preventDefault();
  }

  createUser() {
    fetch('https://ppmartservices.herokuapp.com/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + (this.context.global.getCurrentUser() != null ? this.context.global.getCurrentUser().token : ''),
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
          is_admin: this.state.isAdmin,
          email: this.state.username + '@gmail.com'
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
        alert('result: ' + data.result + ' : ' + data.message);
        this.props.onUpdate();
    })
    .catch((ex) => {
        console.log('create user failed', ex);
    });
  }

  render() {
    return (
      <section className="section">
        <form className="container" onSubmit={this.handleSubmitted}>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">username</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <input className="input"
                    name="username"
                    type="text"
                    value={this.state.username}
                    onChange={this.handleInputChanged} />
                </div>
              </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">password</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <input className="input"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleInputChanged} />
                </div>
              </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Is admin</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <label className="checkbox">
                    <input
                      name="isAdmin"
                      type="checkbox"
                      checked={this.state.isAdmin}
                      onChange={this.handleInputChanged} />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label">
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <input className="button is-primary" type="submit" value="Submit" />
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    );
  }
}

ManageUser.contextTypes = {
  global: PropTypes.object
}
