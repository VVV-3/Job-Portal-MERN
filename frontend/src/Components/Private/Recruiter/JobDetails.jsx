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

function DeleteJobOpening_R({ jobId, jobState, jobPostingDate, ma, mp }) {
  const history = useHistory();
  const [err, setErr] = useState(false);
  const [ma1, setma1] = useState(null);
  const [mp1, setmp1] = useState(null);

  useEffect(() => {
    axios
      .get("/api/application/find")
      .then((res) => {
        console.log("success!!");
        setma1(res.data.filter((o) => o.jobOpening._id === jobId).length);
        setmp1(
          res.data.filter(
            (o) => o.jobOpening._id === jobId && o.state === "selected"
          ).length
        );
      })
      .catch((error) => {
        console.log(error);
        setErr(error);
        setTimeout(() => setErr(false), 3000);
      });
  }, []);
  console.log(jobState);
  if (jobState !== "closed") {
    return (
      <ul>
        <li>Current Applications : {ma1} / {ma}</li>
        <li>Remaining Positions : {mp - mp1} / {mp}</li>
        <li>DatePosted : {jobPostingDate}</li>
      </ul>
    );
  }
  return (
    <ul>
        <li>DatePosted : {jobPostingDate}</li>
    </ul>
  );
}

export default DeleteJobOpening_R;
