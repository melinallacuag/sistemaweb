import React, {useState} from 'react';
import logo from '../imagen/logo_appsven.png';
import UniqueIdGenerator from './imei';
import { TextField, Button } from '@mui/material';
import Home from '../paginas/Home';
import { v4 as uuidv4 } from 'uuid';

const Login = () => {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorUsername, setErrorUsername] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [authenticated, setAuthenticated] = useState(localStorage.getItem('authenticated') || false);

    const users = [
      {
        userID: '11111118',
        password: '784',
        identFID: 'B32809099EBCF35B',
        names: 'CAJERO1',
        phone: '',
        mail: '',
        locked: true,
        cancel: true
      },
      {
        userID: '11111119',
        password: '784',
        identFID: 'B32809099EBCF35C',
        names: 'CAJERO2',
        phone: '',
        mail: '',
        locked: false,
        cancel: false
      },
      {
        userID: '20593088',
        password: '784',
        identFID: '',
        names: 'TITO GALDOS TALAVERANO',
        phone: '',
        mail: '',
        locked: true,
        cancel: false
      }
    ];

    const terminal = [
      {
        terminalID: 'PUNTO1',
        imei: 'ebdc4a14802443f2',
        fecha_Proceso:'23/06/2023',
        turno: '01'
      },
      {
        terminalID: 'PUNTO2',
        imei: '07c179609cb5443f2',
        fecha_Proceso:'24/05/2023',
        turno: '02'
      },
      {
        terminalID: 'PUNTO3',
        imei: '07c179609cb5443f1',
        fecha_Proceso:'24/05/2023',
        turno: '03'
      }
    ];

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

        if (username.trim() === '') {
          setErrorUsername('Ingresar usuario');
          isValid = false;
        }else {
          const user = users.find(user => user.userID === username);
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
          const passwords = users.find(passwords => passwords.password === checkPassword(password));
          if(!passwords){
            setErrorPassword('Contraseña incorrecto');
            isValid = false;
          } else{
            setErrorPassword('');
          }
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

          let uniqueId = localStorage.getItem('uniqueId');

          if (!uniqueId) {
            uniqueId = uuidv4().replace(/-/g, '').substring(0, 16);
            localStorage.setItem('uniqueId', uniqueId);
          }
          setSuccessMessage('');
          const authenticatedUser = users.find(user => user.userID === username);
          localStorage.setItem("authenticated", JSON.stringify(authenticatedUser));

          const authenticatedTerminal = terminal.find((terminals) => terminals.imei === uniqueId);
          localStorage.setItem('authenticated',JSON.stringify(authenticatedTerminal) );

         // localStorage.setItem('authenticated', true);
          setAuthenticated(true);
        }, 3000);
      }
    };
  
    const usernameCharacterCount = username.length;
    const passwordCharacterCount = password.length;
  
    if (authenticated) {
      return <Home />;
    }
  
    return (
        <div className="App">
            <header className="App-header">
                <div className="login-container">

                    <img src={logo} className="App-logo" alt="logo" />

                    <h2 className="App-titulo" gutterBottom> INICIAR SESIÓN </h2>
        
                    <form onSubmit={handleSubmit} className="App-formulario">

                        {(errorUsername || errorPassword) && (
                            <div className="error-container">
                            {errorUsername && <p className="error-message">{errorUsername}</p>}
                            {errorPassword && <p className="error-message">{errorPassword}</p>}
                            </div>
                        )}
            
                        <TextField
                            type="text"
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

                        <p className="App-IMEI" gutterBottom><UniqueIdGenerator /></p>
            
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