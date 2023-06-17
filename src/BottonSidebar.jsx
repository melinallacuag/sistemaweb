import React, { useState } from 'react';
function BottonSidebar() {
    
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  return (
   
        <div className={` ${isOpen ? 'open' : ''}`} >

            <div className="toggle-button" onClick={toggleSidebar}>
                {isOpen ? '✕' : '☰'}
            </div>
            
        </div>
     
  );
}

export default BottonSidebar;
