import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom';
import Register from './Components/Public/Register';
import Register_R from './Components/Public/Register_R';
import {createContext, useState} from 'react';

function Test1() {
  return(
    <h1>Hi!</h1>
  )
};
function Test2() {
  return(
    <h1>Hey!</h1>
  )
};

export const UserContext = createContext();

function App() {
  const [user,setUser] = useState(false);
  return (
    <UserContext.Provider value={{user,setUser}}>
    <Switch>
      
      <Route exact path='/'> <Test1/> </Route>
      <Route path='/register' > <Register/> </Route>
      <Route path='/register_a' > <Register/> </Route>
      <Route path='/register_r' > <Register_R/> </Route>
      <Redirect to='/'/>
      
    </Switch>
    </UserContext.Provider>
    )
}


export default App;
