import React from 'react';
import {Routes, Route } from 'react-router-dom'
import './App.css';
import Register from './users/register.js'
import Login from './users/login.js'
import Navbar from './navigation/navbar.js';
import Comonent from './component/component.js'; 

function App() {
  return (
    <>
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Comonent/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </div>
    </>
  );
}

export default App;
