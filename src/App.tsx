import { BrowserRouter, Route } from 'react-router-dom';

import { Home } from "./pages/Home";
import { NewRoom } from "./components/NewRoom";

import { AuthContextProvider } from './contexts/AuthContext'

function App() {

  return (
    <div>
      <BrowserRouter>
        <AuthContextProvider>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
