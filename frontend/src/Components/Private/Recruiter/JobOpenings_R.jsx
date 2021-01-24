import { useState, useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory, Redirect } from "react-router-dom";
import { UserContext } from "App";
import "../../../App.css";
import axios from "axios";
import Navbar_R from "./Navbar";
import DeleteJobOpening_R from "./DeleteJobOpening_R";
import EditJobOpening_R from "./EditJobOpening_R";
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

function JobOpenings_R() {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [openings, setOpenings] = useState([]);
  const [err, setErr] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    axios
      .get("/api/jobOpening/find")
      .then((res) => {
        setOpenings(
          res.data.filter((d) => d.recruiter._id === user.id)
          // .map((s) => ({
          //   id:s._id,
          //   postingDate: s.postingDate,
          //   title: s.title,
          //   mp:s.maxPositions,
          //   ma:s.maxApplicants
          // }))
        );
      })
      .catch((err) => {
        setErr(err);
        console.log(err);
        setTimeout(() => setErr(false), 3000);
      });
  }, []);
  if (user.id === null) return <Redirect to="/" />;

  return (
    <Container>
      <Navbar_R />
      {err && <Alert color="danger">{err}</Alert>}
      <div className="justify-content-center">
        <h3>Your Job Openings</h3>
      </div>
      <Row className="d-flex justify-content-center">
        {openings.map((job, i) => (
          <Col md={5}>
            <Card className="mb-5">
              <CardHeader>
                <h3> {job.title}</h3>
              </CardHeader>
              <CardBody>
                <ul key="i">
                  <li>Current Applications : {job.maxApplicants}</li>
                  <li>Remaining Positions : {job.maxPositions}</li>
                  <li>DatePosted : {job.postingDate}</li>
                </ul>
              </CardBody>
              <CardFooter>
                <div
                  className="d-flex"
                  style={{ justifyContent: "space-around" }}
                >
                  <DeleteJobOpening_R
                    jobId={job._id}
                    jobState={job.state}
                    jobDeadline={job.deadline}
                  />
                  <EditJobOpening_R
                    jobId={job._id}
                    jobState={job.state}
                    jobDeadline={job.deadline}
                  />
                  <Button color="success">See Applications</Button>
                </div>
                <div className="justify-content-end"></div>
              </CardFooter>
            </Card>
          </Col>
        ))}
      </Row>
      {/* <div className='loginform'>
      {openings.map((user, ind) => (
        <ul key={ind} className='loginform2'>
          <li>Job Title: {user.title}</li>
          <li>Posting Date: {user.postingDate}</li>
          <li>Applicants: {user.ma}</li>
          <li>Positions Remaining: {user.mp}</li>
          <Button>Delete posting</Button>
          <Button>Edit Posting</Button>
          <Button>See Applicants</Button>

        </ul>
      ))}
      </div> */}
    </Container>
  );
}

export default JobOpenings_R;
