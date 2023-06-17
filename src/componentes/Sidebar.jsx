import React, { useState } from 'react';

import logo from '../imagen/logo_appsven.png';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';

const Sidebar = ({ isOpen }) => {


  return (
    <div>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>

        <div className='contenedor_logo'>
           <img src={logo} className="App-logo" alt="logo" />
        </div>
  
        <ul className='sidebar_ul'>

          <hr class="sidebar-divider my-0"></hr>
            <li className='sidebar_li activo'>
              <a href="/" className='sidebar_menu'>
              <LocalGasStationIcon className='sidebar_icon'/>
                  <span>Home</span>
                  
              </a>
            </li>

          <hr class="sidebar-divider my-0"></hr>

            <div class="sidebar-heading"> Interface </div>

            <li className='sidebar_li'>
              <a href="/about" className='sidebar_menu'>
              <LocalGasStationIcon className='sidebar_icon'/>
              <span>About</span>
              </a>
            </li>

            <li className='sidebar_li'>
              <a href="/contact" className='sidebar_menu'>
              <LocalGasStationIcon className='sidebar_icon'/>
              <span>Contact</span></a>
            </li>

          <hr class="sidebar-divider my-0"></hr>

        </ul>

      </div>
    </div>
  );
};

export default Sidebar;