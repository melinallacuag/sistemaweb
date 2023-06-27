import React, { useRef,useState } from 'react';
import { useReactToPrint } from 'react-to-print';

class PrintableComponent extends React.Component {
  render() {
    const { name, age, address } = this.props;
    return (
      <div>
        {/* Contenido que deseas imprimir */}
        <h1>Contenido imprimible</h1>
       
        <p>Nombre: {name}</p>
        <p>Edad: {age}</p>
        <p>Dirección: {address}</p>
      </div>
    );
  }
}

// Componente de botón de impresión
const PrintButton = ({ componentRef }) => {
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });
  
    return <button onClick={handlePrint}>Imprimir</button>;
  };

// Componente contenedor
const App = () => {

  const [name, setName] = useState('John Doe');
  const [age, setAge] = useState(30);
  const [address, setAddress] = useState('123 Main St');
  const componentRef = useRef();
  return (
    <div>

<PrintableComponent name={name} age={age} address={address} ref={componentRef} />
      <PrintButton componentRef={componentRef} />
    </div>
  );
};

export default App;