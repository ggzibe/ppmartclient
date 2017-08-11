import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import 'whatwg-fetch';
import Alert from '../props/alert';
import Global from '../global';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirectToReferrer: false
    };
    this.handleInputChanged = this.handleInputChange.bind(this);
    this.handleSubmitted = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.context.global = new Global();
    this.context.global.unAuthenticated();
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
       [name]: value
    });
  }

  handleSubmit(event) {
    this.login();
    event.preventDefault();
  }

  setAlert(_type, _header, _message){
    this.childAlert.onAlert(_type, _header, _message);
  }

  login() {
    this.context.global.startLoader(document.getElementById("loader"));
    fetch('https://ppmartservices.herokuapp.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
    }).then((response) => {
      if(response.status >= 200 && response.status < 300){
        return response.json();
      }
      else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    }).then((data) => {
        if(data.result){
            this.context.global.setCurrentUser(data.data);
            this.context.global.authenticated(() => {
              this.setState({
                redirectToReferrer: true
              });
            });
        }else{
          this.setAlert("danger", "Login failed", data.message);
          this.context.global.endLoader(document.getElementById("loader"));
        }
    }).catch((ex) => {
        this.setAlert("danger", "Login failed", "Data to login is wrong.");
        this.context.global.endLoader(document.getElementById("loader"));
    });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: process.env.PUBLIC_URL + '/' } };
    if (this.state.redirectToReferrer) {
      return (<Redirect to={from}/>);
    }

    const loginInstance = (
      <section className="section">
        <Alert onRef={ref => (this.childAlert = ref)} />
        <div className="container">
          <div className="columns is-mobile">
            <div className="column is-half is-offset-one-quarter">
              <div className="box">
                <h1 className="title">Login</h1>
                  <div className="field">
                    <p className="control has-icons-left has-icons-right">
                      <input className="input" type="text" name="username" placeholder="Username"
                        value={this.state.username} onChange={this.handleInputChanged} />
                      <span className="icon is-small is-left">
                        <i className="fa fa-user"></i>
                      </span>
                    </p>
                  </div>
                  <div className="field">
                    <p className="control has-icons-left">
                      <input className="input" type="password" name="password" placeholder="Password"
                        value={this.state.password} onChange={this.handleInputChanged} />
                      <span className="icon is-small is-left">
                        <i className="fa fa-lock"></i>
                      </span>
                    </p>
                  </div>
                  <div className="field">
                    <p className="control">
                      <button className="button is-success" onClick={this.handleSubmitted}>
                        <i className="fa fa-spinner fa-pulse fa-3x fa-fw" id="loader" style={{ display: "none" }}></i>&nbsp;Login&nbsp;
                      </button>
                    </p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
    return (loginInstance);
  }
}

Login.contextTypes = {
  global: PropTypes.object
}
