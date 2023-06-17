import React, { useState } from 'react';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const Home = () => {

  const [filtroLado, setFiltroLado] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedManguera, setSelectedManguera] = useState(null); // Nuevo estado para mantener el índice de la manguera seleccionada


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
  };

  const handleMangueraClick = manguera => {
    setSelectedManguera(manguera);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  

  return (
    <div>

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

        {/* Campo de Modalidad*/}
        <div className="card">
            <h3 className="inner-title">Modalidad</h3>
            <div className="inner-cards">
                <button className='btn_cards' onClick={handleModalOpen}>LIBRE</button>
                <button className='btn_cards'>SOLES</button>
                <button className='btn_cards'>GALONES</button>
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

        <Dialog open={isModalOpen} onClose={handleModalClose}>
          <DialogTitle>Libre</DialogTitle>
          <DialogContent>
            <p>¿Desea activar el modo LIBRE?</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleModalClose}>Cancelar</Button>
            <Button >Aceptar</Button>
          </DialogActions>
        </Dialog>
    </div>
  );
};

export default Home;