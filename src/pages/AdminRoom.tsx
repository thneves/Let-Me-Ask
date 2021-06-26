import logoImg from '../assets/images/logo.svg';
import { useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import '../styles/room.scss';
import { RoomCode } from '../components/RoomCode';
import { FormEvent, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';


type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('');

  const roomId = params.id;

  const { title, questions } = useRoom(roomId); 
 
  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === '') {
      return;
    }

    if (!user) {
      throw new Error('You mus be logged in.')
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,  
      },
      isHighLightned: false,
      isAnswered: false  // Determine if the question was answered or not.
    }

    await database.ref(`rooms/${roomId}/questions`).push(question)

    setNewQuestion('');
  }

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