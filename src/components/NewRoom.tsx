import { Link } from 'react-router-dom'; // Alternative to anchor tag in JSX.
import { useContext } from 'react';
import '../styles/auth.scss';
import { Button } from '../components/Button';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { AuthContext } from '../App';


export function NewRoom() {

  const { user } = useContext(AuthContext);

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
          <h1>{user?.name}</h1>
          <h2>Create new Room</h2>
          <div></div>
          <form action="">
            <input
             type="text"
             placeholder="Room's name"
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
