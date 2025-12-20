import React from 'react'
import Signup from './pages/Signup';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import "./App.css";
import { ToastContainer, toast } from 'react-toastify';
import Dashboard from './pages/Dashboard';
function App() {
  return (
    <><ToastContainer />
  <Router>
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>
  </>
  )

}


export default App;
