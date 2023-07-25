import React, {useState,useEffect } from 'react';
import logo from '../imagen/logo_appsven.png';
import { TextField, Button } from '@mui/material';
import Home from '../paginas/Home';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorUsername, setErrorUsername] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const [successMessage, setSuccessMessage] = useState('');
    const [authenticated, setAuthenticated] = useState(localStorage.getItem('authenticated') || false);

    const [users, setuser] = useState([]);
    
    const [terminal, setTerminal] = useState([]);
    const [errorImei, setErrorImei] = useState('');
    const idTerminal = localStorage.getItem('uniqueId') ? localStorage.getItem('uniqueId').toUpperCase() : '';

    useEffect(() => {

      //Listado de Usuarios
      axios.get('api/users/listado')
        .then((response) => {
          return response.data;
        })
        .then((articulos) => {
          setuser(articulos);
        })
        .catch((error) => {
          console.error(error);
        });

      //Listado de Terminal - IDTerminal
      axios.get(`api/terminal/listado/${idTerminal}`)
        .then((response) => {
          return response.data; 
        })
        .then((terminales) => {
          setTerminal(terminales);

          const terminal = terminales.find(terminales => terminales.imei === idTerminal.toUpperCase());

          if (terminal) {
            localStorage.setItem('terminalID', terminal.terminalID);
          // localStorage.setItem('imei', terminal.imei);
          }

       
        })
        .catch((error) => {
          console.error(error);
        });

    }, []);

    const checkPassword = (clave) => {

      let lResult = "";
      let lasc1 = "";
    
      let lValor = 0;
      let lTam = 0;
      let lCar = 0;
      let lasc2 = 0;
    
      lTam = clave.length;
    
      for(let lcont = 1 ; lcont <= lTam; lcont += 1){
    
          switch (lcont){
              case 1:
                  lCar = 1;
                  lasc1 = clave.substring(0,1);
                  lasc2 = lasc1.charCodeAt(0);
                  break;
              case 2:
                  lCar = 3;
                  lasc1 = clave.substring(1,2);
                  lasc2 = lasc1.charCodeAt(0);
                  break;
              case 3:
                  lCar = 5;
                  lasc1 = clave.substring(2,3);
                  lasc2 = lasc1.charCodeAt(0);
                  break;
              case 4:
                  lCar = 7;
                  lasc1 = clave.substring(3,4);
                  lasc2 = lasc1.charCodeAt(0);
                  break;
              case 5:
                  lCar = 9;
                  lasc1 = clave.substring(4,5);
                  lasc2 = lasc1.charCodeAt(0);
                  break;
              case 6:
                  lCar = 11;
                  lasc1 = clave.substring(5,6);
                  lasc2 = lasc1.charCodeAt(0);
                  break;
          }
    
          lValor = lValor + lasc2 * lCar;
    
      }
    
      lResult = String(lValor);
    
      return lResult;

    }
  
    const validateForm = () => {

      let isValid = true;

      // Validación de usuario
        if (username.trim() === '') {
          setErrorUsername('Ingresar usuario');
          isValid = false;
        }else {
          const user =  users.find(user => user.userID === username);
          if (!user) {
            setErrorUsername('Usuario incorrecto');
            isValid = false;
          } else if(user.locked == false){
            setErrorUsername('El usuario se encuentra bloqueado');
            isValid = false;
          } else {
            setErrorUsername('');
          }
        }

        // Validación de contraseña
        if (password.trim() === '') {
          setErrorPassword('Ingresar contraseña');
          isValid = false;
        }else{
          const hashedPassword = checkPassword(password);
          const passwords = users.find(passwords => passwords.password === hashedPassword);
          if(!passwords){
            setErrorPassword('Contraseña incorrecto');
            isValid = false;
          } else{
            setErrorPassword('');
          }
        }

        // Validación de Imei
        let uniqueId = localStorage.getItem('uniqueId');
        const imei = terminal.find(terminales => terminales.imei === uniqueId.toUpperCase());
        if(!imei){
          document.getElementById('uniqueId').style.color = "rgb(217 18 18)";
          setErrorImei('Terminal no configurado, comuníquese con el administrador.');
          isValid = false;
        }else{
          setErrorImei('');
        }
      
      return isValid;

    };
  
    const handleUsernameChange = (e) => {
      const value = e.target.value.replace(/\D/, '').slice(0, 10);
      setUsername(value);
      setErrorUsername('');
    };
  
    const handlePasswordChange = (e) => {
      const value = e.target.value.replace(/\D/, '').slice(0, 6);
      setPassword(value);
      setErrorPassword('');
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (validateForm()) {
        setSuccessMessage('Inicio de sesión exitoso');
        setTimeout(() => {

          const uniqueId = localStorage.getItem('uniqueId');

          if (!uniqueId) {
            uniqueId = uuidv4().replace(/-/g, '').substring(0, 16);
            localStorage.setItem('uniqueId', uniqueId);
          }

          const authenticatedTerminal = terminal.find(terminales => terminales.imei === uniqueId.toUpperCase());
          localStorage.setItem('authenticated',JSON.stringify(authenticatedTerminal) );
     

          const authenticatedUser = users.find(user => user.userID === username);
          localStorage.setItem("authenticatedUser", JSON.stringify(authenticatedUser));

         // localStorage.setItem('authenticated', true);
         setSuccessMessage('');
          setAuthenticated(true);
        }, 3000);
      }
    };
  
    const usernameCharacterCount = username.length;
    const passwordCharacterCount = password.length;
    const uniqueId = localStorage.getItem('uniqueId') || '';

    if (authenticated) {

      return <Home />;

    } return (
        <div className="App">
            <header className="App-header">
                <div className="login-container">

                    <img src={logo} className="App-logo" alt="logo" />

                    <h2 className="App-titulo" gutterBottom> INICIAR SESIÓN </h2>
        
                    <form onSubmit={handleSubmit} className="App-formulario">

                        {(errorUsername || errorPassword || errorImei) && (
                            <div className="error-container">
                            {errorUsername && <p className="error-message">{errorUsername}</p>}
                            {errorPassword && <p className="error-message">{errorPassword}</p>}
                            {errorImei && <p className="error-message">{errorImei}</p>}
                            </div>
                        )}
            
                        <TextField
                            type="number"
                            value={username}
                            onChange={handleUsernameChange}
                            margin="normal"
                            label="Usuario"
                            fullWidth
                        />

                        <p className="character-count">{usernameCharacterCount}/10</p>
            
                        <TextField
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            margin="normal"
                            label="Contraseña"
                            fullWidth
                        />
                        <p className="character-count">{passwordCharacterCount}/6</p>

                        <p className="App-IMEI" id='uniqueId' gutterBottom>{uniqueId}</p>
            
                        <Button variant="contained" color="primary" type="submit" fullWidth> Iniciar Sesión</Button>
            
                        {successMessage && (
                            <div className="success-container">
                                {successMessage && <p className="success-message">{successMessage}</p>}
                            </div>
                        )}

                    </form>
                </div>
            </header>
        </div>
    );
};
export default Login;