import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

class PrintableComponent extends React.Component {
  render() {
    return (
      <div>
        {/* Contenido que deseas imprimir */}
        <h1>Contenido imprimible</h1>
        <p>Este es un ejemplo de contenido que se imprimirá.</p>
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

    const componentRef = useRef();
  return (
    <div>
      <PrintableComponent ref={componentRef} />
      <PrintButton componentRef={componentRef} />
    </div>
  );
};

export default App;