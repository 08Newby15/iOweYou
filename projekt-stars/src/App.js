import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './login/login';
import { Routes, Route } from "react-router-dom"; // Import only necessary components
import Board from './dashboard/Board';

function App() {
  return (
    <div className="App">  {/* Wrap your application content here (optional) */}
      <Routes>
        <Route path="/" element={<Login />} /> {/* Login route for root path */}
        <Route path="/dashboard/Board" element={<Board />} /> {/* Route for /test path */}
      </Routes>
    </div>
  );
}

export default App;
