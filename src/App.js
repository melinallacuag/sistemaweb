import React, { useState } from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './Sidebar';
import SidebarV from './SidebarV';
import Header from './Header';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import CloseIcon from '@mui/icons-material/Close';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <Router>
      
        <div className="app">
       
          <div className={`main ${isOpen ? 'open' : ''}`} >
            
            <div className="toggle-button" onClick={toggleSidebar}>
              {isOpen ? <CloseIcon/> : <DensityMediumIcon/>}
            </div>
            
            <Sidebar isOpen={isOpen}/>

            <div className='cont_sliroutes'>

              <SidebarV/>

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>

            </div>

          </div>

        </div>

    </Router>
  );
}

export default App;
