import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ExpenseRoomPage from './pages/ExpenseRoomPage';

setupIonicReact();

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home">
            <HomePage />
          </Route>

          <Route exact path="/room/:roomId">
            <ExpenseRoomPage />
          </Route>

          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
