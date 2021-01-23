import { useState, useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory, Redirect } from "react-router-dom";
import { UserContext } from "App";
import axios from "axios";
import Navbar_R from "./Navbar";
import { Container, Table, Alert } from "reactstrap";

function JobOpenings_R() {
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
            .filter((d) => d.recruiter._id === user.id)
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
    <Container fluid>
      <Navbar_R />
      {err && <Alert color="danger">{err}</Alert>}
      <Table size="small">
        <thead>
          <tr>
            <th>Date Posted</th>
            <th>Job Title</th>
            <th>Recruiter Name</th>
            <th>Job Rating</th>
            <th>Salary</th>
            <th>Duration</th>
            <th>Deadline</th>
            <th>State</th>
            <th>Max Positions</th>
            <th>Max Applicants</th>
          </tr>
        </thead>
        <tbody>
          {openings.map((user, ind) => (
            <tr key={ind}>
              <td>{user.postingDate}</td>
              <td>{user.title}</td>
              <td>{user.recruiter_name}</td>
              <td>{user.rating}</td>
              <td>{user.salary}</td>
              <td>{user.duration}</td>
              <td>{user.date_deadline}</td>
              <td>{user.state}</td>
              <td>{user.mp}</td>
              <td>{user.ma}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default JobOpenings_R;
