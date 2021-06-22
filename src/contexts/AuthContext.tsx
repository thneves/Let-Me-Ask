import { createContext, ReactNode, useState, useEffect } from 'react';
import { firebase, auth } from '../services/firebase';

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined; // Not just an object, but the specific User object set above, or it's undefined before the user be logged in
  signInWithGoogle: () => Promise<void>     // Returns a promise with no value(void).
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);


export function AuthContextProvider(props: AuthContextProviderProps) {

  const [user, setUser] = useState<User>(); // <User> set the type of User to the function;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => { // Every time I declare and event listener inside use effect you have to 'unsubscribe' from the event listener in the end of the function
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

    return () => {
      unsubscribe();
    }
  }, []) //second parameter is always an array

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
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  )
}