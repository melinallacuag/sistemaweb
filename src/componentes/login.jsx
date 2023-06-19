import React, {useState} from 'react';
import logo from '../imagen/logo_appsven.png';
import UniqueIdGenerator from './imei';
import { TextField, Button } from '@mui/material';
import Home from '../paginas/Home';

const Login = () => {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorUsername, setErrorUsername] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [authenticated, setAuthenticated] = useState(localStorage.getItem('authenticated') || false);
  
    const validateForm = () => {
      let isValid = true;
  
      // Validación de usuario
      if (username.trim() === '') {
        setErrorUsername('Ingresar usuario');
        isValid = false;
      } else if (username !== '11111118') {
        setErrorUsername('Usuario incorrecto');
        isValid = false;
      } else {
        setErrorUsername('');
      }
  
      // Validación de contraseña
      if (password.trim() === '') {
        setErrorPassword('Ingresar contraseña');
        isValid = false;
      } else if (password !== '1111') {
        setErrorPassword('Contraseña incorrecto');
        isValid = false;
      } else {
        setErrorPassword('');
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
          setSuccessMessage('');
          localStorage.setItem('authenticated', true);
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