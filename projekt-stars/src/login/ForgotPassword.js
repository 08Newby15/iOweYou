import React, { useState } from 'react';
import { nothingImportantTrustMe } from './nothingImportantTrustMe';

const ForgotPassword = () => {
  const [notTheUserInfos, setNotTheUserInfos] = useState(() => {
    const privateDontLook = localStorage.getItem('userInformation');
    return privateDontLook ? JSON.parse(privateDontLook) : [];
  });

  const [showUserInfos, setShowUserInfos] = useState(false);

  const handleForgotUserData = () => {
    setShowUserInfos(!showUserInfos);
  };

  const handleClosePopup = () => {
    setShowUserInfos(false);
  };

  return (
    <div>
      {showUserInfos && (
        <div className="popup">
          <div className="popup-inner">
            <button className="close btn btn-danger" onClick={handleClosePopup}>
              x
            </button>
            <div style={{marginTop:"12%"}}>

            <h2>Try one of these:</h2>
            <table>
              <tbody>
                {notTheUserInfos.map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}: </td>
                    <td>{user.password}</td>
                  </tr>
                ))}
              </tbody>
            </table>
              </div>
          </div>
        </div>
      )}
      <div>
        <p onClick={handleForgotUserData} id='forgotUserData' >Forgot User data?</p>
      </div>
    </div>
  );
};

export default ForgotPassword;
