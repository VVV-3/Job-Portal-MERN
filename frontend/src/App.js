import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Register from "./Components/Public/Register";
import Register_R from "./Components/Public/Register_R";
import Register_A from "./Components/Public/Register_A";
import Login from "./Components/Public/Login";
import Logout from "./Components/Public/Logout";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);
  useEffect(() => {
    setUser({
      id: localStorage.getItem("id") || null,
      user_id: localStorage.getItem("user_id") || null,
      jobType: localStorage.getItem("jobType") || null,
    });
    setLoading(false);
  }, []);
  if (loading) return null;
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Switch>
        <Route exact path="/">
          <Logout />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/register_a">
          <Register_A />
        </Route>
        <Route path="/register_r">
          <Register_R />
        </Route>

        <Redirect to="/" />
      </Switch>
    </UserContext.Provider>
  );
}

export default App;
