import { useHistory } from 'react-router-dom' //create path for buttton

import { auth, firebase } from '../services/firebase';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import '../styles/auth.scss'
import { Button } from '../components/Button';

export function Home() {

  const history = useHistory(); //HOOK - all hooks must be inside the component

  function handleCreateRoom() { 
    const provider = new firebase.auth.GoogleAuthProvider(); // Basic Firebase authentication

    auth.signInWithPopup(provider).then(result => { 
      console.log(result)
    })

    history.push('/rooms/new')   // choose path navigation
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
          <form>
            <input
              type="text"
              placeholder="Type the room's code"  
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
