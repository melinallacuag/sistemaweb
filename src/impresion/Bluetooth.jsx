import React, { useEffect, useState } from 'react';

const BluetoothDeviceSelection = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if ('bluetooth' in navigator) {
      return () => {
        navigator.bluetooth.removeEventListener('advertisementreceived', handleDeviceDiscovered);
      };
    } else {
      console.error('Bluetooth no es compatible con este navegador.');
    }
  }, []);

  const startDeviceSearch = async () => {
    setIsSearching(true);
    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
      });
      setSelectedDevice(device);
      setIsSearching(false);
    } catch (error) {
      console.error('Error al buscar dispositivos Bluetooth:', error);
      setIsSearching(false);
    }
  };

  const handleDeviceDiscovered = (event) => {
    const newDevice = event.device;
    setDevices((prevDevices) => [...prevDevices, newDevice]);
  };

  const handleDeviceSelect = (device) => {
    setSelectedDevice(device);
  };

  const connectToDevice = async () => {
    if (selectedDevice) {
      try {
        const server = await selectedDevice.gatt.connect();
        console.log('Conexión establecida con éxito.', server);
      } catch (error) {
        console.error('Error al conectar con el dispositivo Bluetooth:', error);
      }
    }
  };

  return (
    <div>
      <h2>Selección de Dispositivo Bluetooth</h2>
      {isSearching ? (
        <p>Buscando dispositivos Bluetooth...</p>
      ) : (
        <button onClick={startDeviceSearch}>Buscar dispositivos</button>
      )}
      {devices.length > 0 ? (
        <ul>
          {devices.map((device) => (
            <li key={device.id} onClick={() => handleDeviceSelect(device)}>
              {device.name || 'Dispositivo '}
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron dispositivos Bluetooth.</p>
      )}
      {selectedDevice && (
        <div>
          <p>Dispositivo seleccionado: {selectedDevice.name}</p>
          <button onClick={connectToDevice}>Conectar</button>
        </div>
      )}
    </div>
  );
};

export default BluetoothDeviceSelection;