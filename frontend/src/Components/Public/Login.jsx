import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory, Link, Redirect } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText,
  Container,
  Button,
  Alert,
} from "reactstrap";
import { UserContext } from "App";

function Login() {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const [err, setErr] = useState(false);

  function onSub(data) {
    console.log(data);
    axios
      .post("/api/login", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(data);
        setUser({
          id: res.data.profile_id,
          user_id: res.data.id,
          jobType: data.jobType,
        });
        localStorage.setItem("id", res.data.profile_id);
        localStorage.setItem("user_id", res.data.id);
        localStorage.setItem("jobType", data.jobType);
      })
      .catch((err) => {
        console.log(err);
        setErr(err.response.data);
        setTimeout(() => setErr(false), 3000);
      });
  }
  if (user.id !== null) return <Redirect to="/" />;

  return (
    <Container className="loginform">
      Login
      {err && <Alert color="danger">{err}</Alert>}
      <Form onSubmit={handleSubmit(onSub)}>
        <FormGroup>
          <br></br>
          <Label for="jobType">JobType</Label>
          <Input
            type="select"
            name="jobType"
            innerRef={register({ required: "Required" })}
          >
            <option value="recruiter">Recruiter</option>
            <option value="applicant">Applicant</option>
          </Input>
          <FormFeedback>
            {errors.jobType && errors.jobType.message}
          </FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="email">E-mail</Label>
          <Input
            name="email"
            type="email"
            innerRef={register({ required: "Required" })}
            invalid={errors.email}
          />
          <FormFeedback>{errors.email && errors.email.message}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            name="password"
            type="password"
            innerRef={register({ required: "Required" })}
            invalid={errors.password}
          />
          <FormFeedback>
            {errors.password && errors.password.message}
          </FormFeedback>
        </FormGroup>
        <Button>Login</Button>
        <FormGroup>
        <br></br>
          <Label for="register">New Here? Make an account</Label>
          <br></br>
          <Link to="/register">
            <Button name="register">Register</Button>
          </Link>
        </FormGroup>
      </Form>
    </Container>
  );
}

export default Login;
