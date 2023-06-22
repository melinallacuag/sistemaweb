import React, {useEffect, useState } from 'react';

const SidebarV = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [authenticated, setauthenticated] = useState(null);
  const [userName, setUserName] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  if (!authenticated) {
       
    return null;

  } else {

    return (
      <div>
        <nav className="horizontal-navbar" >

          <div className="cont_datoFechaTurno">
            <p  className="text_fecha">Fecha: 06/06/2023</p>
            <p  className="text_turnoPutno">Turno: 01  - PUNTO4 </p>
          </div>

          <div class="topbar-divider"></div>

          <div className="container_user"  onClick={handleDropdownToggle}>
            <p  className="text_username" >{userName}</p>
            <img src="https://startbootstrap.github.io/startbootstrap-sb-admin-2/img/undraw_profile.svg" alt="img_perfil" className='img_username' />
          </div>

          {isDropdownOpen && (
              <div className="dropdown">
                <ul>
                  <li onClick={handleLogout}>Cerrar Sesión</li>
                </ul>
              </div>
            
          )}

        </nav>
        
      </div>
    );

  }
};

export default SidebarV;