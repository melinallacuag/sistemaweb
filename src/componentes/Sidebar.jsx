import React, { useState } from 'react';
import logo from '../imagen/logo_appsven.png';
import mobileLogo  from '../imagen/icon_app.png'
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button,TextField } from '@mui/material';

const Sidebar = ({ isOpen }) => {

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isModalCTurnoOpen, setIsModalCTurnoOpen] = useState(false);
  const [isModalIDiaOpen, setIsModalIDiaOpen] = useState(false);
  const [authenticated, setauthenticated] = useState(null);

   /* Alerta de Correcto o Error*/
   const [showAlertSuccess, setShowAlertSuccess] = useState(false);
   const [showAlertError, setShowAlertError] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

    /* Modal Cambio de Turno */
    const handleModalCTurnoOpen = () => {

        setIsModalCTurnoOpen(true);
      
        setShowAlertError(true);
  
        setTimeout(() => {
          setShowAlertError(false);
        }, 1500); 
  
    };
    
    const handleModalCTurnoClose = () => {
      setIsModalCTurnoOpen(false);
    };
  
    /* Guardar Modal Cambio de Turno*/
    const handleSubmitCTurno = (e) => {

        setShowAlertSuccess(true);
  
        setTimeout(() => {

          localStorage.removeItem("authenticated");
          setauthenticated(null);
          window.location.href = '/'; 

          setShowAlertSuccess(false);
          handleModalCTurnoClose();
          
        }, 1000);
  
    };
    
      /* Modal Inicio de Día */
      const handleModalIDiaOpen = () => {

        setIsModalIDiaOpen(true);
      
        setShowAlertError(true);
  
        setTimeout(() => {
          setShowAlertError(false);
        }, 1500); 
  
    };
    
    const handleModalIDiaClose = () => {
      setIsModalIDiaOpen(false);
    };
  
    /* Guardar Modal Inicio de Día */
    const handleSubmitIDia = (e) => {

        setShowAlertSuccess(true);
  
        setTimeout(() => {

          localStorage.removeItem("authenticated");
          setauthenticated(null);
          window.location.href = '/'; 

          setShowAlertSuccess(false);
          handleModalIDiaClose();
          
        }, 1000);
  
    };

  return (
    <div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>

      <div className='contenedor_logo'>
          <img src={isMobileSidebarOpen ? mobileLogo : logo} className="App-logo" alt="logo" />
        </div>
  
        <ul className='sidebar_ul'>

          <hr class="sidebar-divider my-0"></hr>
            <li className='sidebar_li activo'>
              <a href="/" className='sidebar_menu'>
              <LocalGasStationIcon className='sidebar_icon'/>
                  <span>Venta</span>
                  
              </a>
            </li>

          <hr class="sidebar-divider my-0"></hr>

            <div class="sidebar-heading"> Interface </div>

            <li className='sidebar_li'>
              <a href="/about" className='sidebar_menu'>
              <LocalGasStationIcon className='sidebar_icon'/>
              <span>Cierre X</span>
              </a>
            </li>

            <li className='sidebar_li'>
              <a href="#" className='sidebar_menu' onClick={handleModalCTurnoOpen}>
              <LocalGasStationIcon className='sidebar_icon'/>
              <span>Cambio de Turno</span>
              </a>
            </li>

            <li className='sidebar_li'>
              <a href="#" className='sidebar_menu' onClick={handleModalIDiaOpen}>
              <LocalGasStationIcon className='sidebar_icon'/>
              <span>Inicio de Día</span></a>
            </li>

                {/* Modal Cambio de Turno*/}
                <Dialog open={isModalCTurnoOpen} onClose={handleModalCTurnoClose}>
                  <DialogTitle>Cambio de Turno</DialogTitle>
                  <DialogContent>
                    <p>¿Desea generar el cambio de turno?</p>
                  </DialogContent>

                  {showAlertSuccess && (
                      <div className={`floating-alertSuccess ${showAlertSuccess ? 'show' : ''}`}>
                        <p className="alert-success">Se genero correctamente</p>
                      </div>
                    )}
                  <DialogActions>
                    <Button variant="contained" color="secondary" style={{ backgroundColor: '#ff2b2b' }} onClick={handleModalCTurnoClose}>Cancelar</Button>
                    <Button variant="contained" color="primary" onClick={handleSubmitCTurno}>Aceptar</Button>
                  </DialogActions>
                </Dialog>

                {/* Modal Inicio de Día*/}
                <Dialog open={isModalIDiaOpen} onClose={handleModalIDiaClose}>
                  <DialogTitle>Inicio de Día</DialogTitle>
                  <DialogContent>
                    <p>¿Desea generar inicio de día?</p>
                  </DialogContent>

                  {showAlertSuccess && (
                      <div className={`floating-alertSuccess ${showAlertSuccess ? 'show' : ''}`}>
                        <p className="alert-success">Se genero correctamente</p>
                      </div>
                    )}
                  <DialogActions>
                    <Button variant="contained" color="secondary" style={{ backgroundColor: '#ff2b2b' }} onClick={handleModalIDiaClose}>Cancelar</Button>
                    <Button variant="contained" color="primary" onClick={handleSubmitIDia}>Aceptar</Button>
                  </DialogActions>
                </Dialog>

          <hr class="sidebar-divider my-0"></hr>

        </ul>

      </div>
    </div>
  );

};

export default Sidebar;