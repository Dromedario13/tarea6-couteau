import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  IonContent, IonHeader, IonIcon, IonItem, IonLabel,
  IonList, IonMenu, IonMenuToggle, IonTitle, IonToolbar,
} from '@ionic/react';
import {
  construct, maleFemale, person, school,
  partlySunny, paw, newspaper, informationCircle,
} from 'ionicons/icons';

// Opciones del menu: ruta, titulo e icono
const opciones = [
  { url: '/herramientas', titulo: 'Caja de herramientas', icono: construct },
  { url: '/genero', titulo: 'Predecir genero', icono: maleFemale },
  { url: '/persona', titulo: 'Persona aleatoria', icono: person },
  { url: '/universidades', titulo: 'Universidades', icono: school },
  { url: '/clima', titulo: 'Clima en RD', icono: partlySunny },
  { url: '/pokemon', titulo: 'Pokemon', icono: paw },
  { url: '/noticias', titulo: 'Noticias WordPress', icono: newspaper },
  { url: '/acerca', titulo: 'Acerca de', icono: informationCircle },
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Couteau</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {opciones.map((op) => (
            <IonMenuToggle key={op.url} autoHide={false}>
              <IonItem
                routerLink={op.url}
                routerDirection="none"
                lines="none"
                color={location.pathname === op.url ? 'light' : undefined}
              >
                <IonIcon slot="start" icon={op.icono} />
                <IonLabel>{op.titulo}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;