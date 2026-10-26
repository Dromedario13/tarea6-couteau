import React, { useEffect, useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonSpinner } from '@ionic/react';
import Pagina from '../components/Pagina';

interface Usuario {
  name: { first: string; last: string };
  dob: { date: string; age: number };
  picture: { large: string };
}

const Persona: React.FC = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  // Trae una persona aleatoria de randomuser.me
  const cargar = async () => {
    setCargando(true);
    setError('');
    try {
      const resp = await fetch('https://randomuser.me/api/?results=1');
      if (!resp.ok) throw new Error('HTTP ' + resp.status);
      const datos = await resp.json();
      setUsuario(datos.results[0]);
    } catch {
      setError('No se pudo cargar la persona');
    } finally {
      setCargando(false);
    }
  };

  // Cargar una persona al abrir la vista
  useEffect(() => {
    cargar();
  }, []);

  return (
    <Pagina titulo="Persona aleatoria">
      {cargando && (
        <div style={{ textAlign: 'center' }}>
          <IonSpinner />
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {usuario && !cargando && (
        <IonCard>
          <IonCardContent style={{ textAlign: 'center' }}>
            <img
              src={usuario.picture.large}
              alt="Foto"
              style={{ borderRadius: '50%', width: 150, height: 150 }}
            />
            <h2>Nombre: {usuario.name.first}</h2>
            <h2>Apellido: {usuario.name.last}</h2>
            <p>
              Fecha de nacimiento:{' '}
              {new Date(usuario.dob.date).toLocaleDateString('es-DO')}
            </p>
            <p>Edad: {usuario.dob.age} años</p>
          </IonCardContent>
        </IonCard>
      )}

      <IonButton expand="block" onClick={cargar} disabled={cargando}>
        Otra persona
      </IonButton>
    </Pagina>
  );
};

export default Persona;