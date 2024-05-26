import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './login/login';
import { Routes, Route } from "react-router-dom";
import Board from './dashboard/Board';
import { useState } from 'react';
import PersonInformation from './personInfo/PersonInformation';
import CookieBanner from './CookieBanner';
import posthog from 'posthog-js';

function App() {
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login setLoggedInUserId={setLoggedInUserId} />} />
        <Route path="/dashboard/:id" element={<Board loggedInUserId={loggedInUserId} />} />
        <Route path="/personInformation/:id" element={<PersonInformation loggedInUserId={loggedInUserId} />} />
      </Routes>
      {posthog.has_opted_in_capturing() || posthog.has_opted_out_capturing() ? null : <CookieBanner className="cookieBanner"/>}
    </div>
  );
}

export default App;
