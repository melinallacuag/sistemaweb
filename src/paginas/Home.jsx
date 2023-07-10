import React, { useState,useEffect } from 'react';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button,TextField } from '@mui/material';
import InputAdornment from '@material-ui/core/InputAdornment';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import FormGroup from '@material-ui/core/FormGroup';
import CloseIcon from '@mui/icons-material/Close';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Sidebar from '../componentes/Sidebar';
import SidebarV from '../componentes/SidebarV';
import Print from '../impresion/PrintableComponent';
import Bluetooth from '../impresion/Bluetooth';

import axios from 'axios';

import ReactDOM from 'react-dom';

const Home = () => {


  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  /* Filtrado de Lados - Mangueras*/
  const [filtroLado, setFiltroLado] = useState('');
  const [selectedManguera, setSelectedManguera] = useState(null); 
  const [isLadoMangueraSelected, setIsLadoMangueraSelected] = useState(false);

  /* Modal de Libre*/
  const [isModalLibreOpen, setIsModalLibreOpen] = useState(false);

   /* Modal de Serafin*/
   const [isModalSerafinOpen, setIsModalSerafinOpen] = useState(false);

  /* Modal de Soles*/
  const [isModalSolesOpen, setIsModalSolesOpen] = useState(false);
  const [inputSoles, setSoles] = useState('');
  const [errorSoles, setErrorSoles] = useState('');

  /* Modal de Galones*/
  const [isModalGalonesOpen, setIsModalGalonesOpen] = useState(false);
  const [inputGalones, setGalones] = useState('');
  const [errorGalones, setErrorGalones] = useState('');

  const [modoAutomatico, setModoAutomatico] = useState(false);
  const [timer, setTimer] = useState(null);
  const [isTaskScheduled, setIsTaskScheduled] = useState(false);

  useEffect(() => {
    if (modoAutomatico && !isTaskScheduled) {
      const newTimer = setInterval(() => {
        insertarDespacho();
      }, 3000);

      setTimer(newTimer);
      setIsTaskScheduled(true);
    } else if (!modoAutomatico && isTaskScheduled) {
      clearInterval(timer);
      setTimer(null);
      setIsTaskScheduled(false);
    }

    return () => {
      clearInterval(timer);
    };
  }, [modoAutomatico, isTaskScheduled, timer]);

  const handleAutomaticoClick = () => {
    if (modoAutomatico) {
      modoStop();
     
    } else {
      modoAutomaticoFunc();
    }
  };

  const modoAutomaticoFunc = () => {
    if (!isTaskScheduled) {
      const newTimer = setInterval(() => {
        insertarDespacho();
        console.log('hola');
      }, 3000);

      setTimer(newTimer);
      setIsTaskScheduled(true);
    }

    setModoAutomatico(true);
  };

  const modoStop = () => {
    if (isTaskScheduled) {
      clearInterval(timer);
      setTimer(null);
      setIsTaskScheduled(false);
    }

    setModoAutomatico(false);
  };

  const insertarDespacho = () => {
    // Lógica para insertar el despacho
  };
    /* Datos Lados*/
  const formaPago = [
      {
        cardId: '1',
        names: 'VISA'
      },
      {
        cardId: '2',
        names: 'MASTERCARD'
      },
      {
        cardId: '3',
        names: 'DINERS'
      },
      {
        cardId: '4',
        names: 'YAPE'
      },
      {
        cardId: '5',
        names: 'AMERICAN EXPRESS'
      },
      {
        cardId: '6',
        names: 'PLIN'
      },
  ];

  /* Modal de Boleta*/
  const [isModalBoletaOpen, setIsModalBoletaOpen] = useState(false);
  const [inputPlaca, setPlaca] = useState('');
  const [inputDNI, setDNI] = useState('');
  const [inputNombre, setNombre] = useState('');
  const [inputDireccion, setDireccion] = useState('');
  const [inputObservacion, setObservacion] = useState('');
  const [errorPlaca, setErrorPlaca] = useState('');
  const [errorDNI, setErrorDNI] = useState('');
  const [errorNombre, setErrorNombre] = useState('');

  /* Campos de Seleccion de Forma de Pago*/
  const [selectedOption, setSelectedOption] = useState('Efectivo');
  const [selectedOptionFPago, setSelectedOptionFPago] = useState('');
  const [inputNOperacion, setNOperacion] = useState('');
  const [inputPagoEfectivo, setPagoEfectivo] = useState('');
  const [errorNOperacion, setErrorNOperacion] = useState('');
  const [errorPagoEfectivo, setErrorPagoEfectivo] = useState('');
  

  /* Modal de Factura*/
  const [isModalFacturaOpen, setIsModalFacturaOpen] = useState(false);
  const [inputRUC, setRUC] = useState('');
  const [inputRSocial, setRSocial] = useState('');
  const [errorRUC, setErrorRUC] = useState('');
  const [errorRSocial, setErrorRSocial] = useState('');

  /* Alerta de Correcto o Error*/
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);

  const [cards_lados, setlados] = useState([]);
  const idLados = localStorage.getItem('uniqueId') ? localStorage.getItem('uniqueId').toUpperCase() : '';

  useEffect(() => {
    axios.get(`api/lados/listado/${idLados}`)
      .then((response) => {
        return response.data;
      })
      .then((articulos) => {
        setlados(articulos);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  /* Datos Lados*/
  /*const cards_lados = [
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
 
  ];*/

  const [cards_mangueras, setmangueras] = useState([]);
  const idMangueras = "PUNTO3";


  useEffect(() => {
    axios.get(`api/picos/listado2/${idMangueras}`)
      .then((response) => {
        return response.data;
      })
      .then((articulos) => {
        setmangueras(articulos);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  /* Datos Manguera*/
  /*const cards_mangueras = [
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
   
   
  ];*/

  /* Datos de Transacciones*/
  const detalleVenta = [
    {
      cara: '01',
      tipoPago: 'E',
      impuesto: '18.0',
      nroPlaca:'',
      tarjetaPuntos:'',
      clienteID:'',
      clienteRUC:'',
      clienteRS:'',
      clienteDR:'',
      tarjetaND:'',
      tarjetaCredito:'',
      operacionREF:'',
      observacion:'',
      kilometraje:'',
      montoSoles:'0.00',
      mtoSaldoCredito:'0.0',
      ptosDisponible:'0.0'
    },
    {
      cara: '02',
      tipoPago: 'E',
      impuesto: '18.0',
      nroPlaca:'',
      tarjetaPuntos:'',
      clienteID:'',
      clienteRUC:'',
      clienteRS:'',
      clienteDR:'',
      tarjetaND:'',
      tarjetaCredito:'',
      operacionREF:'',
      observacion:'',
      kilometraje:'',
      montoSoles:'0.00',
      mtoSaldoCredito:'0.0',
      ptosDisponible:'0.0'
    },
    {
      cara: '03',
      tipoPago: 'E',
      impuesto: '18.0',
      nroPlaca:'',
      tarjetaPuntos:'',
      clienteID:'',
      clienteRUC:'',
      clienteRS:'',
      clienteDR:'',
      tarjetaND:'',
      tarjetaCredito:'',
      operacionREF:'',
      observacion:'',
      kilometraje:'',
      montoSoles:'0.00',
      mtoSaldoCredito:'0.0',
      ptosDisponible:'0.0'
    },
    {
      cara: '04',
      tipoPago: 'E',
      impuesto: '18.0',
      nroPlaca:'',
      tarjetaPuntos:'',
      clienteID:'',
      clienteRUC:'',
      clienteRS:'',
      clienteDR:'',
      tarjetaND:'',
      tarjetaCredito:'',
      operacionREF:'',
      observacion:'',
      kilometraje:'',
      montoSoles:'0.00',
      mtoSaldoCredito:'0.0',
      ptosDisponible:'0.0'
    },
  ]

  const LCliente = [
    {
      clienteID: '75991278',
      clienteRUC: '',
      clienteRZ: 'Melina Llacua Guere',
      clienteDR: 'Humboth y Precursores'
    },
    {
      clienteID: '75991274',
      clienteRUC: '',
      clienteRZ: 'Ermelinda Campos Rojas',
      clienteDR: 'Los manalteales'
    },
    {
      clienteID: '75481267',
      clienteRUC: '',
      clienteRZ: 'Moises Rojas Canchari',
      clienteDR: ''
    },
    {
      clienteID: '',
      clienteRUC: '10784595746',
      clienteRZ: 'Wilmer Capcha Villegas',
      clienteDR: ''
    },
    {
      clienteID: '65784123',
      clienteRUC: '',
      clienteRZ: 'Fernanado Collazos Porras',
      clienteDR: 'Los angeles'
    }
  ];

  const Setting = [
    {
      clienteID:'11111111',
      clienteRZ:'Cliente Varios',
      nroplaca:'000-0000',
    }
  ]

  const [detalleVentaList, setDetalleVentaList] = useState(detalleVenta);

  /* Filtrar Lados para mostrar Mangueras*/
  //const mangueraFiltrados = filtroLado === '' ? cards_mangueras : cards_mangueras.filter(manguera => manguera.nroLado === filtroLado);
  const mangueraFiltrados = filtroLado === '' ? cards_mangueras : cards_mangueras.filter(manguera => manguera.nroLado.toString() === filtroLado.toString());


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

    /* Modal Serafin */
    const handleModalSerafinOpen = () => {

      if (isLadoMangueraSelected) {
        setIsModalSerafinOpen(true);
      } else {
        setShowAlertError(true);
  
        setTimeout(() => {
          setShowAlertError(false);
        }, 1500); 
  
      }
  
    };
    
    const handleModalSerafinClose = () => {
      setIsModalSerafinOpen(false);
    };
  
    /* Guardar Modal Serafin*/
    const handleSubmitSerafin = (e) => {

      detalleVentaList.forEach((detalleVenta) => {
        if (detalleVenta.cara === filtroLado) {

          detalleVenta.tipoPago        = 'S';
          detalleVenta.impuesto        = '18.0';
          detalleVenta.nroPlaca        = '';
          detalleVenta.tarjetaPuntos   = '';
          detalleVenta.clienteID       = '';
          detalleVenta.clienteRUC      = '';
          detalleVenta.clienteRS       = '';
          detalleVenta.clienteDR       = '';
          detalleVenta.tarjetaND       = '';
          detalleVenta.tarjetaCredito  = '';
          detalleVenta.operacionREF    = '';
          detalleVenta.observacion     = '';
          detalleVenta.kilometraje     = '';
          detalleVenta.montoSoles      = '0.00';
          detalleVenta.mtoSaldoCredito = '0.0';
          detalleVenta.ptosDisponible  ='0.0';

        }

      });
  
        setShowAlertSuccess(true);
  
        setTimeout(() => {
  
          setShowAlertSuccess(false);
          handleModalSerafinClose();
          
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
    } else if (inputGalones < 1) {
      setErrorGalones('El monto debe ser mayor o igual a 1 Galones.');
      isValid = false;
    } else if (inputGalones > 9999) {
      setErrorGalones('El monto debe ser menor o igual a 999 Galones.');
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

   /* Modal Boleta */
  const handleModalBoletaOpen = () => {

    if (isLadoMangueraSelected) {
      resetFormBoleta();
      setIsModalBoletaOpen(true);

    } else {
      setShowAlertError(true);

      setTimeout(() => {
        setShowAlertError(false);
      }, 1500); 

    }

  };
  
  const handleModalBoletaClose = () => {
    setIsModalBoletaOpen(false);
  };

    /* Inicio de Datos del Formulario*/
    const handlePlacaChange = (event) => {
      const inputValue = event.target.value;
      const truncatedValue = inputValue.slice(0, 10); 
      setPlaca(truncatedValue);
      setErrorPlaca('');
    };
    
    const handleDNIChange = (e) => {
      const value = e.target.value.replace(/\D/, '').slice(0, 8);
      setDNI(value);
      setErrorDNI('');
    };

    const handleNombreChange = (event) => {
      setNombre(event.target.value);
      setErrorNombre('');
    };

    const handleDireccionChange = (event) => {
      setDireccion(event.target.value);
    };

    const handleObservacionChange = (event) => {
      setObservacion(event.target.value);
    };

    /* Radio de forma de Pago*/
    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };
    
    const handleNOperacionChange = (e) => {
      const value = e.target.value.replace(/\D/, '').slice(0, 4);
      setNOperacion(value);
      setErrorNOperacion('');
    };
    
    const handlePagoEfectivoChange = (e) => {
      const value = e.target.value.replace(/\D/, '').slice(0, 10);
      setPagoEfectivo(value);
      setErrorPagoEfectivo('');
    };

    const handleOptionChangeFPago = (event) => {
      setSelectedOptionFPago(event.target.value);
    };

    /* Validar Modal de Boleta*/
    const handleValidationBoleta = () => {

      let isValid = true;
  
      if (inputPlaca === '') {
        setErrorPlaca('El campo Placa es obligatorio');
        isValid = false;
      }else {
        setErrorPlaca('');
      }
      
      if (inputDNI === '') {
        setErrorDNI('El campo DNI es obligatorio');
        isValid = false;
      } else if (inputDNI.length < 8) {
        setErrorDNI('El campo DNI debe tener 8 dígitos');
        isValid = false;
      }else {
        setErrorDNI('');
      }
       
      if (inputNombre === '') {
        setErrorNombre('El campo Nombre es obligatorio');
        isValid = false;
      }else {
        setErrorNombre('');
      }

      if (selectedOption === 'Tarjeta') {

        if (inputNOperacion === '') {
          setErrorNOperacion('El campo N° de Operación es obligatorio');
          isValid = false;
        } else if (inputNOperacion.length < 4) {
          setErrorNOperacion('El N° Operación debe tener 4 dígitos');
          isValid = false;
        }else {
          setErrorNOperacion('');
        }

        if (inputPagoEfectivo === '') {
          setErrorPagoEfectivo('El campo Pago Efectivo es obligatorio');
          isValid = false;
        }else {
          setErrorPagoEfectivo('');
        }

      }

      if (selectedOption === 'Credito') {

        if (inputPagoEfectivo === '') {
          setErrorPagoEfectivo('El campo Pago Efectivo es obligatorio');
          isValid = false;
        }else {
          setErrorPagoEfectivo('');
        }
        
      }
  
      return isValid;
    };

     /* Resetear Modal Boleta */
  const resetFormBoleta = () => {

      setPlaca('000-0000');
      setDNI('');
      setNombre('');
      setDireccion('');
      setObservacion('');
      setNOperacion('');
      setPagoEfectivo('0');

      setSelectedOption('Efectivo');
      setSelectedOptionFPago(formaPago[0].cardId);

      setErrorPlaca('');
      setErrorDNI('');
      setErrorNombre('');
      setErrorNOperacion('');
      setErrorPagoEfectivo('');
      setShowAlertSuccess(false);
  
  };
  
     /* Guardar Modal Boleta*/

     const handleSubmitBoleta = (e) => {
      e.preventDefault();
    
      if (handleValidationBoleta()) {
        detalleVentaList.forEach((detalleVenta) => {
          if (detalleVenta.cara === filtroLado) {

            detalleVenta.tipoPago        = selectedOption.substring(0,1);
            detalleVenta.impuesto        = '18.0';
            detalleVenta.nroPlaca        = inputPlaca;
            detalleVenta.tarjetaPuntos   = '';
            detalleVenta.clienteID       = inputDNI;
            detalleVenta.clienteRUC      = '';
            detalleVenta.clienteRS       = inputNombre;
            detalleVenta.clienteDR       = inputDireccion;
            detalleVenta.tarjetaND       = '';
            detalleVenta.tarjetaCredito  = '';
            detalleVenta.operacionREF    = '';
            detalleVenta.observacion     = inputObservacion;
            detalleVenta.kilometraje     = '';
            detalleVenta.montoSoles      = '0.00';
            detalleVenta.mtoSaldoCredito = '0.0';
            detalleVenta.ptosDisponible  ='0.0';

            if (selectedOption === 'Tarjeta') {
              detalleVenta.tarjetaCredito = selectedOptionFPago;
              detalleVenta.operacionREF   = inputNOperacion;
              detalleVenta.montoSoles     = inputPagoEfectivo;
            }else if (selectedOption === 'Credito') {
              detalleVenta.montoSoles     = inputPagoEfectivo;
            }

             setDetalleVentaList([...detalleVentaList]);
          }

        });
    
        setShowAlertSuccess(true);
    
        setTimeout(() => {
          setShowAlertSuccess(false);
          handleModalBoletaClose();
        }, 1000);
      }
    };

      /* Modal Factura */
  const handleModalFacturaOpen = () => {

    if (isLadoMangueraSelected) {
      resetFormFactura();
      setIsModalFacturaOpen(true);

    } else {
      setShowAlertError(true);

      setTimeout(() => {
        setShowAlertError(false);
      }, 1500); 

    }

  };
  
  const handleModalFacturaClose = () => {
    setIsModalFacturaOpen(false);
  };

   /* Inicio de Datos del Formulario*/
  
  const handleRUCChange = (e) => {
    const value = e.target.value.replace(/\D/, '').slice(0, 11);
    setRUC(value);
    setErrorRUC('');
  };

  const handleRSocialChange = (event) => {
    setRSocial(event.target.value);
    setErrorRSocial('');
  };

      /* Validar Modal de Boleta*/
      const handleValidationFactura = () => {

        let isValid = true;
    
        if (inputPlaca === '') {
          setErrorPlaca('El campo Placa es obligatorio');
          isValid = false;
        }else {
          setErrorPlaca('');
        }
        
        if (inputRUC === '') {
          setErrorRUC('El campo RUC es obligatorio');
          isValid = false;
        } else if (inputRUC.length < 11) {
          setErrorRUC('El campo RUC debe tener 8 dígitos');
          isValid = false;
        }else {
          setErrorRUC('');
        }
         
        if (inputRSocial === '') {
          setErrorRSocial('El campo Razon Social es obligatorio');
          isValid = false;
        }else {
          setErrorRSocial('');
        }

        if (selectedOption === 'Tarjeta') {

          if (inputNOperacion === '') {
            setErrorNOperacion('El campo N° de Operación es obligatorio');
            isValid = false;
          } else if (inputNOperacion.length < 4) {
            setErrorNOperacion('El N° Operación debe tener 4 dígitos');
            isValid = false;
          }else {
            setErrorNOperacion('');
          }

          if (inputPagoEfectivo === '') {
            setErrorPagoEfectivo('El campo Pago Efectivo es obligatorio');
            isValid = false;
          }else {
            setErrorPagoEfectivo('');
          }

        }

        if (selectedOption === 'Credito') {

          if (inputPagoEfectivo === '') {
            setErrorPagoEfectivo('El campo Pago Efectivo es obligatorio');
            isValid = false;
          }else {
            setErrorPagoEfectivo('');
          }
          
        }
        
  
      
    
        return isValid;
      };
  
       /* Resetear Modal Boleta */
    const resetFormFactura = () => {
  
        setPlaca('000-0000');
        setRUC('');
        setRSocial('');
        setDireccion('');
        setObservacion('');
        setNOperacion('');
        setPagoEfectivo('0');
  
        setSelectedOption('Efectivo');
        setSelectedOptionFPago(formaPago[0].cardId);
  
        setErrorPlaca('');
        setErrorRUC('');
        setErrorRSocial('');
        setErrorNOperacion('');
        setErrorPagoEfectivo('');
        setShowAlertSuccess(false);
    
    };
    
       /* Guardar Modal Boleta*/
    
      const handleSubmitFactura = (e) => {

        e.preventDefault();
      
        if (handleValidationFactura()) {

          detalleVentaList.forEach((detalleVenta) => {
            if (detalleVenta.cara === filtroLado) {
  
              detalleVenta.tipoPago        = selectedOption.substring(0,1);
              detalleVenta.impuesto        = '18.0';
              detalleVenta.nroPlaca        = inputPlaca;
              detalleVenta.tarjetaPuntos   = '';
              detalleVenta.clienteID       = '';
              detalleVenta.clienteRUC      = inputRUC;
              detalleVenta.clienteRS       = inputRSocial;
              detalleVenta.clienteDR       = inputDireccion;
              detalleVenta.tarjetaND       = '';
              detalleVenta.tarjetaCredito  = '';
              detalleVenta.operacionREF    = '';
              detalleVenta.observacion     = inputObservacion;
              detalleVenta.kilometraje     = '';
              detalleVenta.montoSoles      = '0.00';
              detalleVenta.mtoSaldoCredito = '0.0';
              detalleVenta.ptosDisponible  ='0.0';
  
              if (selectedOption === 'Tarjeta') {
                detalleVenta.tarjetaCredito = selectedOptionFPago;
                detalleVenta.operacionREF   = inputNOperacion;
                detalleVenta.montoSoles     = inputPagoEfectivo;
              }else if (selectedOption === 'Credito') {
                detalleVenta.montoSoles     = inputPagoEfectivo;
              }
  
               setDetalleVentaList([...detalleVentaList]);
            }
  
          });
    
          setShowAlertSuccess(true);
    
          setTimeout(() => {
    
            setShowAlertSuccess(false);
           handleModalFacturaClose();
            
          }, 1000);
    
        }
    
      };


      /* Validar Modal de Boleta por Reniec*/
      const handleValidationReniec = () => {

        let isValid = true;

        if(inputDNI === ''){
          setErrorDNI('El campo DNI es obligatorio')
          isValid = false;
        }else if(inputDNI.length < 8){
          setErrorDNI('El campo DNI debe tener 8 dígitos')
          isValid = false;
        }else{
          const reniec = LCliente.find(reniec => reniec.clienteID === inputDNI);
          if(!reniec){
            setErrorDNI('No se encontro DNI');
            isValid = false;
            setNombre('');
          }else{
            setErrorDNI('')
            setNombre(reniec.clienteRZ);
          }
        }

        return isValid;
      };

      const handleSubmitReniec = (e) => {
        e.preventDefault();
      
        if (handleValidationReniec()) {


          setShowAlertSuccess(true);

          setTimeout(() => {
    
            setShowAlertSuccess(false);
            
          }, 1000);
    
        }
      };

      /* Validar Modal de Boleta por Sunat*/
      const handleValidationSunat = () => {

        let isValid = true;

        if(inputRUC === ''){
          setErrorRUC('El campo RUC es obligatorio')
          isValid = false;
        }else if(inputRUC.length < 11){
          setErrorRUC('El campo RUC debe tener 11 dígitos')
          isValid = false;
        }else{
          const sunat = LCliente.find(sunat => sunat.clienteRUC === inputRUC);
          if(!sunat){
            setErrorRUC('No se encontro RUC');
            isValid = false;
            setRSocial('');
          }else{
            setErrorRUC('')
            setRSocial(sunat.clienteRZ)
          }
        }

        return isValid;
      };

      const handleSubmitSunat = (e) => {
        e.preventDefault();
      
        if (handleValidationSunat()) {

          setShowAlertSuccess(true);
    
          setTimeout(() => {
    
            setShowAlertSuccess(false);
            
          }, 1000);
    
        }
        
      };


      const handleSubmitBoletaSimple = (e) => {
        e.preventDefault();

        const { clienteID, clienteRZ, nroplaca } = Setting[0];
        setDNI(clienteID)
        setNombre(clienteRZ)
        setPlaca(nroplaca)
         
      };

      

  

  const DNICharacterCount = inputDNI.length;
  const NombreCharacterCount = inputNombre.length;

  const RUCCharacterCount = inputRUC.length;
  const RSocialCharacterCount = inputRSocial.length;
  
  return (
    <div className='app'>
      <div className={`main ${isOpen ? 'open' : ''}`} >        
        <div className="toggle-button" onClick={toggleSidebar}> {isOpen ? <CloseIcon/> : <DensityMediumIcon/>} </div>        
        <Sidebar isOpen={isOpen}/>

          <div className='cont_sliroutes'>

            <SidebarV />

        
              


             {/* <Print/>
             <Bluetooth/>*/} 
           
                {/* Campo de Stop*/}
                <div className="card">
                  <div className="inner-cards">
                    <div className="transaction-table-container">
                    <button className="btn_cards btn_automatico" onClick={handleAutomaticoClick} style={{ backgroundColor: modoAutomatico ? '#3aa538' : '#001E8A' }}
          >
                      {modoAutomatico ? 'Automatico' : 'Stop'}
                      </button>
                    </div>
                  </div>
                </div>


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
                    <button className='btn_cards' onClick={handleModalBoletaOpen}>boleta</button>
                    <button className='btn_cards' onClick={handleModalFacturaOpen}>FACTURA</button>
                    <button className='btn_cards'>N/DESPACHO</button>
                    <button className='btn_cards' onClick={handleModalSerafinOpen}>SERAFÍN</button>
                    <button className='btn_cards'>PUNTOS</button>
                    <button className='btn_cards'>CANJE</button>
                    </div>
                </div>

                {/* Campo de Transacciones*/}
                <div className="card">
                  <h3 className="inner-title">Transacciones</h3>
                  <div className="inner-cards">
                    <div className="transaction-table-container">
                      <div className='datos_transacciones'>
                        <p className='text_dato' style={{width: '40px'}}>LADO</p>
                        <p className='text_dato' style={{width: '40px'}}>T.PAGO</p>
                        <p className='text_dato' style={{width: '40px'}}>IMPUESTO</p>
                        <p className='text_dato' style={{width: '60px'}}>PLACA</p>
                        <p className='text_dato' style={{width: '50px'}}>T.PUNTOS</p>
                        <p className='text_dato' style={{width: '80px'}}>CLIENTE ID</p>
                        <p className='text_dato' style={{width: '80px'}}>RUC</p>
                        <p className='text_dato' style={{width: '120px'}}>RAZÓN SOCIAL</p>
                        <p className='text_dato' style={{width: '120px'}}>DIRECCIÓN</p>
                        <p className='text_dato' style={{width: '50px'}}>TARJ. NDESPACHO</p>
                        <p className='text_dato' style={{width: '50px'}}>TARJ. CREDITO</p>
                        <p className='text_dato' style={{width: '50px'}}>NRO. OPE.</p>
                        <p className='text_dato' style={{width: '80px'}}>OBSERVACIÓN</p>
                        <p className='text_dato' style={{width: '50px'}}>KILOMETRAJE</p>
                        <p className='text_dato' style={{width: '70px'}}>EFECTIVO</p>
                        <p className='text_dato' style={{width: '70px'}}>SALDO CREDITO</p>
                        <p className='text_dato' style={{width: '70px'}}>PTOS. DISPONIBLES</p>
                      </div>

                      {detalleVentaList.map((detalleVenta, index) => (
                        <div className='datosP_transacciones'>
                          <p className='text_datoP' style={{width: '40px'}}>{detalleVenta.cara}</p>
                          <p className='text_datoP' style={{width: '40px'}}>{detalleVenta.tipoPago}</p>
                          <p className='text_datoP' style={{width: '40px'}}>{detalleVenta.impuesto}</p>
                          <p className='text_datoP' style={{width: '60px'}}>{detalleVenta.nroPlaca}</p>
                          <p className='text_datoP' style={{width: '50px'}}>{detalleVenta.tarjetaPuntos}</p>
                          <p className='text_datoP' style={{width: '80px'}}>{detalleVenta.clienteID}</p>
                          <p className='text_datoP' style={{width: '80px'}}>{detalleVenta.clienteRUC}</p>
                          <p className='text_datoP' style={{width: '120px'}}>{detalleVenta.clienteRS}</p>
                          <p className='text_datoP' style={{width: '120px'}}>{detalleVenta.clienteDR}</p>
                          <p className='text_datoP' style={{width: '50px'}}>{detalleVenta.tarjetaND}</p>
                          <p className='text_datoP' style={{width: '50px'}}>{detalleVenta.tarjetaCredito}</p>
                          <p className='text_datoP' style={{width: '50px'}}>{detalleVenta.operacionREF}</p>
                          <p className='text_datoP' style={{width: '80px'}}>{detalleVenta.observacion}</p>
                          <p className='text_datoP' style={{width: '50px'}}>{detalleVenta.kilometraje}</p>
                          <p className='text_datoP' style={{width: '70px'}}>{detalleVenta.montoSoles}</p>
                          <p className='text_datoP' style={{width: '70px'}}>{detalleVenta.mtoSaldoCredito}</p>
                          <p className='text_datoP' style={{width: '70px'}}>{detalleVenta.ptosDisponible}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modal Libre*/}
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
                    <Button variant="contained" color="secondary" style={{ backgroundColor: '#ff2b2b' }} onClick={handleModalLibreClose}>Cancelar</Button>
                    <Button variant="contained" color="primary" onClick={handleSubmitLibre}>Aceptar</Button>
                  </DialogActions>
                </Dialog>
                
                {/* Modal Soles*/}
                <Dialog open={isModalSolesOpen} onClose={handleModalSolesClose}>

                  <DialogTitle>Soles</DialogTitle>

                    <DialogContent>

                    {(errorSoles ) && (
                    <div className={`floating-alertErrorInput ${errorSoles ? 'show' : ''}`}>
                        {errorSoles && <p className="alert-errorInput">{errorSoles}</p>}
                      </div>
                    )}

                      <TextField type="text" className='campo_input' value={inputSoles} onChange={handleSolesChange} margin="normal" label="Monto Soles" fullWidth
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
                    <Button variant="contained" color="secondary" style={{ backgroundColor: '#ff2b2b' }} onClick={handleModalSolesClose}>Cancelar</Button>
                    <Button variant="contained" color="primary" onClick={handleSubmit} >Aceptar</Button>
                  </DialogActions>

                </Dialog>
                
                {/* Modal Galones*/}
                <Dialog open={isModalGalonesOpen} onClose={handleModalGalonesClose}>

                  <DialogTitle>Galones</DialogTitle>

                    <DialogContent>

                    {(errorGalones ) && (
                    <div className={`floating-alertErrorInput ${errorGalones ? 'show' : ''}`}>
                        {errorGalones && <p className="alert-errorInput">{errorGalones}</p>}
                      </div>
                    )}

                      <TextField type="text" className='campo_input' value={inputGalones} onChange={handleGalonesChange} margin="normal" label="Cantidad de Galones" fullWidth
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
                    <Button variant="contained" color="secondary" style={{ backgroundColor: '#ff2b2b' }} onClick={handleModalGalonesClose}>Cancelar</Button>
                    <Button variant="contained" color="primary" onClick={handleSubmitGalones} >Aceptar</Button>
                  </DialogActions>

                </Dialog>

                {/* Modal Boleta*/}
                <Dialog open={isModalBoletaOpen} onClose={handleModalBoletaClose} >

                  <DialogTitle>Boleta</DialogTitle>

                    <DialogContent>

                      {(errorPlaca || errorDNI ||   errorNombre ) && (
                      <div className={`floating-alertErrorInput ${errorPlaca ? 'show' : ''} ${errorDNI ? 'show' : ''}  ${errorNombre ? 'show' : ''} `}>
                          {errorPlaca && <p className="alert-errorInput">{errorPlaca}</p>}
                          {errorDNI && <p className="alert-errorInput">{errorDNI}</p>}
                          {errorNombre && <p className="alert-errorInput">{errorNombre}</p>}
                        </div>
                      )}

                        <TextField type="text" className='campo_input' defaultValue={inputPlaca} onChange={handlePlacaChange} margin="normal" label="Ingresar N° de Placa" fullWidth />  
                        
                        <div className='cont_campos'>
                          <div className='cont_Tcampos'>
                            <TextField type="text" className='campo_input' value={inputDNI} onChange={handleDNIChange} margin="normal" label="Ingresar DNI" fullWidth /> 
                            <p className="character-count">{DNICharacterCount}/8</p>
                          </div>
                          <button className='btn_cards'  onClick={handleSubmitReniec} >RENIEC</button>
                        </div>

                        <TextField type="text" className='campo_input' value={inputNombre} onChange={handleNombreChange} margin="normal" label="Ingresar Nombre" fullWidth /> 
                        <p className="character-count">{NombreCharacterCount}</p>
                        
                        <TextField type="text" className='campo_input' value={inputDireccion} onChange={handleDireccionChange} margin="normal" label="Ingresar Dirección" fullWidth /> 
                        
                        <TextField type="text" className='campo_input' value={inputObservacion} onChange={handleObservacionChange} margin="normal" label="Ingresar Observación" fullWidth /> 

                        <p className='fpago_text' >Forma de Pago:</p>

                        <RadioGroup
                          aria-label="Opciones"
                          name="opciones"
                          value={selectedOption}
                          onChange={handleOptionChange} >

                          <FormGroup row style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>

                            <FormControlLabel
                              value="Efectivo"
                              control={<Radio />}
                              label="Efectivo"
                            />
                            <FormControlLabel
                              value="Tarjeta"
                              control={<Radio />}
                              label="Tarjeta"
                            />
                            <FormControlLabel
                              value="Credito"
                              control={<Radio />}
                              label="Credito"
                            />

                          </FormGroup>
                        
                        </RadioGroup>

                        {selectedOption === 'Efectivo' && (
                          <>
                            <div className='inf_pagoefectivo'>
                              <p className='inf_text'>Se realizara el modo de Pago en Efectivo</p>
                            </div>
                          </>  
                        )}

                        {selectedOption === 'Tarjeta' && (
                          <>
                            {(errorNOperacion || errorPagoEfectivo) && (
                              <div className={`floating-alertErrorInput ${errorNOperacion ? 'show' : ''}  ${errorPagoEfectivo ? 'show' : ''} `}>
                                  {errorNOperacion && <p className="alert-errorInput">{errorNOperacion}</p>}
                                  {errorPagoEfectivo && <p className="alert-errorInput">{errorPagoEfectivo}</p>}
                              </div>
                            )}

                            <FormControl variant="outlined" fullWidth>
                              <InputLabel htmlFor="outlined-age-native-simple">Seleccion Tipo de Pago</InputLabel>
                              <Select native value={selectedOptionFPago} onChange={handleOptionChangeFPago} label="Seleccion Tipo de Pago">

                                {formaPago.map((formapagos, index) => (
                                  <option key={index} value={formapagos.cardId} >{formapagos.names}</option>                      
                                ))}
                            
                              </Select>
                            </FormControl>
                          
                            <TextField 
                              type="text"
                              className="campo_input"
                              value={inputNOperacion}
                              onChange={handleNOperacionChange}
                              margin="normal"
                              label="Ingresar N° de Operación"
                              fullWidth/>

                            <TextField
                              type="text"
                              className="campo_input"
                              value={inputPagoEfectivo}
                              onChange={handlePagoEfectivoChange}
                              margin="normal"
                              label="Ingresar Pago Efectivo"
                              fullWidth/>

                          </>
                        )}

                        {selectedOption === 'Credito' && (
                          <>
                            {( errorPagoEfectivo) && (
                              <div className={`floating-alertErrorInput ${errorPagoEfectivo ? 'show' : ''} `}>
                                  {errorPagoEfectivo && <p className="alert-errorInput">{errorPagoEfectivo}</p>}
                              </div>
                            )}
                            <TextField
                              type="text"
                              className="campo_input"
                              value={inputPagoEfectivo}
                              onChange={handlePagoEfectivoChange}
                              margin="normal"
                              label="Ingresar Pago Efectivo"
                              fullWidth/>
                          </>
                        )}

                      {showAlertSuccess && (
                        <div className={`floating-alertSuccess ${showAlertSuccess ? 'show' : ''}`}>
                          <p className="alert-success">Se guardó correctamente</p>
                        </div>
                      )}
                    </DialogContent>

                  <DialogActions>
                    <button variant="contained" color="secondary" className='btn_cards' style={{ backgroundColor: 'rgb(34 228 232)' }} onClick={handleSubmitBoletaSimple}>Simple</button>
                    <button variant="contained" color="secondary" className='btn_cards' style={{ backgroundColor: 'rgb(255, 43, 43)' }} onClick={handleModalBoletaClose}>Cancelar</button>
                    <button variant="contained" color="primary"  className='btn_cards' onClick={handleSubmitBoleta} >Aceptar</button>
                  </DialogActions>

                </Dialog>

                 {/* Modal Factura*/}
                 <Dialog open={isModalFacturaOpen} onClose={handleModalFacturaClose} >

                  <DialogTitle>Factura</DialogTitle>

                    <DialogContent>

                      {(errorPlaca || errorRUC ||   errorRSocial ) && (
                      <div className={`floating-alertErrorInput ${errorPlaca ? 'show' : ''} ${errorRUC ? 'show' : ''}  ${errorRSocial ? 'show' : ''} `}>
                          {errorPlaca && <p className="alert-errorInput">{errorPlaca}</p>}
                          {errorRUC && <p className="alert-errorInput">{errorRUC}</p>}
                          {errorRSocial && <p className="alert-errorInput">{errorRSocial}</p>}
                        </div>
                      )}

                        <TextField type="text" className='campo_input' defaultValue={inputPlaca} onChange={handlePlacaChange} margin="normal" label="Ingresar N° de Placa" fullWidth />  

                        <div className='cont_campos'>
                          <div className='cont_Tcampos'>
                            <TextField type="text" className='campo_input' value={inputRUC} onChange={handleRUCChange} margin="normal" label="Ingresar RUC" fullWidth /> 
                            <p className="character-count">{RUCCharacterCount}/11</p>
                          </div>
                          <button className='btn_cards'  onClick={handleSubmitSunat} >SUNAT</button>
                        </div>

                        <TextField type="text" className='campo_input' value={inputRSocial} onChange={handleRSocialChange} margin="normal" label="Ingresar Razón Social" fullWidth /> 
                        <p className="character-count">{RSocialCharacterCount}</p>
                        
                        <TextField type="text" className='campo_input' value={inputDireccion} onChange={handleDireccionChange} margin="normal" label="Ingresar Dirección" fullWidth /> 
                        
                        <TextField type="text" className='campo_input' value={inputObservacion} onChange={handleObservacionChange} margin="normal" label="Ingresar Observación" fullWidth /> 

                        <p className='fpago_text' >Forma de Pago:</p>

                        <RadioGroup
                          aria-label="Opciones"
                          name="opciones"
                          value={selectedOption}
                          onChange={handleOptionChange} >

                          <FormGroup row style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>

                            <FormControlLabel
                              value="Efectivo"
                              control={<Radio />}
                              label="Efectivo"
                            />
                            <FormControlLabel
                              value="Tarjeta"
                              control={<Radio />}
                              label="Tarjeta"
                            />
                            <FormControlLabel
                              value="Credito"
                              control={<Radio />}
                              label="Credito"
                            />

                          </FormGroup>
                        
                        </RadioGroup>

                        {selectedOption === 'Efectivo' && (
                          <>
                            <div className='inf_pagoefectivo'>
                              <p className='inf_text'>Se realizara el modo de Pago en Efectivo</p>
                            </div>
                          </>  
                        )}

                        {selectedOption === 'Tarjeta' && (
                          <>
                            {(errorNOperacion || errorPagoEfectivo) && (
                              <div className={`floating-alertErrorInput ${errorNOperacion ? 'show' : ''}  ${errorPagoEfectivo ? 'show' : ''} `}>
                                  {errorNOperacion && <p className="alert-errorInput">{errorNOperacion}</p>}
                                  {errorPagoEfectivo && <p className="alert-errorInput">{errorPagoEfectivo}</p>}
                              </div>
                            )}

                            <FormControl variant="outlined" fullWidth>
                              <InputLabel htmlFor="outlined-age-native-simple">Seleccion Tipo de Pago</InputLabel>
                              <Select native value={selectedOptionFPago} onChange={handleOptionChangeFPago} label="Seleccion Tipo de Pago">

                              {formaPago.map((formapagos, index) => (
                                <option key={index} value={formapagos.cardId}>{formapagos.names}</option>                      
                              ))}
                            
                              </Select>
                            </FormControl>
                            <TextField 
                              type="text"
                              className="campo_input"
                              value={inputNOperacion}
                              onChange={handleNOperacionChange}
                              margin="normal"
                              label="Ingresar N° de Operación"
                              fullWidth/>

                            <TextField
                              type="text"
                              className="campo_input"
                              value={inputPagoEfectivo}
                              onChange={handlePagoEfectivoChange}
                              margin="normal"
                              label="Ingresar Pago Efectivo"
                              fullWidth/>

                          </>
                        )}

                        {selectedOption === 'Credito' && (
                          <>
                            {( errorPagoEfectivo) && (
                              <div className={`floating-alertErrorInput ${errorPagoEfectivo ? 'show' : ''} `}>
                                  {errorPagoEfectivo && <p className="alert-errorInput">{errorPagoEfectivo}</p>}
                              </div>
                            )}
                            <TextField
                              type="text"
                              className="campo_input"
                              value={inputPagoEfectivo}
                              onChange={handlePagoEfectivoChange}
                              margin="normal"
                              label="Ingresar Pago Efectivo"
                              fullWidth/>
                          </>
                        )}

                      {showAlertSuccess && (
                        <div className={`floating-alertSuccess ${showAlertSuccess ? 'show' : ''}`}>
                          <p className="alert-success">Se guardó correctamente</p>
                        </div>
                      )}
                    </DialogContent>

                  <DialogActions>
                    <button variant="contained" color="secondary" className='btn_cards' style={{ backgroundColor: '#ff2b2b' }} onClick={handleModalFacturaClose}>Cancelar</button>
                    <button color="primary"  className='btn_cards'  onClick={handleSubmitFactura} >Aceptar</button>
                  </DialogActions>

                  </Dialog>
          
                {/* Modal Serafin*/}
                <Dialog open={isModalSerafinOpen} onClose={handleModalSerafinClose}>
                  <DialogTitle>Serafin</DialogTitle>
                  <DialogContent>
                    <p>¿Desea generar Serafín?</p>
                  </DialogContent>

                  {showAlertSuccess && (
                      <div className={`floating-alertSuccess ${showAlertSuccess ? 'show' : ''}`}>
                        <p className="alert-success">Se genero correctamente</p>
                      </div>
                    )}
                  <DialogActions>
                    <Button variant="contained" color="secondary" style={{ backgroundColor: '#ff2b2b' }} onClick={handleModalSerafinClose}>Cancelar</Button>
                    <Button variant="contained" color="primary" onClick={handleSubmitSerafin}>Aceptar</Button>
                  </DialogActions>
                </Dialog>
          </div>
      </div>   
    </div>
    
  );
};

export default Home;