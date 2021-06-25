import { useHistory } from 'react-router-dom'; //create path for buttton
import { FormEvent, useState } from 'react';

import { useAuth } from '../hooks/useAuth';

import { database } from '../services/firebase'

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import '../styles/auth.scss'
import { Button } from '../components/Button';

export function Home() {

  const history = useHistory(); //HOOK - all hooks must be inside the component - navigation
  const { user, signInWithGoogle } = useAuth();

  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push('/rooms/new')   // choose path navigation
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Room not found');
      return;
    }

    history.push(`/rooms/${roomCode}`)
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Illustration simbolizing Q &amp; A" />
        <strong>Create real time Q&amp;A room chats</strong>
        <p>Answer your audience questions in real time.</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="let me ask logo" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Google logo" />
            Create your room with Google
          </button>
          <div className="separator">or join another room</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Type the room's code"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Join room
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}
