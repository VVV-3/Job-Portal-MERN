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
import Rate from "./Rate";

function Applications_A() {
  const { user, setUser } = useContext(UserContext);
  const [err, setErr] = useState(false);
  const [applications, setApplications] = useState([]);
  const [myApplication, setMyApplication] = useState(false);

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
          )
        );
        setMyApplication(
          res.data.filter(
            (o) => o.state === "selected" && o.applicant._id === user.id
          )
        );
        // console.log(
        //   res.data.filter(
        //     (o) =>
        //       o.jobOpening.state !== "closed" && o.applicant._id === user.id
        //   )
        // );
      })
      .catch((error) => {
        console.log(error);
        setErr(error);
        setTimeout(() => setErr(false), 3000);
      });
  }, []);

  if (user.id === null) return <Redirect to="/" />;
  if (myApplication[0]) {
    return (
      <Container>
        <Navbar_A />
        {err && <Alert color="danger">{err}</Alert>}
        <Row className="d-flex justify-content-center">
          {myApplication
            .map((o) => (
              <Col md={5}>
                <Card className="mb-5">
                  <CardHeader>
                    <h3> {o.jobOpening.title}</h3>
                  </CardHeader>
                  <CardBody>
                    <ul key="i">
                      <li>Date of Joining: {o.doj}</li>
                      <li>Recruiter Name: {o.jobOpening.recruiter.name}</li>
                      <li>Salary: &#x20B9; {o.jobOpening.salary}</li>
                    </ul>
                  </CardBody>
                  <CardFooter>
                    <Alert color="success">Selected</Alert>
                    <Rate
                      jobId={o.jobOpening._id}
                      applicationId={o._id}
                      arate={o.arate}
                      numerator={o.jobOpening.rating.numerator}
                      denominator={o.jobOpening.rating.denominator}
                    />
                  </CardFooter>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Navbar_A />
      {err && <Alert color="danger">{err}</Alert>}
      <Row className="d-flex justify-content-center">
        {applications
          .filter((d) => d.state === "shortlisted")
          .map((o) => (
            <Col md={5}>
              <Card className="mb-5">
                <CardHeader>
                  <h3> {o.jobOpening.title}</h3>
                </CardHeader>
                <CardBody>
                  <ul key="i">
                    <li>Date of Joining: {o.doj}</li>
                    <li>Recruiter Name: {o.jobOpening.recruiter.name}</li>
                    <li>Salary: &#x20B9; {o.jobOpening.salary}</li>
                  </ul>
                </CardBody>
                <CardFooter>
                  <Alert color="info">Shortlisted</Alert>
                </CardFooter>
              </Card>
            </Col>
          ))}
        {applications
          .filter((d) => d.state === "applied")
          .map((o) => (
            <Col md={5}>
              <Card className="mb-5">
                <CardHeader>
                  <h3> {o.jobOpening.title}</h3>
                </CardHeader>
                <CardBody>
                  <ul key="i">
                    <li>Date of Joining: {o.doj}</li>
                    <li>Recruiter Name: {o.jobOpening.recruiter.name}</li>
                    <li>Salary: &#x20B9; {o.jobOpening.salary}</li>
                  </ul>
                </CardBody>
                <CardFooter>
                  <Alert color="secondary">Applied</Alert>
                </CardFooter>
              </Card>
            </Col>
          ))}

        {applications
          .filter((d) => d.state === "rejected")
          .map((o) => (
            <Col md={5}>
              <Card className="mb-5">
                <CardHeader>
                  <h3> {o.jobOpening.title}</h3>
                </CardHeader>
                <CardBody>
                  <ul key="i">
                    <li>Date of Joining: {o.doj}</li>
                    <li>Recruiter Name: {o.jobOpening.recruiter.name}</li>
                    <li>Salary: &#x20B9; {o.jobOpening.salary}</li>
                  </ul>
                </CardBody>
                <CardFooter>
                  <Alert color="light">Rejected</Alert>
                </CardFooter>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
}

export default Applications_A;
