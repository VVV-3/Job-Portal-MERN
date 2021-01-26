import { useState, useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory, Redirect } from "react-router-dom";
import { UserContext } from "App";
import "../../../App.css";
import axios from "axios";
import Navbar_R from "./Navbar";
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
  FormGroup,
  Label,
  Input,
} from "reactstrap";

function DeleteJobOpening_R({ jobId, jobState, jobDeadline }) {
  const history = useHistory();
  const [err, setErr] = useState(false);
  const [skills, setSkills] = useState([]);
  var dat = new Date()

  useEffect(() => {
    if (dat.toISOString > jobDeadline) {
      console.log('deadline crossed');
      // axios
      //   .post(
      //     `/api/jobOpening/edit/${jobId}`,
      //     {
      //       state: "closed",
      //     },
      //     {
      //       headers: { "Content-Type": "application/json" },
      //     }
      //   )
      //   .then((res) => {
      //     console.log("success!!");
      //     history.push("/jobOpenings_r");
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     setErr(error);
      //     setTimeout(() => setErr(false), 3000);
      //   });
    }
  }, [jobId]);
    console.log(jobState)
    if(jobState !== 'closed') {
        function deljo() {
            console.log("hoho");
            axios
              .post(
                `/api/jobOpening/edit/${jobId}`,
                {
                  state: "closed",
                },
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
          return <Button color='danger' onClick={() => deljo()}>Delete</Button>;
    }
    if(jobState === 'filled') return <Alert color='dark'>Filled</Alert>;
  return <Button color='warning'>Job Closed</Button>
}

export default DeleteJobOpening_R;
