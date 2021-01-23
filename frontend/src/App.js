import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

import Home from "./Components/Home";

import Register from "./Components/Public/Register";
import Register_R from "./Components/Public/Register_R";
import Register_A from "./Components/Public/Register_A";
import Login from "./Components/Public/Login";

import Profile_A from "./Components/Private/Applicant/Profile_A";
import Profile_R from "./Components/Private/Recruiter/Profile_R";

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
          <Home />
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
        <Route path="/profile_a">
          <Profile_A />
        </Route>
        <Route path="/profile_r">
          <Profile_R />
        </Route>
        <Redirect to="/" />
      </Switch>
    </UserContext.Provider>
  );
}

export default App;
