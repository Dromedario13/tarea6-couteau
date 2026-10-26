import React, { useState } from 'react';
import { IonButton, IonInput, IonSpinner } from '@ionic/react';
import Pagina from '../components/Pagina';

interface Resultado {
  name: string;
  gender: string | null;
  probability: number;
  count: number;
}

const Genero: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [resultado, setResultado] = useState<Resultado | null>(null);

  // Consulta el API de genderize con el nombre escrito
  const predecir = async () => {
    const limpio = nombre.trim();
    if (!limpio) {
      setError('Escribe un nombre');
      return;
    }
    setCargando(true);
    setError('');
    setResultado(null);
    try {
      const resp = await fetch(
        `https://api.genderize.io/?name=${encodeURIComponent(limpio)}`
      );
      if (!resp.ok) throw new Error('HTTP ' + resp.status);
      setResultado(await resp.json());
    } catch {
      setError('No se pudo consultar el API');
    } finally {
      setCargando(false);
    }
  };

  // Azul si es masculino, rosa en cualquier otro caso
  const masculino = resultado?.gender === 'male';
  const color = masculino ? '#2196f3' : '#f48fb1';
  const etiqueta = masculino ? 'Masculino' : resultado?.gender === 'female' ? 'Femenino' : 'Desconocido';

  return (
    <Pagina titulo="Predecir genero">
      <IonInput
        label="Nombre"
        labelPlacement="floating"
        fill="outline"
        placeholder="Ej: Irma"
        value={nombre}
        onIonInput={(e) => setNombre(String(e.detail.value ?? ''))}
      />
      <IonButton expand="block" style={{ marginTop: 16 }} onClick={predecir} disabled={cargando}>
        Predecir
      </IonButton>

      {cargando && (
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <IonSpinner />
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {resultado && (
        <div
          style={{
            marginTop: 24,
            padding: 32,
            minHeight: '30vh',
            borderRadius: 16,
            background: color,
            color: 'white',
            textAlign: 'center',
          }}
        >
          <h1>{etiqueta}</h1>
          <p>Nombre: {resultado.name}</p>
          <p>Probabilidad: {Math.round(resultado.probability * 100)}%</p>
        </div>
      )}
    </Pagina>
  );
};

export default Genero;