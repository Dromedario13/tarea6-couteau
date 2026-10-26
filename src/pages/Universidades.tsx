import React, { useState } from 'react';
import {
  IonButton, IonCard, IonCardContent, IonCardHeader,
  IonCardTitle, IonInput, IonSpinner,
} from '@ionic/react';
import Pagina from '../components/Pagina';

interface Universidad {
  name: string;
  domains?: string[];
  web_pages?: string[];
}

const Universidades: React.FC = () => {
  const [pais, setPais] = useState('Dominican Republic');
  const [lista, setLista] = useState<Universidad[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [buscado, setBuscado] = useState(false);

  // Busca las universidades del pais (nombre en ingles)
  const buscar = async () => {
    const limpio = pais.trim();
    if (!limpio) {
      setError('Escribe el nombre de un pais en ingles');
      return;
    }
    setCargando(true);
    setError('');
    setLista([]);
    try {
      // Los espacios se mandan como "+" igual que en el ejemplo
      const q = encodeURIComponent(limpio).replace(/%20/g, '+');
      const resp = await fetch(`https://adamix.net/proxy.php?country=${q}`);
      if (!resp.ok) throw new Error('HTTP ' + resp.status);
      const datos = await resp.json();
      // Aceptamos tanto un arreglo directo como un objeto con "data"
      const arreglo: Universidad[] = Array.isArray(datos) ? datos : datos.data ?? [];
      setLista(arreglo);
      setBuscado(true);
    } catch {
      setError('No se pudo consultar el API de universidades');
    } finally {
      setCargando(false);
    }
  };

  return (
    <Pagina titulo="Universidades">
      <IonInput
        label="Pais (en ingles)"
        labelPlacement="floating"
        fill="outline"
        placeholder="Ej: Dominican Republic"
        value={pais}
        onIonInput={(e) => setPais(String(e.detail.value ?? ''))}
      />
      <IonButton expand="block" style={{ marginTop: 16 }} onClick={buscar} disabled={cargando}>
        Buscar universidades
      </IonButton>

      {cargando && (
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <IonSpinner />
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {buscado && !cargando && lista.length === 0 && !error && (
        <p>No se encontraron universidades.</p>
      )}

      {lista.map((u, i) => (
        <IonCard key={i}>
          <IonCardHeader>
            <IonCardTitle style={{ fontSize: 18 }}>{u.name}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>Dominio: {u.domains?.join(', ') || 'N/D'}</p>
            {u.web_pages && u.web_pages.length > 0 && (
              <IonButton
                size="small"
                fill="outline"
                href={u.web_pages[0]}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visitar pagina web
              </IonButton>
            )}
          </IonCardContent>
        </IonCard>
      ))}
    </Pagina>
  );
};

export default Universidades;