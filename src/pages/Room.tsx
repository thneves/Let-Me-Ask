import logoImg from '../assets/images/logo.svg';
import { useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import '../styles/room.scss';
import { RoomCode } from '../components/RoomCode';
import { FormEvent, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import { useEffect } from 'react';
import { Question } from '../components/Question';


type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
}>

type Question = {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
}

type RoomParams = {
  id: string;
}

export function Room() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('');
  const [questions, setQuestion] = useState<Question[]>([]);
  const [title, setTitle] = useState('');
  
  const roomId = params.id;

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    // Firebase has 4 references for events: value(all information), child_added, child_changed, child_removed - child values is better when we have more than one info inside the reference
    // For instance, in case of questions would be better to use child events for its alterations properties.

    // .on -  is always listening the event.
    // .once - well just one time.

    roomRef.on('value', room => { // From Firebase documentation, retrieve information event listener.
      const databaseRoom = room.val();
      const firebaseQuestions = databaseRoom.questions as FirebaseQuestions ?? {}; //typescript

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered
        }
      })

      setTitle(databaseRoom.title);
      setQuestion(parsedQuestions);
    })
  }, [])

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
          <RoomCode code={roomId} />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Room: {title}</h1>
          { questions.length > 0 && <span>{questions.length} questions</span> }
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="What's your questions?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />
          <div className="form-footer"> { /* ternary operator*/}
            { user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>To send a question, <button>please, log in.</button></span>
            ) }
            <Button type="submit" disabled={!user}>Send Question</Button>
          </div>
        </form>
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