import './App.css';

import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Dashboard from './Pages/dashboard';
import Homepage from './Pages/homepage';

function App() {
  return (
    <Router>
      <div className='mainContainer'>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
