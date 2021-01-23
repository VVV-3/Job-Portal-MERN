import { useContext } from "react";
import { UserContext } from "App";
import { Redirect } from "react-router-dom";

function Home() {
  const { user, setUser } = useContext(UserContext);
  if (user.id === null) return <Redirect to="/login" />;
  else {
    if (user.id && user.jobType === "applicant") return <Redirect to="/jobOpenings_a" />;
    if (user.id && user.jobType === "recruiter") return <Redirect to="/jobOpenings_r" />;
  }
  return <Redirect to="/login" />;
}

export default Home;
