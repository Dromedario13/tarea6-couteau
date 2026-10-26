import React, { useEffect, useState } from 'react';
import {
  IonButton, IonCard, IonCardContent, IonCardHeader,
  IonCardTitle, IonSpinner,
} from '@ionic/react';
import Pagina from '../components/Pagina';

// Sitio WordPress que se usa (el mismo que se publica en el foro)
const SITIO = 'https://wptavern.com';

interface Noticia {
  id: number;
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string };
}

interface InfoSitio {
  name?: string;
  site_icon_url?: string;
}

// Quita etiquetas HTML y decodifica entidades (&amp;, &#8217;, etc.)
const aTexto = (html: string): string => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return (doc.body.textContent ?? '').trim();
};

const Noticias: React.FC = () => {
  const [info, setInfo] = useState<InfoSitio | null>(null);
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const cargar = async () => {
    setCargando(true);
    setError('');
    try {
      // Ultimas 3 noticias publicadas
      const resp = await fetch(`${SITIO}/wp-json/wp/v2/posts?per_page=3`);
      if (!resp.ok) throw new Error('HTTP ' + resp.status);
      setNoticias(await resp.json());

      // Nombre e icono del sitio (si falla, simplemente no se muestra el logo)
      try {
        const r2 = await fetch(`${SITIO}/wp-json`);
        if (r2.ok) setInfo(await r2.json());
      } catch {
        // sin logo
      }
    } catch {
      setError('No se pudieron cargar las noticias');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <Pagina titulo="Noticias WordPress">
      <div style={{ textAlign: 'center' }}>
        {info?.site_icon_url && (
          <img src={info.site_icon_url} alt="Logo" style={{ width: 96, height: 96 }} />
        )}
        <h2>{info?.name ?? SITIO.replace('https://', '')}</h2>
      </div>

      {cargando && (
        <div style={{ textAlign: 'center' }}>
          <IonSpinner />
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {noticias.map((n) => (
        <IonCard key={n.id}>
          <IonCardHeader>
            <IonCardTitle style={{ fontSize: 18 }}>{aTexto(n.title.rendered)}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>{aTexto(n.excerpt.rendered)}</p>
            <IonButton size="small" href={n.link} target="_blank" rel="noopener noreferrer">
              Visitar
            </IonButton>
          </IonCardContent>
        </IonCard>
      ))}
    </Pagina>
  );
};

export default Noticias;