import { useState, useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory, Redirect } from "react-router-dom";
import { UserContext } from "App";
import "../../../App.css";
import axios from "axios";
import Navbar_R from "./Navbar";
import DeleteJobOpening_R from "./DeleteJobOpening_R";
import EditJobOpening_R from "./EditJobOpening_R";
import JobDetails from "./JobDetails";
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
  const [resdata, setresdata] = useState([]);

  function viewjob(data) {
    localStorage.setItem("jobOpeningId", data);
    history.push("/applications_r");
  }

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

    axios
      .get("/api/application/find")
      .then((res) => {
        console.log("got all applications - success!!");
        setresdata(res.data);
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
      <Navbar_R />
      {err && <Alert color="danger">{err}</Alert>}
      <div className="d-flex justify-content-center">
        <br></br>
        <h3>Your Job Openings</h3>
      </div>
      <Row className="d-flex justify-content-center">
        {openings.reverse().map((job, i) => (
          <Col md={5}>
            <Card className="mb-5 loginform3">
              <CardHeader>
                <h3> {job.title}</h3>
              </CardHeader>
              <CardBody>
                <JobDetails
                  jobId={job._id}
                  jobState={job.state}
                  ma={job.maxApplicants}
                  mp={job.maxPositions}
                  jobPostingDate={job.postingDate}
                  resdata={resdata}
                />
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
                    ma={job.maxApplicants}
                    mp={job.maxPositions}
                    jobDeadline={job.deadline}
                    resdata = {resdata}
                  />

                  <Button
                    type="button"
                    color="success"
                    onClick={() => viewjob(job._id)}
                  >
                    View Applicants
                  </Button>
                </div>
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
