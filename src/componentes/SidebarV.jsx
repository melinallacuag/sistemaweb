import React, {useEffect, useState } from 'react';

const SidebarV = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [authenticated, setauthenticated] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (loggedInUser) {
      setauthenticated(JSON.parse(loggedInUser));
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      setUserName(authenticated.names);
    }
  }, [authenticated]);

  useEffect(() => {
    if (authenticated === null) {
      setSelectedMenu(null);
    }else {
      localStorage.setItem("authenticated", JSON.stringify(authenticated));
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
          <p  className="text_username"onClick={handleLogout}>Turno:  - </p>
        </div>

        <div className="container_user">
          <p  className="text_username" >{userName}</p>
          <img src="https://startbootstrap.github.io/startbootstrap-sb-admin-2/img/undraw_profile.svg" alt="img_perfil" className='img_username' />
        </div>
  
     {/*  <div className="profile" onClick={handleLogout}>Perfil</div> */}  
      </nav>
      
    </div>
  );
  }
};

export default SidebarV;