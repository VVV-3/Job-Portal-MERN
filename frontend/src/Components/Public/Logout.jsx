import { Button } from "reactstrap";
import {useContext} from'react';
import { UserContext } from "App";
import { useHistory, Link, Redirect } from "react-router-dom";
function Logout() {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  function onSub() {
    localStorage.clear();
    setUser({id:null})
    history.push("/login");
  }
  return (
    <Button type="button" onClick={onSub}>
      Logout
    </Button>
  );
}

export default Logout;
