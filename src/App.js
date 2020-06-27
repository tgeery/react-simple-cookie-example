import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Cookies from 'js-cookie';

class HelloUser extends Component {
  render() {
    let username = this.props.uname;
    let btn = this.props.btn;
    if(btn === "Login")
      return (<div></div>);
    return (
        <h1>Hello {username}</h1>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      pass: "",
      btn_str: ""
    };
    let isLoggedIn = this.checkSession();
    this.btn_str = (isLoggedIn) ? "Logout" : "Login";
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  checkSession() {
    let res = false;
    let u = Cookies.get("simple_session");
    if(u !== undefined)
      res = true;
    this.user = u;
    return res;
  }

  handleUsername(event) {
    this.setState({ user: event.target.value });
  }

  handlePassword(event) {
    this.setState({ pass: event.target.value });
  }

  handleSubmit(event) {
    if(this.btn_str === 'Login') {
      let u = this.state.user;
      let p = this.state.pass;
      Cookies.set("simple_session", u);
    } else {
      Cookies.remove("simple_session");
    }
  }

  render() {
    return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <input placeholder="username" onChange={this.handleUsername} />
            <input placeholder="password" onChange={this.handlePassword} />
            <button type="submit">{this.btn_str}</button>
            <HelloUser uname={this.user} btn={this.btn_str} />
          </form>
        </div>
    );
  }
}

export default App;
