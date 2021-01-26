import { useState, useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory, Redirect } from "react-router-dom";
import { UserContext } from "App";
import "../../../App.css";
import axios from "axios";

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
  CardFooter,
  Alert,
  Form,
  FormFeedback,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

const ModalExample = ({ jobId, jobState, ma, mp, resdata, jobDeadline }) => {

  function refreshPage() {
    window.location.reload(false);
  }

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const history = useHistory();
  const { register, handleSubmit, errors, control } = useForm();
  const [err, setErr] = useState(false);
  const [warn,setWarn] = useState(false);
  const [warn2,setWarn2] = useState(false);
  const [delApplications, setDelApplications] = useState([]);

  const [ma1, setma1] = useState(null);
  const [mp1, setmp1] = useState(null);

  useEffect(() => {
    console.log(jobDeadline);
    setma1(resdata.filter((o) => o.jobOpening._id === jobId).length);
    setmp1(
      resdata.filter(
        (o) => o.jobOpening._id === jobId && o.state === "selected"
      ).length
    );
    setDelApplications(
      resdata
          .filter(
            (d) =>
              d.jobOpening._id === jobId &&
              d.state !== "selected" &&
              d.state != "rejected"
          )
          .map((s) => ({ id: s._id }))
    );
  }, [resdata]);

  function onSub(data) {
    console.log(data);

    if (ma1 > data.maxApplicants) {
      setWarn(
        "Sorry the Max Applicants you have entered is less than the current applications present for this job opening already!"
      );
      setTimeout(() => setWarn(false), 3000);
    }
    if (ma1 == data.maxApplicants) {
      axios
        .post(
          `/api/jobOpening/edit/${jobId}`,
          { maxApplicants: data.maxApplicants, state: "filled" },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          setWarn("This job opening status will be changed to filled");
          setTimeout(() => setWarn(false), 3000);
        })
        .catch((error) => {
          console.log(error);
          setErr(error);
          setTimeout(() => setErr(false), 3000);
        });
    }
    if (ma1 < data.maxApplicants) {
      axios
        .post(
          `/api/jobOpening/edit/${jobId}`,
          { maxApplicants: data.maxApplicants, state: "open" },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          setWarn("This job opening status will be changed to open");
          setTimeout(() => setWarn(false), 3000);
        })
        .catch((error) => {
          console.log(error);
          setErr(error);
          setTimeout(() => setErr(false), 3000);
        });
    }

    if (mp1 > data.maxPositions) {
      setWarn2(
        "Sorry the Max Positions you have entered is lesser than the current accepted applicants for this job opening !"
      );
      setTimeout(() => setWarn2(false), 3000);
    }
    if (mp1 == data.maxPositions) {
      axios
        .post(
          `/api/jobOpening/edit/${jobId}`,
          { maxPositions: data.maxPositions, state: "closed" },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          setWarn2("This job opening status will be changed to closed");
          setTimeout(() => setWarn2(false), 3000);
        })
        .catch((error) => {
          console.log(error);
          setErr(error);
          setTimeout(() => setErr(false), 3000);
        });


        var x;
        for (x = 0; x < delApplications.length; x++) {
          axios
          .post(
            `/api/application/edit/${delApplications[x].id}`,
            { state: "rejected" },
            {
              headers: { "Content-Type": "application/json" },
            }
          )
          .then((res) => {
            console.log(x,"is rejected");
          });
    
          console.log(delApplications[x].id);
        }
    }
    if (mp1 < data.maxPositions) {
      axios
        .post(
          `/api/jobOpening/edit/${jobId}`,
          { maxPositions: data.maxPositions },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          setWarn2("The Max Positions is updated!");
          setTimeout(() => setWarn2(false), 3000);
        })
        .catch((error) => {
          console.log(error);
          setErr(error);
          setTimeout(() => setErr(false), 3000);
        });
    }

    axios
    .post(
      `/api/jobOpening/edit/${jobId}`,
      { deadline: data.deadline },
      {
        headers: { "Content-Type": "application/json" },
      }
    )
    .then((res) => {
      
    })
    .catch((error) => {
      console.log(error);
      setErr(error);
      setTimeout(() => setErr(false), 3000);
    });

    setTimeout(() => refreshPage(), 3000);

    
  }
  if (jobState !== "closed") {
    return (
      <div>
        <Button color="primary" onClick={toggle}>
          Edit
        </Button>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Edit Job Opening</ModalHeader>
          {(warn) && <Alert color='light'>{warn && warn}</Alert>}
          {(warn2) && <Alert color='light'>{warn2 && warn2}</Alert>}
          <Form onSubmit={handleSubmit(onSub)}>
            <ModalBody>
              <FormGroup>
                <Label for="maxApplicants">Max Applicants</Label>
                <Input
                  name="maxApplicants"
                  type="number"
                  defaultValue={ma}
                  innerRef={register()}
                  invalid={errors.maxApplicants}
                />
                <FormFeedback>
                  {errors.maxApplicants && errors.maxApplicants.message}
                </FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="maxPositions">Max Positions</Label>
                <Input
                  name="maxPositions"
                  type="number"
                  defaultValue={mp}
                  innerRef={register()}
                  invalid={errors.maxPositions}
                />
                <FormFeedback>
                  {errors.maxPositions && errors.maxPositions.message}
                </FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="deadline">Deadline</Label>
                <Input
                  name="deadline"
                  type="date"
                  defaultValue={jobDeadline}
                  innerRef={register({required: true})}
                  invalid={errors.deadline}
                />
                <FormFeedback>
                  {errors.deadline && errors.deadline.message}
                </FormFeedback>
              </FormGroup>
              <hr />

              <Button class=" justify-content-end" color="primary">
                Edit
              </Button>
            </ModalBody>
          </Form>
        </Modal>
      </div>
    );
  }
  return <div></div>;
};

export default ModalExample;
