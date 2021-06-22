import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

export function Home() {
  return (
    <div>
      <aside>
        <img src={illustrationImg} alt="Illustration simbolizing Q &amp; A" />
        <strong>Create real time Q&amp;A room chats</strong>
        <p>Anwser your audience questions in real time.</p>
      </aside>
      <main>
        <img src={logoImg} alt="let me ask logo" />
        <button>
          <img src={googleIconImg} alt="Google logo" />
          Create your room with Google
        </button>
        <div>or join another room</div>
        <form action='/'>
          <input
            type="text"
            placeholder="Type the room's code"  
          />
        </form>
      </main>
    </div>
  )
}
