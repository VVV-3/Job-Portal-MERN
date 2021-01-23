import { useState, useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory, Redirect } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { UserContext } from "App";
import axios from "axios";
import Navbar_A from "./Navbar";
import '../../../App.css';
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

function Profile_A() {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const { register, handleSubmit, errors, control } = useForm();
  const [profile, setProfile] = useState(false);
  const [pskills, setPskills] = useState([]);
  const [skills, setSkills] = useState([]);
  const [err, setErr] = useState(false);

  useEffect(() => {
    console.log("hehe");
    axios
      .get("/api/applicant/find")
      .then((res) => {
        setProfile(res.data.filter((d) => d._id === user.id)[0]);
      })
      .catch((err) => {
        setErr(err.response.data);
        setTimeout(() => setErr(false), 3000);
      });

    axios
      .get("/api/skill/find")
      .then((res) => {
        setSkills(res.data.map((s) => ({ value: s._id, label: s.name })));
      })
      .catch((err) => {
        setErr(err.response.data);
        setTimeout(() => setErr(false), 3000);
      });
  }, []);

  function onSub(data) {
    console.log(data, user);

    const newSkills = data.skills.filter((d) => d.__isNew__);
    var saveSkills = data.skills
      .filter((d) => !d.__isNew__)
      .map((d) => d.value);
    for (var x of newSkills) {
      axios
        .post(
          "/api/skill/add",
          { name: x.value },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          saveSkills.push(res.data._id);
        })
        .catch((err) => {
          setErr(err.response.data);
          setTimeout(() => setErr(false), 3000);
        });
    }
    console.log(saveSkills);
    axios
      .post(
        `/api/applicant/edit/${user.id}`,
        {
          name: data.name,
          email: user.email,
          skills: saveSkills,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
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
      <Navbar_A />
      <br></br>
      <h4>View and Edit your Profile</h4>
      <br></br>
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
          <Label for="skills">Skills</Label>
          <Controller
            defaultValue={profile.skills.map((s) => ({
              value: s._id,
              label: s.name,
            }))}
            name="skills"
            control={control}
            as={CreatableSelect}
            isMulti
            options={skills}
          />
          <FormFeedback>{errors.skills && errors.skills.message}</FormFeedback>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </Container>
  );
}

export default Profile_A;
