import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  FormFeedback,
  UncontrolledCollapse,
  Alert,
  Container,
} from "reactstrap";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { UserContext } from "App";
import { useContext } from "react";
import Navbar_R from "./Navbar";

function Profile_R() {
  const history = useHistory();
  const { register, handleSubmit, errors, control } = useForm();

  const { user, setUser } = useContext(UserContext);
  const [profile, setProfile] = useState();
  const [err, setErr] = useState(false);

  // useEffect(() => {
  //   console.log("hehe");
  //   axios
  //     .get("/api/recruiter/find")
  //     .then((res) => {
  //       setProfile(res.data.filter((d) => d._id === user.id)[0]);
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       setErr(err.response.data);
  //       setTimeout(() => setErr(false), 3000);
  //     });
  // }, []);

  async function onSub(data) {
    console.log(data, user);
    await axios
      .post("/api/register/recruiter", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setUser({ jobType: null });
        console.log(res.data);
        history.push("/login");
      })
      .catch((err) => {
        setErr(err.response.data);
        setTimeout(() => setErr(false), 3000);
      });
  }

  if (user.id === null) return <Redirect to="/" />;
  return (
    <Container>
      <Navbar_R />
      {err && <Alert color="danger">{err}</Alert>}
      <h3 style={{ textAlign: "center" }}> Profile Details </h3>
      <Form onSubmit={handleSubmit(onSub)} noValidate>
        <FormGroup>
          <Label htmlFor="name">Name</Label>
          <Input
            placeholder={profile.name}
            invalid={errors.name}
            type="text"
            name="name"
            innerRef={register({
              required: "Enter your name",
            })}
          />
          <FormFeedback>{errors.name && errors.name.message}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="inputEmail">E-mail</Label>
          <Input
            readOnly
            value={profile.email}
            invalid={errors.email}
            type="email"
            id="email"
            name="email"
            innerRef={register({
              required: "Enter your e-mail",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Enter a valid e-mail address",
              },
            })}
          />
          <FormFeedback>{errors.email && errors.email.message}</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="bio">Bio</Label>
          <Input
            placeholder={profile.bio}
            invalid={errors.bio}
            type="textarea"
            name="bio"
            innerRef={register({ required: "Enter your Bio Data" })}
          />
          <FormFeedback>{errors.bio && errors.bio.message}</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="contactNo">Contact No</Label>
          <Input
            placeholder={profile.contactNo}
            name="contactNo"
            type="number"
            innerRef={register({ required: "Required" })}
            invalid={errors.contactNo}
          />
          <FormFeedback>
            {errors.contactNo && errors.contactNo.message}
          </FormFeedback>
        </FormGroup>
        <Button type="submit" block>
          Save
        </Button>
      </Form>
    </Container>
  );
}

export default Profile_R;
