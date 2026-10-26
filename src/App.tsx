import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Menu from './components/Menu';
import Herramientas from './pages/Herramientas';
import Genero from './pages/Genero';
import Persona from './pages/Persona';
import Universidades from './pages/Universidades';
import Clima from './pages/Clima';
import Pokemon from './pages/Pokemon';
import Noticias from './pages/Noticias';
import AcercaDe from './pages/AcercaDe';

/* CSS base de Ionic */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Tema propio */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <Menu />
        <IonRouterOutlet id="main">
          <Route path="/herramientas" element={<Herramientas />} />
          <Route path="/genero" element={<Genero />} />
          <Route path="/persona" element={<Persona />} />
          <Route path="/universidades" element={<Universidades />} />
          <Route path="/clima" element={<Clima />} />
          <Route path="/pokemon" element={<Pokemon />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/acerca" element={<AcercaDe />} />
          <Route path="/" element={<Navigate to="/herramientas" replace />} />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

export default App;