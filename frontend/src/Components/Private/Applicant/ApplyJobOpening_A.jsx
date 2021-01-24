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

const ModalExample = ({ jobId, applicantId, jobState }) => {
  const [modal, setModal] = useState(false);
  const [loading, setloading] = useState(false);
  const toggle = () => setModal(!modal);
  const history = useHistory();
  const { register, handleSubmit, errors, control } = useForm();
  const [err, setErr] = useState(false);
  const [applicationsNo, setApplicationsNo] = useState(null);
  const [myApplication, setMyApplication] = useState(false);

  function onSub(data) {
    console.log(data);
    axios
      .post(`/api/application/add/${applicantId}/${jobId}`, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log("success!!");
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
        setErr(error);
        setTimeout(() => setErr(false), 3000);
      });
  }

  useEffect(() => {
    axios
      .get("/api/application/find", {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(
          res.data.filter(
            (o) =>
              o.jobOpening.state !== "closed" &&
              o.jobOpening._id === jobId &&
              o.applicant._id === applicantId
          )
        );
        setApplicationsNo(
          res.data.filter(
            (o) =>
              o.jobOpening.state !== "closed" &&
              o.applicant._id === applicantId &&
              o.state !== "rejected"
          ).length
        );
        setMyApplication(
          res.data.filter(
            (o) =>
              o.jobOpening.state !== "closed" &&
              o.jobOpening._id === jobId &&
              o.applicant._id === applicantId
          )
        );
      })
      .catch((error) => {
        console.log(error);
        setErr(error);
        setTimeout(() => setErr(false), 3000);
      });
  }, []);
  if (jobState == "filled") return <Alert color="light">Job Filled</Alert>;
  if (jobState === "open") {
    console.log("no", applicationsNo);
    console.log("ids", applicantId, jobId);
    console.log("hehe", myApplication);
    if (applicationsNo > 10)
      return (
        <Alert color="dark">You already have 10 active applications</Alert>
      );
    if (myApplication[0])
      return <Alert color="dark">{myApplication[0].state}</Alert>;
    return (
      <div>
        <Button color="success" onClick={toggle}>
          Apply
        </Button>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Edit Job Opening</ModalHeader>
          <Form onSubmit={handleSubmit(onSub)}>
            <ModalBody>
              <FormGroup>
                <Label for="sop">Statement Of Purpose</Label>
                <Input
                  name="sop"
                  type="textarea"
                  innerRef={register({ required: true })}
                  invalid={errors.sop}
                />
                <FormFeedback>
                  {errors.maxApplicants && errors.maxApplicants.message}
                </FormFeedback>
              </FormGroup>
              <hr />

              <Button class=" justify-content-end" color="success">
                Submit
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
