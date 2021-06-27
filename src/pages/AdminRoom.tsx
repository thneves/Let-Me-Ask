import logoImg from '../assets/images/logo.svg';
import { useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import '../styles/room.scss';
import { RoomCode } from '../components/RoomCode';
// import { useAuth } from '../hooks/useAuth';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';


type RoomParams = {
  id: string;
}

export function AdminRoom() {
  // const { user } = useAuth();
  const params = useParams<RoomParams>();

  const roomId = params.id;

  const { title, questions } = useRoom(roomId);

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="letmeask logo" />
          <div>
          <RoomCode code={roomId} />
          <Button isOutlined>Finish Room</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Room: {title}</h1>
          { questions.length > 0 && <span>{questions.length} questions</span> }
        </div>

        <div className="question-list">
          {questions.map( question => {
            return (
              <Question
                key={question.id} // The way react identify one 'question' to another - use every time with lists - Reconlitiation Algorithm React Documentation.
                content={question.content}
                author={question.author}
              />
            );
        })}
        </div>        
      </main>
    </div>
  )
}