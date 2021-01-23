import { useState, useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory, Redirect } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { UserContext } from "App";
import axios from "axios";
import Navbar_R from "./Navbar";
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

function Profile_R() {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const { register, handleSubmit, errors, control } = useForm();
  const [profile, setProfile] = useState(false);
  const [err, setErr] = useState(false);
  const userid = user.id

  useEffect(() => {
    console.log("hehe");
    axios
      .get("/api/recruiter/find")
      .then((res) => {
        setProfile(res.data.filter((d) => d._id === user.id)[0]);
      })
      .catch((err) => {
        setErr(err.response.data);
        setTimeout(() => setErr(false), 3000);
      });
  }, []);

  function onSub(data) {
    console.log(userid);

    axios
      .post(`/api/recruiter/edit/${userid}`, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        setErr(err.response.data);
        setTimeout(() => setErr(false), 3000);
      });
  }

  if (user.id === null) return <Redirect to="/" />;
  if (!profile) return null;

  return (
    <Container>
      <Navbar_R />
      {err && <Alert color="danger">{err}</Alert>}
      <Form onSubmit={handleSubmit(onSub)}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            defaultValue={profile.name}
            name="name"
            type="text"
            innerRef={register({ required: "Required" })}
            invalid={errors.name}
          />
          <FormFeedback>{errors.name && errors.name.message}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="email">E-mail</Label>
          <Input
            readOnly
            defaultValue={profile.email}
            name="email"
            type="email"
            innerRef={register({ required: "Required" })}
            invalid={errors.email}
          />
          <FormFeedback>{errors.email && errors.email.message}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="bio">bio</Label>
          <Input
            defaultValue={profile.bio}
            name="bio"
            type="textarea"
            innerRef={register({ required: "Required" })}
            invalid={errors.name}
          />
          <FormFeedback>{errors.bio && errors.bio.message}</FormFeedback>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </Container>
  );
}

export default Profile_R;
