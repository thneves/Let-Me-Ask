import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'; // Alternative to anchor tag in JSX.

import '../styles/auth.scss';

import { Button } from '../components/Button';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';


export function NewRoom() {

  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState('');
  const history = useHistory();

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if(newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    history.push(`/rooms/${firebaseRoom.key}`)
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="let me ask illustration" />
        <strong>Create real time Q&amp;A room chats</strong>
        <p>Answer your audience questions in real time.</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="letmeask logo" />
          <h2>Create new Room</h2>
          <div></div>
          <form onSubmit={handleCreateRoom}>
            <input
             type="text"
             placeholder="Room's name"
             onChange={event => setNewRoom(event.target.value)}
             value={newRoom}
            />
            <Button type="submit">
              Create new room
            </Button>
          </form>
          <p>Wanna join an existing room? <Link to="/">click here</Link></p> {/* react router dom Link alternative to anchor tag */}
        </div>
      </main>
    </div>
  )
}
