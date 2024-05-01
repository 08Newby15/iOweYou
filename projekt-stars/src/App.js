import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './login/login';
import { Routes, Route } from "react-router-dom"; 
import Board from './dashboard/Board';

function App() {
  return (
    <div className="App">  
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/dashboard/Board" element={<Board />} /> 
      </Routes>
    </div>
  );
}

export default App;
