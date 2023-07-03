import React, {useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button,TextField } from '@mui/material';

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

    const [isModalConfiguracionOpen, setIsModalConfiguracionOpen] = useState(false);

    const [inputDireccionMac, setDireccionMac] = useState('');
    const [inputNBluetooth, setNBluetooth] = useState('');
    const [inputCEmparejamiento, setCEmparejamiento] = useState('');
  

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

    const loggedInUsers = localStorage.getItem('authenticatedUser');
    if (loggedInUsers) {
      const userData = JSON.parse(loggedInUsers);
      setUserName(userData.names);
    }
  }, []);

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

  /* Modal Cerrar Sesión */
  const handleModalCerrarSesionOpen = () => {
 
        setIsModalCerrarSesionOpen(true);

  };
  
  const handleModalCerrarSesionClose = () => {
    setIsModalCerrarSesionOpen(false);
  };


  /* Modal Configuracion */
  const handleModalConfiguracionOpen = () => {
 
    setIsModalConfiguracionOpen(true);

};

const handleDireccionMACChange = (event) => {
  setDireccionMac(event.target.value);

};

const handleNBluetoothChange = (event) => {
  setNBluetooth(event.target.value);

};

const handleCEmparejamientoChange = (e) => {
  const value = e.target.value.replace(/\D/, '').slice(0, 4);
  setCEmparejamiento(value);
 
};


const handleModalConfiguracionClose = () => {
setIsModalConfiguracionOpen(false);
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
                <li onClick={handleModalConfiguracionOpen}>Configurar</li>
                <hr />
                <li onClick={handleModalCerrarSesionOpen} >Cerrar Sesión</li>
                </ul>
              </div>
            
          )}

          {/* Modal Configurar Impresora*/}
          <Dialog open={isModalConfiguracionOpen} onClose={handleModalConfiguracionClose}>
              <DialogTitle>Creación de impresión</DialogTitle>
                <DialogContent>
                <TextField 
                              type="text"
                              className="campo_input"
                              value={inputDireccionMac}
                              onChange={handleDireccionMACChange}
                              margin="normal"
                              label="Dirección MAC"
                              fullWidth/>

                            <TextField
                              type="text"
                              className="campo_input"
                              value={inputNBluetooth}
                              onChange={handleNBluetoothChange}
                              margin="normal"
                              label="Nombre Bluetooth"
                              fullWidth/>
                            <TextField
                              type="text"
                              className="campo_input"
                              value={inputCEmparejamiento}
                              onChange={handleCEmparejamientoChange}
                              margin="normal"
                              label="Clave de Emparejamiento"
                              fullWidth/>
                </DialogContent>
                <DialogActions>
                  <Button variant="contained" color="secondary" style={{ backgroundColor: '#ff2b2b' }} onClick={handleModalConfiguracionClose}>Cancelar</Button>
                  <Button variant="contained" color="primary" >Aceptar</Button>
                </DialogActions>
            </Dialog>
          
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