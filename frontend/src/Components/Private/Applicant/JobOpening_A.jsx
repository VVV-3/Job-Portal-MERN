import { useState, useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory, Redirect } from "react-router-dom";
import { UserContext } from "App";
import axios from "axios";
import Navbar_A from "./Navbar";
import { Container, Table, Alert, Button } from "reactstrap";
import "../../../App.css";

function JobOpenings_A() {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [openings, setOpenings] = useState([]);
  const [err, setErr] = useState(false);
  const [rating,setRating] = useState(0);

  useEffect(() => {
    axios
      .get("/api/jobOpening/find")
      .then((res) => {
        setOpenings(
          res.data
            .map((s) => ({
              postingDate: s.postingDate,
              title: s.title,
              recruiter_name: s.recruiter.name,
              salary:s.salary,
              duration:s.duration,
              date_deadline:s.deadline,
              rating:s.rating.numerator/(s.rating.denominator),
              state:s.state,
              mp:s.maxPositions,
              ma:s.maxApplicants
            }))
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
    <Container >
      <Navbar_A />
      {err && <Alert color="danger">{err}</Alert>}

      <h2 >Job Openings</h2>
      <body className='loginform'>
      {openings.map((user, ind) => (
        <ul key={ind} className='loginform2'>
          <li>Job Title: {user.title}</li>
          <li>Recruiter name: {user.recruiter_name}</li>
          <li>Recruiter email: {user.recruiter_email}</li>
          <li>Posting Date: {user.postingDate}</li>
          <li>Deadline: {user.deadline}</li>
          <li>Job Type: {user.jobType}</li>
          {/* <li>Skills Needed: {user.skills}</li> */}
          <li>Duration: {user.duration}</li>
          <li>Salary Offered: {user.salary}</li>
          <li>Maximum Applicants: {user.ma}</li>
          <li>Maximum Positions Available: {user.mp}</li>
          <li>Rating: {user.rating}</li>
          <Button>Apply</Button>

        </ul>
      ))}
      </body>

      {/* <Table size="small" className="loginform">
        <thead>
          <tr>
            
            <th>Job Title</th>
            <th>Recruiter Name</th>
            <th>Recruiter Email</th>
            <th>Job Type</th>
            <th>Skills Needed</th>
            <th>Job Rating</th>
            <th>Salary</th>
            <th>Duration</th>
            <th>Date Posted</th>
            <th>Deadline</th>
            <th>State</th>
            <th>Max Positions</th>
            <th>Max Applicants</th>
          </tr>
        </thead>
        <tbody>
          {openings.map((user, ind) => (
            <tr key={ind}>
              <td>{user.title}</td>
              <td>{user.recruiter_name}</td>
              <td>{user.recruiter_email}</td>
              <td>{user.jobType}</td>
              <td>{user.skills}</td>
              <td>{user.rating}</td>
              <td>{user.salary}</td>
              <td>{user.duration}</td>
              <td>{user.postingDate}</td>
              <td>{user.date_deadline}</td>
              <td>{user.state}</td>
              <td>{user.mp}</td>
              <td>{user.ma}</td>
              <Button>Apply</Button>
            </tr>
          ))}
        </tbody>
      </Table> */}
    </Container>
  );
}

export default JobOpenings_A;
