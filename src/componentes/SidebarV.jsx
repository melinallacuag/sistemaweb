import React, {useEffect, useState } from 'react';

const SidebarV = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [authenticated, setauthenticated] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (loggedInUser) {
      setauthenticated(loggedInUser);
    }
  }, []);

  useEffect(() => {
    if (authenticated === null) {
      setSelectedMenu(null); // Restablecer el estado de selectedMenu a null al cerrar sesión
    }
  }, [authenticated]);

  const handleLogout = () => {
        
    localStorage.removeItem("authenticated");
    setauthenticated(null);
    window.location.href = '/'; 
 
  };
  if (!authenticated) {
       
    return null;
  } else {
  return (
    <div>
      <nav className="horizontal-navbar" >

        <div className="container_user">
          <p  className="text_username">Fecha:</p>
          <p  className="text_username">Turno:  - </p>
        </div>

        <div className="container_user">
          <p  className="text_username" onClick={handleLogout}>Cajero1</p>
          <img src="https://startbootstrap.github.io/startbootstrap-sb-admin-2/img/undraw_profile.svg" alt="img_perfil" className='img_username' />
        </div>
  
     {/*  <div className="profile" onClick={handleLogout}>Perfil</div> */}  
      </nav>
      
    </div>
  );
  }
};

export default SidebarV;