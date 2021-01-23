import { Button } from "reactstrap";
import { useHistory, Link, Redirect } from "react-router-dom";
function Logout() {
  const history = useHistory();
  function onSub() {
    localStorage.clear();
    history.push("/");
  }
  return (
    <Button type="button" onClick={onSub}>
      Logout
    </Button>
  );
}

export default Logout;
