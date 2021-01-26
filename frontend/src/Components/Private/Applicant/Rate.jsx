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

const ModalExample = ({ jobId, applicationId, arate, numerator, denominator }) => {
    const [modal, setModal] = useState(false);
    const [loading, setloading] = useState(false);
    const toggle = () => setModal(!modal);
    const history = useHistory();
    const { register, handleSubmit, errors, control } = useForm();
    const [err, setErr] = useState(false);
    const [rating, setRating ] = useState(null);
    // const [denominator, setDenominator] = useState(null);
    // const [numerator, setNumerator] = useState(null);
  
    function onSub(data) {
      axios
        .post(`/api/application/edit/${applicationId}`, {
            arate: true
        }, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
          setErr(error);
          setTimeout(() => setErr(false), 3000);
        });

        axios
        .post(`/api/jobOpening/edit/${jobId}`, {
            rating : {
                numerator: rating+numerator,
                denominator: denominator + 1
            }

        }, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log("success!!");
        })
        .catch((error) => {
          console.log(error);
          setErr(error);
          setTimeout(() => setErr(false), 3000);
        });
    console.log(jobId,applicationId);
  
      history.push("/");
    }
    console.log(numerator,denominator);


    if (!arate) {
      return (
        <div>
          <Button color="info" onClick={toggle}>
            Rate
          </Button>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Rate this job</ModalHeader>
            <Form onSubmit={handleSubmit(onSub)}>
              <ModalBody>
                {/* <FormGroup>
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
                </FormGroup> */}
                <FormGroup tag="fieldset">
                <FormGroup check className="my-2">
                <div className="ml-2">Rating</div>
                  <Label check>
                      <>1</>
                    <Input
                      type="radio"
                      name="rating"
                      onChange={() => setRating(1)}
                    />
                  </Label>
                </FormGroup>
                <FormGroup check className="my-2">
                  <Label check>
                  <>2</>
                    <Input
                      type="radio"
                      name="rating"
                      onChange={() => setRating(2)}
                    />
                  </Label>
                </FormGroup>
                <FormGroup check className="my-2">
                  <Label check>
                  <>3</>
                    <Input
                      type="radio"
                      name="rating"
                      onChange={() => setRating(3)}
                    />
                  </Label>
                </FormGroup>
                <FormGroup check className="my-2">
                  <Label check>
                  <>4</>
                    <Input
                      type="radio"
                      name="rating"
                      onChange={() => setRating(4)}
                    />
                  </Label>
                </FormGroup>
                <FormGroup check className="my-2">
                  <Label check>
                  <>5</>
                    <Input
                      type="radio"
                      name="rating"
                      onChange={() => setRating(5)}
                    />
                  </Label>
                </FormGroup>
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
    return <></>;
  };
  
  export default ModalExample;