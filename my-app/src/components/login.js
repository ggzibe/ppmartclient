import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import 'whatwg-fetch';
import Alert from '../props/alert';
import Global from '../global';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirectToReferrer: false,
      global: new Global()
    };
    this.state.global.unAuthenticated();
    this.handleInputChanged = this.handleInputChange.bind(this);
    this.handleSubmitted = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if(document.getElementById('loader') != null && document.getElementById('loader').style != null){
      document.getElementById('loader').style.display = 'none';
    }
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
    if(document.getElementById('loader') != null && document.getElementById('loader').style != null){
      document.getElementById('loader').style.display = 'block';
    }
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
        if(document.getElementById('loader') != null && document.getElementById('loader').style != null){
          document.getElementById('loader').style.display = 'none';
        }
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    }).then((data) => {
        if(data.result){
            this.state.global.setCurrentUser(data.data);
            this.state.global.authenticated(() => {
              this.setState({
                redirectToReferrer: true
              });
            });
        }else{
          this.setAlert("danger", "Login failed", data.message);
          if(document.getElementById('loader') != null && document.getElementById('loader').style != null){
            document.getElementById('loader').style.display = 'none';
          }
        }
    }).catch((ex) => {
        console.log('login failed', ex);
        if(document.getElementById('loader') != null && document.getElementById('loader').style != null){
          document.getElementById('loader').style.display = 'none';
        }
    });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: process.env.PUBLIC_URL + '/' } };
    if (this.state.redirectToReferrer) {
      return (<Redirect to={from}/>);
    }

    const loginInstance = (
      <section className="section">
        <div className="container">
          <div className="column">
            <Alert onRef={ref => (this.childAlert = ref)} />
          </div>
          <div className="columns is-mobile">
            <div className="column is-half is-offset-one-quarter">
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
                      <i className="fa fa-spinner fa-pulse fa-3x fa-fw" id="loader"></i>&nbsp;Login&nbsp;
                    </button>
                  </p>
                </div>
            </div>
          </div>
        </div>
      </section>
    );
    return (loginInstance);
  }
}

export default Login;
