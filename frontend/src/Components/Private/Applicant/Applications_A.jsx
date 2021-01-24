import { useState, useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory, Redirect } from "react-router-dom";
import { UserContext } from "App";
import axios from "axios";
import Navbar_A from "./Navbar";
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
import "../../../App.css";
import Navbar_R from "../Recruiter/Navbar";
import userEvent from "@testing-library/user-event";

function Applications_A() {
  const { user, setUser } = useContext(UserContext);
  const [err, setErr] = useState(false);
  const [applications, setApplications] = useState(null);

  useEffect(() => {
    axios
      .get("/api/application/find", {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setApplications(
          res.data.filter(
            (o) =>
              o.jobOpening.state !== "closed" && o.applicant._id === user.id
          ).length
        );
      })
      .catch((error) => {
        console.log(error);
        setErr(error);
        setTimeout(() => setErr(false), 3000);
      });
  }, []);

  if (user.id === null) return <Redirect to="/" />;

  return (
    <Container>
      <Navbar_A />
      
    </Container>
  );
}

export default Applications_A;
