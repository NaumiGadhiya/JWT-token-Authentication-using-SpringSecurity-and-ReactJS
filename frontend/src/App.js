
import './App.css';
import HeaderCompo from './components/HeaderCompo';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ManageEmp from './components/ManageEmp';
import CreateEmp from './components/CreateEmp';
import { useState } from 'react';
import LoginPage from './components/LoginPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  return (
    <div className="App">
      <Router>
        <HeaderCompo />
        <Routes>
          <Route path="/" element={authenticated ? <ManageEmp /> : <Navigate to="/login" />}></Route>
          <Route path="/login" element={<LoginPage setAuthenticated={setAuthenticated} />}></Route>
          <Route path="/add" element={<CreateEmp />} ></Route>
          <Route path="/edit/:id" element={authenticated ? <CreateEmp /> : <Navigate to="/login" />} ></Route>
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}


export default App;
