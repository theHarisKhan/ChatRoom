import './App.css';
import Sidebar from './Sidebar/Sidebar';
import Chat from './Chat/Chat'
import TopBar from './TopBar/TopBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LogIn from './LogIn/LogIn';
import { useStateValue } from './Redux/StateProvider';
import Welcome from './Welcome';

function App() {
 const [{ user }, dispatch] = useStateValue()

  return (
    <div className="App">
      {!user ? (
        <LogIn />
      ) : (
        <>
        <TopBar />
        <div className="app__body"> 
          <Router>
              <Sidebar />

            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/">
                <Welcome />
              </Route>
            </Switch>
          </Router>
        </div>
        </>
      )}
    </div>
  );
}

export default App;
