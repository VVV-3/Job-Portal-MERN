import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
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
        setUser({
          id: res.data.profile_id,
          user_id: res.data.id,
          jobType: data.jobType,
        });
        console.log(user);
        // if( data.jobType === 'recruiter' ) {
        //   history.push('/');
        // }
        // else if( data.jobType === 'applicant') {
        //   history.push('/');
        // }
      })
      .catch((err) => {
        setErr(err.response.data);
        setTimeout(() => setErr(false), 3000);
      });
  }

  return (
    <Container>
      Login
      {err && <Alert color="danger">{err}</Alert>}
      <Form onSubmit={handleSubmit(onSub)}>
        <FormGroup>
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
        <Link to="/register">
          <Button>Register</Button>
        </Link>
      </Form>
    </Container>
  );
}

export default Login;
