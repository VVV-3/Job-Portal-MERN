import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory, Redirect } from "react-router-dom";
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

function Register_R() {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  const userEmail = localStorage.getItem("userEmail");
  const { register, handleSubmit, errors } = useForm();
  const [err, setErr] = useState(false);

  function onSub(data) {
    console.log(data, user);
    axios
      .post(
        "/api/register/recruiter",
        {
          email: userEmail,
          ...data,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        setUser({jobType: null});
        console.log(res.data);
        history.push("/login");
      })
      .catch((err) => {
        setErr(err.response.data);
        setTimeout(() => setErr(false), 3000);
      });
  }
  if (user.id !== null) return <Redirect to="/" />;
  return (
    <Container className='loginform'>
      Register - 2 of 2
      <br></br>
      <br></br>
      {err && <Alert color="danger">{err}</Alert>}
      <Form onSubmit={handleSubmit(onSub)}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            name="name"
            type="text"
            innerRef={register({ required: "Required" })}
            invalid={errors.name}
          />
          <FormFeedback>{errors.name && errors.name.message}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="contactNo">Contact No</Label>
          <Input
            name="contactNo"
            type="number"
            innerRef={register({ required: "Required" })}
            invalid={errors.contactNo}
          />
          <FormFeedback>
            {errors.contactNo && errors.contactNo.message}
          </FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="bio">Bio</Label>
          <Input
            name="bio"
            type="textarea"
            innerRef={register({ required: "Required" })}
            invalid={errors.bio}
          />
          <FormFeedback>{errors.bio && errors.bio.message}</FormFeedback>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </Container>
  );
}

export default Register_R;
