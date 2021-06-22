import { useHistory } from 'react-router-dom' //create path for buttton
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import '../styles/auth.scss'
import { Button } from '../components/Button';

export function Home() {

  const history = useHistory(); //HOOK - all hooks must be inside the component

  function navigateToNewRoom() {
    history.push('/rooms/new')   // Function to choose path navigation
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
          <button onClick={navigateToNewRoom} className="create-room">
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
