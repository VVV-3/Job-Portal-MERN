import { useState, useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory, Redirect } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import Education from "./Education";
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

function Register_A() {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  const { register, handleSubmit, errors, control } = useForm();
  const [err, setErr] = useState(false);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
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
        "/api/register/applicant",
        {
          ...data,
          email: user.email,
          skills: saveSkills,
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

  //if (user.id !== null) return <Redirect to="/" />;
  return (
    <Container fluid>
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
          <Label for="skills">Skills</Label>
          <Controller
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

export default Register_A;
