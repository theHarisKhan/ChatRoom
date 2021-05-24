import './App.css';
import Sidebar from './Sidebar/Sidebar';
import Chat from './Chat/Chat'
import TopBar from './TopBar/TopBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LogIn from './LogIn/LogIn';
import { useStateValue } from './Redux/StateProvider';
import Welcome from './Welcome';
import { useEffect } from 'react';
import { auth } from './firebase'

function App() {
 const [{ user }, dispatch] = useStateValue()

 useEffect(() => {
   auth.onAuthStateChanged(authUser => {

    if(authUser){
      dispatch({
        type: 'SET_USER',
        user: authUser,
      })
    } else {
      dispatch({
        type: 'SET_USER',
        user: null,
      })
    }
   })
 },[])

  return (
    <div className="App">
      <Router>
        <Switch>
          {!user ? (
            <Route path="/">
              <LogIn />
            </Route>
            ) : (
            <>
            <TopBar />
            <div className="app__body"> 
              <Sidebar />

            
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/welcome">
                <Welcome />
              </Route>
            </div>
            </>
          )}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
