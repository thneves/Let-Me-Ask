import { createContext, useState, useEffect } from 'react'; //Share info between React components(in this case Firebase authentication to know if the user is logged in);
import { BrowserRouter, Route } from 'react-router-dom';

import { Home } from "./pages/Home";
import { NewRoom } from "./components/NewRoom";
import { auth, firebase } from './services/firebase';

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined; // Not just an object, but the specific User object set above, or it's undefined before the user be logged in;
  signInWithGoogle: () => Promise<void>; // Returns a promise with no value(void).
}

export const AuthContext = createContext({} as AuthContextType); //typescript

function App() {

  const [user, setUser] = useState<User>(); // <User> set the type of User to the function;

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user // transform into User object params

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.')
        }
  
        setUser({  //set user info new State fom result.user new object
          id: uid,
          name: displayName,
          avatar: photoURL,
        })
      }
    })
  }, [user]) //second parameter is always an array

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider(); // Basic Firebase authentication

    const result = await auth.signInWithPopup(provider) // Get info from google authentication

    if (result.user) { 
      const { displayName, photoURL, uid } = result.user // transform into User object params

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.')
      }

      setUser({  //set user info new State fom result.user new object
        id: uid,
        name: displayName,
        avatar: photoURL,
      })
    }
  }


  return (
    <div>
      <AuthContext.Provider value={{ user, signInWithGoogle }}> {/* All pages now have acces to user information and sign in form with google */}
        <BrowserRouter>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
