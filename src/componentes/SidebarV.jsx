import React, {useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const SidebarV = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [authenticated, setauthenticated] = useState(null);
  const [userName, setUserName] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [terminalID, setTerminalID] = useState('');
  const [fechaProceso, setFechaProceso] = useState('');
  const [turnos, setTurno] = useState('');

    /* Modal de Libre*/
    const [isModalCerrarSesionOpen, setIsModalCerrarSesionOpen] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (loggedInUser && loggedInUser !== 'undefined') {
      setauthenticated(JSON.parse(loggedInUser));
    }
    const loggedInTerminal = localStorage.getItem('authenticated');
    if (loggedInTerminal) {
      const terminalData = JSON.parse(loggedInTerminal);
      setTerminalID(terminalData.terminalID);
      setFechaProceso(terminalData.fecha_Proceso);
      setTurno(terminalData.turno);
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

  useEffect(() => {
    if (authenticated) {
      setUserName(authenticated.names);
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

  /* Modal Cerrar Sesión */
  const handleModalCerrarSesionOpen = () => {
 
        setIsModalCerrarSesionOpen(true);

  };
  
  const handleModalCerrarSesionClose = () => {
    setIsModalCerrarSesionOpen(false);
  };

  if (!authenticated) {
       
    return null;

  } else {

    return (
      <div>
        <nav className="horizontal-navbar" >

          <div className="cont_datoFechaTurno">
            <p  className="text_fecha">Fecha: {fechaProceso}</p>
            <p  className="text_turnoPutno">Turno: {turnos}  - {terminalID} </p>
          </div>

          <div class="topbar-divider"></div>

          <div className="container_user"  onClick={handleDropdownToggle}>
            <p  className="text_username" >{userName}</p>
            <img src="https://startbootstrap.github.io/startbootstrap-sb-admin-2/img/undraw_profile.svg" alt="img_perfil" className='img_username' />
          </div>

          {isDropdownOpen && (
              <div className="dropdown">
                <ul>
                  <li onClick={handleModalCerrarSesionOpen} >Cerrar Sesión</li>
                </ul>
              </div>
            
          )}
          
          {/* Modal Cerrar Sesion*/}
            <Dialog open={isModalCerrarSesionOpen} onClose={handleModalCerrarSesionClose}>
              <DialogTitle>Cerrar Sesión</DialogTitle>
                <DialogContent>
                  <p>¿Esta seguro que desea Cerrar Sesión?</p>
                </DialogContent>
                <DialogActions>
                  <Button variant="contained" color="secondary" style={{ backgroundColor: '#ff2b2b' }} onClick={handleModalCerrarSesionClose}>Cancelar</Button>
                  <Button variant="contained" color="primary" onClick={handleLogout}>Aceptar</Button>
                </DialogActions>
            </Dialog>

        </nav>
        
      </div>
    );

  }
};

export default SidebarV;