import logoImg from '../assets/images/logo.svg';
import { useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import '../styles/room.scss';
import { RoomCode } from '../components/RoomCode';


type RoomParams = {
  id: string;
}

export function Room() {

  const params = useParams<RoomParams>();

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="letmeask logo" />
          <RoomCode code={params.id} />
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