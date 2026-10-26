import React from 'react';
import { IonButton, IonCard, IonCardContent, IonIcon } from '@ionic/react';
import { call, logoGithub, mail } from 'ionicons/icons';
import Pagina from '../components/Pagina';

const AcercaDe: React.FC = () => (
  <Pagina titulo="Acerca de">
    <IonCard>
      <IonCardContent style={{ textAlign: 'center' }}>
        <img
          src="/img/foto.jpg"
          alt="Foto"
          style={{ width: 180, height: 180, borderRadius: '50%', objectFit: 'cover' }}
        />
        <h2>Daury De La Cruz Ubiera</h2>
        <p>Matricula: 2023-1993</p>
        <p>Estudiante de Ingenieria de Sistemas en ITLA</p>
        <p>Desarrollador de aplicaciones web y moviles. Disponible para posibles trabajos.</p>

        <IonButton expand="block" href="tel:8294812870">
          <IonIcon slot="start" icon={call} />
          829 481 2870
        </IonButton>
        <IonButton expand="block" href="mailto:Dauryexe@gmail.com">
          <IonIcon slot="start" icon={mail} />
          Dauryexe@gmail.com
        </IonButton>
        <IonButton expand="block" href="https://github.com/DauryDB" target="_blank" rel="noopener noreferrer">
          <IonIcon slot="start" icon={logoGithub} />
          GitHub
        </IonButton>
      </IonCardContent>
    </IonCard>
  </Pagina>
);

export default AcercaDe;