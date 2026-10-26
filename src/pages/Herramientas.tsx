import React, { useState } from 'react';
import { IonText } from '@ionic/react';
import Pagina from '../components/Pagina';

const Herramientas: React.FC = () => {
  // Si la foto no existe, mostramos un aviso
  const [falloImagen, setFalloImagen] = useState(false);

  return (
    <Pagina titulo="Caja de herramientas">
      <div style={{ textAlign: 'center' }}>
        <h2>Couteau</h2>
        <p>Una app con varias herramientas en un solo lugar.</p>
        {falloImagen ? (
          <IonText color="danger">
            <p>Falta la foto: public/img/caja-herramientas.jpg</p>
          </IonText>
        ) : (
          <img
            src="/img/caja-herramientas.jpg"
            alt="Caja de herramientas"
            style={{ maxWidth: '100%', maxHeight: '60vh', borderRadius: 12 }}
            onError={() => setFalloImagen(true)}
          />
        )}
      </div>
    </Pagina>
  );
};

export default Herramientas;