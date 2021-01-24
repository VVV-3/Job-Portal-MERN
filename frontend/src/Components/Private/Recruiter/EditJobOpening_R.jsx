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

const ModalExample = ({ jobId, jobState, jobDeadline }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const history = useHistory();
  const { register, handleSubmit, errors, control } = useForm();
  const [err, setErr] = useState(false);

  function onSub(data) {
    console.log(data);
    axios
      .post(
        `/api/jobOpening/edit/${jobId}`,data,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
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
  if (jobState === "open") {
    return (
      <div>
        <Button color="primary" onClick={toggle}>
          Edit
        </Button>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Edit Job Opening</ModalHeader>
          <Form onSubmit={handleSubmit(onSub)}>
            <ModalBody>
              <FormGroup>
                <Label for="maxApplicants">Max Applicants</Label>
                <Input
                  name="maxApplicants"
                  type="number"
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
                  innerRef={register()}
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
