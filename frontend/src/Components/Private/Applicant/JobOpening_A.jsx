import { useState, useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory, Redirect } from "react-router-dom";
import { UserContext } from "App";
import axios from "axios";
import Navbar_A from "./Navbar";
import SortFilterbar from "./SortFilterbar";
import ApplyJobOpening from "./ApplyJobOpening_A";
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

function JobOpenings_A() {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [openings, setOpenings] = useState([]);
  const [err, setErr] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    axios
      .get("/api/jobOpening/find")
      .then((res) => {
        console.log(res.data);
        setOpenings(
          res.data
            .filter((d) => d.state !== "closed")
            .map((s) => ({
              jobId: s._id,
              postingDate: s.postingDate,
              title: s.title,
              recruiter_name: s.recruiter.name,
              recruiter_email: s.recruiter.email,
              skills: s.skills,
              salary: s.salary,
              jobType: s.jobType,
              duration: s.duration,
              deadline: s.deadline,
              rating: s.rating.numerator / (s.rating.denominator || 1),
              state: s.state,
              mp: s.maxPositions,
              ma: s.maxApplicants,
            }))
        );
      })
      .catch((err) => {
        setErr(err);
        console.log(err);
        setTimeout(() => setErr(false), 3000);
      });
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  // sort states
  const [sortOrder, setSortOrder] = useState('default');
  const [descending, setDescending] = useState(false);

  // filter states
  const jobTypes = new Set(["part_time", "full_time", "work_from_home"]);
  const [typeFilter, setTypeFilter] = useState(jobTypes);
  const [salaryFilter, setSalaryFilter] = useState({
    from: -Infinity,
    to: Infinity,
  });
  const [durationFilter, setDurationFilter] = useState(7);

  const [filteredList, setFilteredList] = useState([]);
  // useEffect(() => !jobs.loading && setFilteredList(jobs.data), [
  //   jobs.data,
  //   jobs.loading,
  // ]);

  //searchbar + filter + sort logic
  useEffect(() => {
    const sortOrders = {
      salary: (a, b) => a.salary - b.salary,
      duration: (a, b) => a.duration - b.duration,
      rating: (a, b) => a.rating.value - b.rating.value,
      default: (o) => o,
    };

    if (!openings) return [];

    if (descending) {
      setFilteredList(
        openings
          .filter((o) =>
            o.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .filter((o) => typeFilter.has(o.jobType))
          .filter(
            (o) => salaryFilter.from <= o.salary && o.salary <= salaryFilter.to
          )
          .filter((o) => o.duration < durationFilter)
          .sort(sortOrders[sortOrder])
          .reverse()
      );
    } else {
      setFilteredList(
        openings
          .filter((o) =>
            o.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .filter((o) => typeFilter.has(o.jobType))
          .filter(
            (o) => salaryFilter.from <= o.salary && o.salary <= salaryFilter.to
          )
          .filter((o) => o.duration < durationFilter)
          .sort(sortOrders[sortOrder])
      );
    }

    console.log("object:", filteredList);
  }, [
    searchTerm,
    sortOrder,
    descending,
    typeFilter,
    salaryFilter,
    durationFilter,
    openings,
  ]);

  if (user.id === null) return <Redirect to="/" />;

  return (
    <Container>
      <Navbar_A />
      {err && <Alert color="danger">{err}</Alert>}
      <br></br>
      <hr />
      <br></br>
      <SortFilterbar
        setSearchTerm={setSearchTerm}
        setSortOrder={setSortOrder}
        setDescending={setDescending}
        descending={descending}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        salaryFilter={salaryFilter}
        setSalaryFilter={setSalaryFilter}
        setDurationFilter={setDurationFilter}
      />
      <hr />
      <br></br>
      <Row className="d-flex justify-content-center">
        {filteredList.reverse().map((job, i) => (
          <Col md={5}>
            <Card className="mb-5">
              <CardHeader>
                <h3> {job.title}</h3>
              </CardHeader>
              <CardBody>
                <ul key="i">
                  <li>Recruiter Name: {job.recruiter_name}</li>
                  <li>Recruiter Email : {job.recruiter_email}</li>
                  <li>Max Applications : {job.ma}</li>
                  <li>Max Positions : {job.mp}</li>
                  <li>DatePosted : {job.postingDate}</li>
                  <li>Application Deadline : {job.deadline}</li>
                  <li>
                    Required Skills :{" "}
                    {job.skills.map((s) => (
                      <span> {s.name} &nbsp;</span>
                    ))}
                  </li>
                  <li>Job Type : {job.jobType}</li>
                  <li>Duration: {job.duration}</li>
                  <li>Rating: {job.rating}</li>
                </ul>
              </CardBody>
              <CardFooter>
                <h4>&#x20B9; {job.salary}</h4>

                <div className="d-flex justify-content-end">
                  <ApplyJobOpening
                    jobId={job.jobId}
                    applicantId={user.id}
                    jobState={job.state}
                    jobMaxApplicants={job.ma}
                  />
                </div>
              </CardFooter>
            </Card>
          </Col>
        ))}
      </Row>
      {/* <div className="loginform">
        {filteredList.map((job, ind) => (
          <ul key={ind} className="loginform2">
            <li>Job Title: {user.title}</li>
            <li>Recruiter name: {user.recruiter_name}</li>
            <li>Recruiter email: {user.recruiter_email}</li>
            <li>Posting Date: {user.postingDate}</li>
            <li>Deadline: {user.date_deadline}</li>
            <li>Job Type: {user.jobType}</li>
            <li>
              Skills Needed:{" "}
              {user.skills.map((s) => (
                <span> {s.name} &nbsp;</span>
              ))}
            </li>
            <li>Duration: {user.duration}</li>
            <li>Salary Offered: {user.salary}</li>
            <li>Maximum Applicants: {user.ma}</li>
            <li>Maximum Positions Available: {user.mp}</li>
            <li>Rating: {user.rating}</li>
            <Button>Apply</Button>
          </ul>
        ))}
      </div> */}
    </Container>
  );
}

export default JobOpenings_A;
