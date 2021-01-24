import { useState, useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory, Redirect } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
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
import { UserContext } from "App";

function MakeJobOpening_R() {
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
        .catch((error) => {
          //setErr(error);
          console.log(error);
          setTimeout(() => setErr(false), 3000);
        });
    }
    console.log(saveSkills);
    axios
      .post(
        `/api/jobOpening/add/${user.id}`,{
          ...data,
          skills: saveSkills,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        history.push("/jobOpenings_r");
      })
      .catch((error) => {
        console.log(error);
        setErr(error);
        setTimeout(() => setErr(false), 3000);
      });
  }

  if (user.id === null) return <Redirect to="/" />;
  return (
    <Container >
      <Navbar_R/>
      <br></br>
      <h4>Make Job Opening</h4>
      <br></br>
      {err && <Alert color="danger">{err}</Alert>}
      <Form onSubmit={handleSubmit(onSub)}>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            name="title"
            type="text"
            innerRef={register({ required: "Required" })}
            invalid={errors.title}
          />
          <FormFeedback>{errors.title && errors.title.message}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="maxApplicants">Max Applicants</Label>
          <Input
            name="maxApplicants"
            type="number"
            innerRef={register({ required: "Required" })}
            invalid={errors.maxApplicants}
          />
          <FormFeedback>{errors.maxApplicants && errors.maxApplicants.message}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="maxPositions">Max Positions</Label>
          <Input
            name="maxPositions"
            type="number"
            innerRef={register({ required: "Required" })}
            invalid={errors.maxPositions}
          />
          <FormFeedback>{errors.maxPositions && errors.maxPositions.message}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="deadline">Deadline</Label>
          <Input
            name="deadline"
            type="date"
            innerRef={register({ required: "Required" })}
            invalid={errors.deadline}
          />
          <FormFeedback>{errors.deadline && errors.deadline.message}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="skills">Required Skills</Label>
          <Controller
            name="skills"
            control={control}
            as={CreatableSelect}
            isMulti
            options={skills}
          />
          <FormFeedback>{errors.skills && errors.skills.message}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="jobType">JobType</Label>
          <Input
            type="select"
            name="jobType"
            innerRef={register({ required: "Required" })}
          >
            <option value="full_time">Full Time</option>
            <option value="part_time">Part Time</option>
            <option value="work_from_home">Work from Home</option>
          </Input>
          </FormGroup>
          <FormGroup>
          <Label for="duration">Duration</Label>
          <Input
            name="duration"
            type="number"
            innerRef={register({ required: "Required" })}
            invalid={errors.duration}
          />
          <FormFeedback>{errors.duration && errors.duration.message}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="salary">Salary</Label>
          <Input
            name="salary"
            type="number"
            innerRef={register({
              required: "Enter a salary",
              pattern: {
                value: /^\d+$/i,
                message: "Enter a valid salary",
              },
            })}
            invalid={errors.salary}
          />
          <FormFeedback>{errors.salary && errors.salary.message}</FormFeedback>
        </FormGroup>
        <Button>Make Job Opening</Button>
      </Form>
    </Container>
  );
}

export default MakeJobOpening_R;