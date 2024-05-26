import React from 'react';
import './login.css';
import { nothingImportantTrustMe } from './nothingImportantTrustMe';
import { useNavigate } from "react-router-dom";
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from './ForgotPassword';

export default function Login({ setLoggedInUserId }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const navigate = useNavigate();

  const succesToast = () => toast.success("Login erfolgreich!", { autoClose: 1500, theme: 'colored', transition: Slide });
  const failToast = () => toast.error("Fehler bei der Eingabe!", { autoClose: 3000, theme: 'colored', transition: Slide });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = nothingImportantTrustMe.find(user => user.name === username && user.password === password);
    if (user) {
      setLoggedInUserId(user.id);
      succesToast();
      setTimeout(() => {
        navigate(`/dashboard/${user.id}`)
      }, 2000);
    } else {
      failToast();
    }
  }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100' id='backgroundLogin'>
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">User Name</label>
            <input type="text" className="form-control" id="username" name="username" onChange={handleInputChange} aria-describedby="userNameHelp"></input>
            <div id="emailHelp" className="form-text">Please enter your name</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" value={password} onChange={handleInputChange} className="form-control" name="password" id="password"></input>
          </div>
          <ForgotPassword />
          <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
      </div>
      <ToastContainer style={{ width: '30%' }} />
    </div>
  )
}
