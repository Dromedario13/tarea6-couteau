import React, { useEffect, useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonSpinner } from '@ionic/react';
import Pagina from '../components/Pagina';

interface DatosClima {
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };
  daily: {
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
  };
}

// Traduce el codigo WMO de Open-Meteo a texto en espanol
const descripcion = (codigo: number): string => {
  if (codigo === 0) return 'Despejado';
  if (codigo <= 2) return 'Parcialmente nublado';
  if (codigo === 3) return 'Nublado';
  if (codigo === 45 || codigo === 48) return 'Neblina';
  if (codigo >= 51 && codigo <= 57) return 'Llovizna';
  if (codigo >= 61 && codigo <= 67) return 'Lluvia';
  if (codigo >= 80 && codigo <= 82) return 'Aguaceros';
  if (codigo >= 95) return 'Tormenta electrica';
  return 'Variable';
};

const Clima: React.FC = () => {
  const [datos, setDatos] = useState<DatosClima | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  // Coordenadas de Santo Domingo, forecast_days=1 para el dia de hoy
  const cargar = async () => {
    setCargando(true);
    setError('');
    try {
      const url =
        'https://api.open-meteo.com/v1/forecast?latitude=18.4861&longitude=-69.9312' +
        '&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code' +
        '&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max' +
        '&timezone=America%2FSanto_Domingo&forecast_days=1';
      const resp = await fetch(url);
      if (!resp.ok) throw new Error('HTTP ' + resp.status);
      setDatos(await resp.json());
    } catch {
      setError('No se pudo cargar el clima');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const hoy = new Date().toLocaleDateString('es-DO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Pagina titulo="Clima en RD">
      <h3 style={{ textTransform: 'capitalize' }}>{hoy}</h3>
      <p>Santo Domingo, Republica Dominicana</p>

      {cargando && (
        <div style={{ textAlign: 'center' }}>
          <IonSpinner />
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {datos && !cargando && (
        <IonCard>
          <IonCardContent style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: 56, margin: 0 }}>
              {Math.round(datos.current.temperature_2m)}°C
            </h1>
            <h2>{descripcion(datos.current.weather_code)}</h2>
            <p>Sensacion termica: {Math.round(datos.current.apparent_temperature)}°C</p>
            <p>
              Maxima: {Math.round(datos.daily.temperature_2m_max[0])}°C | Minima:{' '}
              {Math.round(datos.daily.temperature_2m_min[0])}°C
            </p>
            <p>Probabilidad de lluvia: {datos.daily.precipitation_probability_max[0]}%</p>
            <p>Humedad: {datos.current.relative_humidity_2m}%</p>
            <p>Viento: {datos.current.wind_speed_10m} km/h</p>
          </IonCardContent>
        </IonCard>
      )}

      <IonButton expand="block" onClick={cargar} disabled={cargando}>
        Actualizar
      </IonButton>
    </Pagina>
  );
};

export default Clima;