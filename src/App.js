import React from 'react';
import './App.css'
import Home from './Components/Home';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
const App = () => {


  return (
    <>
        <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<SignUp />} />
      </Routes>
    </Router>
    </>
  );
};

export default App;
