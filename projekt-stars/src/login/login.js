import React, { Component } from 'react';
import './login.css';
import { nothingImportantTrustMe } from './nothingImportantTrustMe';
import { BrowserRouter, Route, Link, Navigate, Routes } from "react-router-dom";



export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;


    const user = nothingImportantTrustMe.find(user => user.name === username && user.password === password);
    if (user) {
      alert('Erfolgreich eingeloggt!');
      
      // window.open('https://orf.at/', '_blank'); // Opens ORF in a new tab
      window.open('/test', '_blank'); // Opens ORF in a new tab


    } else {
      alert('Fehler beim Login!');
      console.log(user);
    }
    console.log(this.state);
  }
  render() {
    return (
      <div className='d-flex justify-content-center align-items-center vh-100' id='backgroundLogin'>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">User Name</label>
            <input type="text" className="form-control" id="username" name="username" onChange={this.handleInputChange} aria-describedby="userNameHelp"></input>
            <div id="emailHelp" className="form-text">Please enter your name</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" value={this.state.password} onChange={this.handleInputChange} className="form-control" name="password" id="password"></input>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form></div>

    )
  }
}
