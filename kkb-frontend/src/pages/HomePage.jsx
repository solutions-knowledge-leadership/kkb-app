import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  IonToggle,
} from '@ionic/react';

import { moon, sunny } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

function HomePage() {
  const history = useHistory();

  const [roomCode, setRoomCode] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');

    if (savedTheme === 'true') {
      document.body.classList.add('dark');
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = (enabled) => {
    setDarkMode(enabled);

    if (enabled) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

    localStorage.setItem('darkMode', enabled);
  };

  const createRoom = () => {
    const roomCode= Math.random().toString(36).substring(2, 8);
    history.push(`/room/${roomCode}`);
  };

  const joinRoom = () => {
    if (!roomCode) return;

    history.push(`/room/${roomCode}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Expense Tracker</IonTitle>

          <IonButtons slot="end">
            <IonItem lines="none">
              <IonIcon icon={sunny} />

              <IonToggle
                checked={darkMode}
                onIonChange={(e) => toggleDarkMode(e.detail.checked)}
              />

              <IonIcon icon={moon} />
            </IonItem>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="home-container">

          <div
  style={{
    textAlign: 'center',
    marginTop: '60px',
  }}
>
  <h1
    style={{
      fontSize: '80px',
      fontWeight: '800',
      letterSpacing: '4px',
      margin: 0,
    }}
  >
    KKB
  </h1>

  <p
    style={{
      opacity: 0.7,
      marginTop: '10px',
      fontSize: '24px',
    }}
  >
    Split expenses with friends
  </p>
</div>

          <IonItem className="room-input">
            <IonLabel position="stacked">Room Code</IonLabel>

            <IonInput
              value={roomCode}
              placeholder="Enter room code"
              onIonInput={(e) => setRoomCode(e.target.value)}
            />
          </IonItem>

          <div className="button-group">
            <IonButton expand="block" onClick={joinRoom}>
              Join Room
            </IonButton>

            <IonButton
              expand="block"
              fill="outline"
              onClick={createRoom}
            >
              Create Room
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default HomePage;
