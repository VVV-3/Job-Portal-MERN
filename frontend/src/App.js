import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

import Home from "./Components/Home";

import Register from "./Components/Public/Register";
import Register_R from "./Components/Public/Register_R";
import Register_A from "./Components/Public/Register_A";
import Login from "./Components/Public/Login";

import Profile_A from "./Components/Private/Applicant/Profile_A";
import JobOpenings_A from "./Components/Private/Applicant/JobOpening_A";
import Applications_A from "./Components/Private/Applicant/Applications_A";

import Profile_R from "./Components/Private/Recruiter/Profile_R";
import Jobopenings_R from "./Components/Private/Recruiter/JobOpenings_R";
import MakeJobOpenings_R from "./Components/Private/Recruiter/MakeJobOpening_R";
import Applications_R from "./Components/Private/Recruiter/Applications_R";
import SelectedApplicants_R from './Components/Private/Recruiter/SelectedApplicants_R';

import Logout from "Components/Public/Logout";

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
          <Login />
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
        <Route path="/jobOpenings_a">
          <JobOpenings_A />
        </Route>
        <Route path="/applications_a">
          <Applications_A />
        </Route>
        

        <Route path="/profile_r">
          <Profile_R />
        </Route>
        <Route path="/jobOpenings_r">
          <Jobopenings_R />
        </Route>
        <Route path="/makeJobOpenings_r">
          <MakeJobOpenings_R />
        </Route>
        <Route path="/applications_r">
          <Applications_R />
        </Route>
        <Route path='/selectedApplicants_r'>
          <SelectedApplicants_R/>
        </Route>

        <Redirect to="/" />
      </Switch>
    </UserContext.Provider>
  );
}

export default App;
