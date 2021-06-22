import { BrowserRouter, Route } from 'react-router-dom';
import { Home } from "./pages/Home";
import { NewRoom } from "./components/NewRoom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
      </BrowserRouter>
    </div>
  );
}

export default App;
