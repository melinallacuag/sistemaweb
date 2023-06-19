import React, { useState } from 'react';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button,TextField } from '@mui/material';
import InputAdornment from '@material-ui/core/InputAdornment';
import CloseIcon from '@mui/icons-material/Close';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import Sidebar from '../componentes/Sidebar';
import SidebarV from '../componentes/SidebarV';

const Home = () => {


  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const [filtroLado, setFiltroLado] = useState('');
  const [selectedManguera, setSelectedManguera] = useState(null); 
  const [isLadoMangueraSelected, setIsLadoMangueraSelected] = useState(false);

  const [isModalLibreOpen, setIsModalLibreOpen] = useState(false);

  /* Modal de Soles*/
  const [isModalSolesOpen, setIsModalSolesOpen] = useState(false);
  const [inputSoles, setSoles] = useState('');
  const [errorSoles, setErrorSoles] = useState('');

  /* Modal de Galones*/
  const [isModalGalonesOpen, setIsModalGalonesOpen] = useState(false);
  const [inputGalones, setGalones] = useState('');
  const [errorGalones, setErrorGalones] = useState('');

  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);


  const cards_lados = [
    {
      nroLado: '01',
      terminalID: 'PUNTO7'
    },
    {
      nroLado: '02',
      terminalID: 'PUNTO7'
    },
    {
      nroLado: '03',
      terminalID: 'PUNTO2'
    },
 
  ];

  const cards_mangueras = [
    {
      mangueraID: '01',
      nroLado: '01',
      posicion: '1',
      articuloID: '93',
      descripcion: 'G-PREMIUM',
      protocolo: 'S',
      valor: 0
    },
    {
      mangueraID: '02',
      nroLado: '01',
      posicion: '2',
      articuloID: '95',
      descripcion: 'G-REGULAR',
      protocolo: 'S',
      valor: 0
    },
    {
      mangueraID: '03',
      nroLado: '01',
      posicion: '1',
      articuloID: '05',
      descripcion: 'DIESEL DB5',
      protocolo: 'S',
      valor: 0
    },
 
    {
      mangueraID: '04',
      nroLado: '02',
      posicion: '1',
      articuloID: '05',
      descripcion: 'DIESEL DB5',
      protocolo: 'S',
      valor: 0
    },
    {
      mangueraID: '05',
      nroLado: '02',
      posicion: '2',
      articuloID: '95',
      descripcion: 'G-REGULAR',
      protocolo: 'S',
      valor: 0
    },

    {
      mangueraID: '06',
      nroLado: '02',
      posicion: '1',
      articuloID: '93',
      descripcion: 'G-PREMIUM',
      protocolo: 'S',
      valor: 0
    },
    {
      mangueraID: '40',
      nroLado: '03',
      posicion: '1',
      articuloID: '07',
      descripcion: 'GLP',
      protocolo: 'S',
      valor: 0
    },
   
   
  ];

  /* Filtrar Lados para mostrar Mangueras*/
  const mangueraFiltrados = filtroLado === '' ? cards_mangueras : cards_mangueras.filter(manguera => manguera.nroLado === filtroLado);

  const handleLadoClick = lado => {
    setFiltroLado(lado);
    setSelectedManguera(null);
    setIsLadoMangueraSelected(false);
  };

  const handleMangueraClick = manguera => {
    setSelectedManguera(manguera);
    setIsLadoMangueraSelected(filtroLado !== '' && manguera !== null); 
  };

   /* Modal Libre */
   const handleModalLibreOpen = () => {

    if (isLadoMangueraSelected) {
      setIsModalLibreOpen(true);
    } else {
      setShowAlertError(true);

      setTimeout(() => {
        setShowAlertError(false);
      }, 1500); 

    }

  };
  
  const handleModalLibreClose = () => {
    setIsModalLibreOpen(false);
  };

  /* Guardar Modal Libre*/

  const handleSubmitLibre = (e) => {

      setShowAlertSuccess(true);

      setTimeout(() => {

        setShowAlertSuccess(false);
        handleModalLibreClose();
        
      }, 1000);

  };

    
  /* Abrir o Cerrar Modal de Soles */
  const handleModalSolesOpen = () => {

    if (isLadoMangueraSelected) {

      resetFormSoles();
      setIsModalSolesOpen(true);

    } else {
      setShowAlertError(true);

      setTimeout(() => {
        setShowAlertError(false);
      }, 1500); 

    }

  };

  const handleModalSolesClose = () => {
    setIsModalSolesOpen(false);
  };

  /* Dar como limites de Chars hasta 10 - Soles*/
  const handleSolesChange = (e) => {

    const value = e.target.value.replace(/\D/, '').slice(0, 10);
      setSoles(value);
      setErrorSoles('');

  };

  /* Validar Modal de soles*/
  const handleValidationSoles = () => {

    let isValid = true;

    if (inputSoles === '') {
      setErrorSoles('El campo soles es obligatorio');
      isValid = false;
    } else if (inputSoles < 5) {
      setErrorSoles('El monto debe ser mayor o igual a 5 Soles.');
      isValid = false;
    } else if (inputSoles > 9999) {
      setErrorSoles('El monto debe ser menor o igual a 9999 Soles.');
      isValid = false;
    }else {
      setErrorSoles('');
    }

    return isValid;
  };


  /* Resetear Modal Soles */
  const resetFormSoles = () => {

    setSoles('');
    setErrorSoles('');
    setShowAlertSuccess(false);

  };

   /* Guardar Modal Soles*/

   const handleSubmit = (e) => {

    e.preventDefault();
  
    if (handleValidationSoles()) {

      setShowAlertSuccess(true);

      setTimeout(() => {

        setShowAlertSuccess(false);
        handleModalSolesClose();
        
      }, 1000);

    }

  };

  /* Modal Galones */
  const handleModalGalonesOpen = () => {

    if (isLadoMangueraSelected) {

      resetFormGalones();
      setIsModalGalonesOpen(true);

    } else {
      setShowAlertError(true);

      setTimeout(() => {
        setShowAlertError(false);
      }, 1500); 

    }

  };
  
  const handleModalGalonesClose = () => {
    setIsModalGalonesOpen(false);
  };
  
  /* Dar como limites de Chars hasta 10 - Galones*/
  const handleGalonesChange = (e) => {

    const value = e.target.value.replace(/\D/, '').slice(0, 10);
      setGalones(value);
      setErrorGalones('');

  };

  /* Validar Modal de Galones*/
  const handleValidationGalones = () => {

    let isValid = true;

    if (inputGalones === '') {
      setErrorGalones('El campo galones es obligatorio');
      isValid = false;
    } else if (inputGalones < 5) {
      setErrorGalones('El monto debe ser mayor o igual a 5 Galones.');
      isValid = false;
    } else if (inputGalones > 9999) {
      setErrorGalones('El monto debe ser menor o igual a 9999 Galones.');
      isValid = false;
    }else {
      setErrorGalones('');
    }

    return isValid;
  };

   /* Resetear Modal Galones */
   const resetFormGalones = () => {

    setGalones('');
    setErrorGalones('');
    setShowAlertSuccess(false);

  };

   /* Guardar Modal Galones*/

  const handleSubmitGalones = (e) => {

    e.preventDefault();
  
    if (handleValidationGalones()) {

      setShowAlertSuccess(true);

      setTimeout(() => {

        setShowAlertSuccess(false);
       handleModalGalonesClose();
        
      }, 1000);

    }

  };

  return (
    <div className='app'>
      <div className={`main ${isOpen ? 'open' : ''}`} >        
        <div className="toggle-button" onClick={toggleSidebar}> {isOpen ? <CloseIcon/> : <DensityMediumIcon/>} </div>
                  
          <Sidebar isOpen={isOpen}/>

            <div className='cont_sliroutes'>

            <SidebarV/>

              <div className="card-container">
              
                {/* Campo de Lados*/}
                <div className="card">
                  <h3 className="inner-title">Lados</h3>
                  <div className="inner-cards">
                    {cards_lados.map((card_lado, index) => (
                      <div className={`inner-card ${filtroLado === card_lado.nroLado ? 'selected' : ''}`}
                        key={index}
                        onClick={() => handleLadoClick(card_lado.nroLado)}>
                        <LocalGasStationIcon className="icon-fuel" />
                        <p className="inner_description">{card_lado.nroLado}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Campo de Mangueras*/}
                {filtroLado !== '' && (
                  <div className="card">
                    <h3 className="inner-title">Mangueras</h3>
                    <div className="inner-cards">

                      {mangueraFiltrados.map((card_manguera, index) => (
                    
                        <div  className={`inner-card ${selectedManguera === index ? 'selecteds' : ''} ${selectedManguera === null ? 'unselected' : ''} 
                          ${card_manguera.descripcion === 'G-PREMIUM' ? 'premium' : ''} ${card_manguera.descripcion === 'G-REGULAR' ? 'regular' : ''}  
                          ${card_manguera.descripcion === 'DIESEL DB5' ? 'diesel' : ''} ${card_manguera.descripcion === 'GLP' ? 'glp' : ''}`}
                          key={index}  onClick={() => handleMangueraClick(index)} >
                            
                            <LocalGasStationIcon className="icon-fuel" />
                            <div>
                            <p className="inner_manguera_desc">{card_manguera.mangueraID}</p>
                            <p className="inner_manguera_desc">{card_manguera.descripcion}</p>
                            </div>
                            
                        </div>
                                

                      ))}
                    </div>
                  </div>
                )}

                
              </div>

              {showAlertError && (
                <div className={`floating-alertError ${showAlertError ? 'show' : ''}`}>
                  <p className='alert-error'>Seleccionar lado y manguera.</p>
                </div>
              )}
                  
              {/* Campo de Modalidad*/}
              <div className="card">
                  <h3 className="inner-title">Modalidad</h3>
                  <div className="inner-cards">
                      <button className='btn_cards' onClick={handleModalLibreOpen}>LIBRE</button>
                      <button className='btn_cards' onClick={handleModalSolesOpen}>SOLES</button>
                      <button className='btn_cards' onClick={handleModalGalonesOpen}>GALONES</button>
                      </div>
              </div>

              {/* Campo de Operación*/}
              <div className="card">
                <h3 className="inner-title">Operación</h3>
                <div className="inner-cards">
                  <button className='btn_cards'>boleta</button>
                  
                  <button className='btn_cards'>FACTURA</button>
                  <button className='btn_cards'>N/DESPACHO</button>
                  <button className='btn_cards'>SERAFÍN</button>
                  <button className='btn_cards'>PUNTOS</button>
                  <button className='btn_cards'>CANJE</button>
                  </div>
              </div>

              {/* Campo de Transacciones*/}
              <div className="card">
                <h3 className="inner-title">Transacciones</h3>
              </div>

              <Dialog open={isModalLibreOpen} onClose={handleModalLibreClose}>
                <DialogTitle>Libre</DialogTitle>
                <DialogContent>
                  <p>¿Desea activar el modo LIBRE?</p>
                </DialogContent>

                {showAlertSuccess && (
                    <div className={`floating-alertSuccess ${showAlertSuccess ? 'show' : ''}`}>
                      <p className="alert-success">Se guardó correctamente</p>
                    </div>
                  )}
                <DialogActions>
                  <Button onClick={handleModalLibreClose}>Cancelar</Button>
                  <Button onClick={handleSubmitLibre}>Aceptar</Button>
                </DialogActions>
              </Dialog>

              <Dialog open={isModalSolesOpen} onClose={handleModalSolesClose}>

                <DialogTitle>Soles</DialogTitle>

                  <DialogContent>

                  {(errorSoles ) && (
                  <div className={`floating-alertErrorInput ${errorSoles ? 'show' : ''}`}>
                      {errorSoles && <p className="alert-errorInput">{errorSoles}</p>}
                    </div>
                  )}

                    <TextField type="text" className='campo_input' value={inputSoles} onChange={handleSolesChange} margin="normal" label="Soles" fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start" style={{ userSelect: 'none' }}>
                            S/
                          </InputAdornment>
                        ),
                      }}
                    />  

                  {showAlertSuccess && (
                    <div className={`floating-alertSuccess ${showAlertSuccess ? 'show' : ''}`}>
                      <p className="alert-success">Se guardó correctamente</p>
                    </div>
                  )}

                  </DialogContent>

                <DialogActions>
                  <Button onClick={handleModalSolesClose}>Cancelar</Button>
                  <Button  onClick={handleSubmit} >Aceptar</Button>
                </DialogActions>

              </Dialog>


              <Dialog open={isModalGalonesOpen} onClose={handleModalGalonesClose}>

                <DialogTitle>Galones</DialogTitle>

                  <DialogContent>

                  {(errorGalones ) && (
                  <div className={`floating-alertErrorInput ${errorGalones ? 'show' : ''}`}>
                      {errorGalones && <p className="alert-errorInput">{errorGalones}</p>}
                    </div>
                  )}

                    <TextField type="text" className='campo_input' value={inputGalones} onChange={handleGalonesChange} margin="normal" label="Galones" fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start" style={{ userSelect: 'none' }}>
                            S/
                          </InputAdornment>
                        ),
                      }}
                    />  

                  {showAlertSuccess && (
                    <div className={`floating-alertSuccess ${showAlertSuccess ? 'show' : ''}`}>
                      <p className="alert-success">Se guardó correctamente</p>
                    </div>
                  )}

                  </DialogContent>

                <DialogActions>
                  <Button onClick={handleModalGalonesClose}>Cancelar</Button>
                  <Button  onClick={handleSubmitGalones} >Aceptar</Button>
                </DialogActions>

                </Dialog>
        </div>
      </div>   
    </div>
    
  );
};

export default Home;