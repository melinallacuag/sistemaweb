import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const PrintableComponent = React.forwardRef((props, ref) => {
  return (
    /*<div ref={ref} style={{ width: '3.125in', height: '230ft', border: '1px solid #ccc', padding: '10px' }}>
      <h1 style={{ fontSize: '20px', marginBottom: '10px' }}>SERVICENTRO ROBLES E.I.R.L.</h1>
      <p style={{ fontSize: '16px', lineHeight: '1.5', marginBottom: '5px' }}>PRINCIPAL: AV. SAN BORJA SUR NRO. 810 SAN BORJA-LIMA-LIMA</p>
      <p style={{ fontSize: '16px', lineHeight: '1.5', marginBottom: '5px' }}>SUCURSAL: AV. CORONEL PARRA 1239 PILCOMAYO-HUANCAYO-JUNIN</p>
      <p style={{ fontSize: '16px', lineHeight: '1.5', marginBottom: '5px' }}>RUC:20610082093</p>
      <p style={{ fontSize: '16px', lineHeight: '1.5', marginBottom: '5px' }}>BOLETA DE VENTA ELECTRONICA</p>
      <p style={{ fontSize: '16px', lineHeight: '1.5', marginBottom: '5px' }}>B507-0000053</p>
    </div>*/


    <div ref={ref} style={{ width: '2.800in', height: '230ft', border: '1px solid #ccc', padding: '10px' }}>

      <table align="center" class="trc text-center">
        <tbody>

        <tr>
            <td>
              <img src="http://localhost:3000/static/media/logo_appsven.ce52f545724b791a7d5b.png" alt="" className='logo' />
            </td>
          </tr>

          <tr>
            <td>
              <b>SERVICENTRO ROBLES E.I.R.L.</b>
            </td>
          </tr>
          <tr>
            <td>
              <b>PRINCIPAL: AV. SAN BORJA SUR NRO. 810 SAN BORJA-LIMA-LIMA</b>
            </td>
          </tr>
          <tr>
            <td>
              <b>SUCURSAL: AV. CORONEL PARRA 1239 PILCOMAYO-HUANCAYO-JUNIN</b>
            </td>
          </tr>
          <tr>
            <td>
              <b>RUC:20610082093</b>
            </td>
          </tr>
          <tr>
            <td>
              <b>BOLETA DE VENTA ELECTRONICA</b> 
            </td>
          </tr>
          <tr>
            <td>
              <b>B507-0000053</b>   
            </td>
          </tr>
          <tr>
            <td ><div class="linea"></div></td>
          </tr>
        </tbody>
      </table>

      <table align="center" class="trc text-left">
        <tbody>
          <tr>
            <td> <b>FechaHora:</b> </td>
            <td>28/06/2023 11:44:14 </td>
          </tr>
          <tr>
            <td> <b>Cajero:</b> </td>
            <td>CAJERO1</td>
          </tr>
          <tr>
            <td> <b>Lado :</b> </td>
            <td>01</td>
          </tr>
          <tr>
            <td> <b>Nro. Placa :</b> </td>
            <td>000-0000</td>
          </tr>
          <tr>
            <td> <b>DNI:</b> </td>
            <td>00497827</td>
          </tr>
          <tr>
            <td> <b>Nombres:</b> </td>
            <td>MENNDOZA MARIACA EFRAIN WILBER</td>
          </tr>
          <tr>
            <td> <b>Dirección:</b> </td>
            <td>JR. ALAN GARCIA 128 - EL TAMBO</td>
          </tr>
        
        </tbody>
        </table>


      <table  align="justify" className='trc text-left'>
        <tbody>
        <tr>
            <td ><div class="linea"></div></td>
          </tr>
          <tr className='clm-trc'>

            <td><b>PRODUCTO</b></td>
          
            <td><b>U/MED</b></td>
          
            <td><b>PRECIO</b></td>

            <td><b>CANTIDAD</b></td>
          
            <td><b>IMPORTE</b></td>
          </tr>
          <tr>
            <td ><div class="linea"></div></td>
          </tr>
        </tbody>
      </table>

      <table  align="justify" className='trc text-JUSTIFY'>
        <tbody>
    
          <tr className='clm-trcS'>

            <td width="200px" className='text-left'>GASOHOL REGULAR</td>
          
       
          </tr>
       
        </tbody>
      </table>
      <table  align="justify" className='trc text-JUSTIFY'>
        <tbody>
    
          <tr className='clm-trcS'>

          <td width="40px" ></td>
            <td width="30px" className='text-left'>GLL</td>
          
            <td width="40px">15.79</td>

            <td width="40px">0.760</td>
          
            <td width="40px" className='text-RIGHT'>12.00</td>

          </tr>
          <tr>
            <td ><div class="linea"></div></td>
          </tr>
        </tbody>
      </table>

      <table  align="justify" className='trc text-JUSTIFY'>
        <tbody>
    
          <tr className='clm-trcS'>

            <td width="200px" className='text-RIGHT'><b>TOTAL VENTA: </b> </td>
          
            <td width="45px" className='text-RIGHT'>12.00</td>

          </tr>
          <tr>
            <td ><div class="linea"></div></td>
          </tr>
        </tbody>
      </table>
      <table  align="justify" className='trc text-JUSTIFY'>
        <tbody>
        <tr className='clm-trcS'>
          <td width="200px" className='text-left'><b>CONDICION DE PAGO:</b>  </td>
        </tr>
          <tr className='clm-trcS'>

            <td width="200px" className='text-RIGHT'><b>CONTADO:</b>  </td>
          
            <td width="45px" className='text-RIGHT'>12.00</td>

          </tr>

          <tr className='clm-trcS'>
          <td width="200px" className='text-left'><b>SON:</b> DOCE CON 0/100 SOLES </td>
        </tr>
        <tr>
          <td>
            <img className='logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/800px-QR_code_for_mobile_English_Wikipedia.svg.png" alt="" />
          </td>
        </tr>
         
        </tbody>
      </table>


      

      <table align="center" width="280px" class="trc text-left">
        <tbody>
          <tr>
            <td class="trc">Autorizado mediante resolucion de SUperintendencia Nro. 203-2015 SUNAT. Representacion impresa de la boleta de Venta
            electronica.Consulte desde <br></br>  <b>http://4-fact.com/sven/auth/consulta</b></td>
          </tr>

        </tbody>
      </table>
    </div>
  );
});

const PrintButton = ({ componentRef }) => {
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return <button onClick={handlePrint}>Imprimir</button>;
};

const App = () => {
  const componentRef = useRef();

  return (
    <div>
      <PrintableComponent ref={componentRef} />
      <PrintButton componentRef={componentRef} />
    </div>
  );
};

export default App;