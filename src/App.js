import React, { useState } from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import './App.css';

import Login from './componentes/login';
import Home from './paginas/Home';
import About from './paginas/About';
import Contact from './paginas/Contact';


function App() {
  
  
  return (
    <Router>
      
        <Routes>
            <Route path="/" element={ <Login /> } />
            <Route path="/home" element={<Home />} />
        </Routes>

    </Router>
  );
}

export default App;
