import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import '../styles/room.scss';

export function Room() {
  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="letmeask logo" />
          <div>room code</div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>React Room</h1>
          <span>4 questions</span>
        </div>

        <form>
          <textarea
            placeholder="What's your questions?"
          />
          <div className="form-footer">
            <span>To send a question, <button>please, log in.</button></span>
            <Button type="submit">Send Question</Button>
          </div>
        </form>
      </main>
    </div>
  )
}