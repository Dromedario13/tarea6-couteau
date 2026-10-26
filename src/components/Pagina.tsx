import React from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonButtons,
  IonMenuButton, IonTitle, IonContent,
} from '@ionic/react';

interface Props {
  titulo: string;
  children?: React.ReactNode;
}

// Estructura comun para todas las vistas (cabecera con boton de menu)
const Pagina: React.FC<Props> = ({ titulo, children }) => (
  <IonPage>
    <IonHeader>
      <IonToolbar color="primary">
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>{titulo}</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">{children}</IonContent>
  </IonPage>
);

export default Pagina;