import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom';
import Register from './Components/Public/Register';
import Register_R from './Components/Public/Register_R';
import Login from './Components/Public/Login';
import {createContext, useState} from 'react';

export const UserContext = createContext();

function App() {
  const [user,setUser] = useState(false);
  return (
    <UserContext.Provider value={{user,setUser}}>
    <Switch>
      
      <Route exact path='/'> <Login/> </Route>
      <Route path='/register' > <Register/> </Route>
      <Route path='/register_a' > <Register/> </Route>
      <Route path='/register_r' > <Register_R/> </Route>
      <Redirect to='/'/>
      
    </Switch>
    </UserContext.Provider>
    )
}


export default App;
