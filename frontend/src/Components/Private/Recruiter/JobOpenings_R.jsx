import { useState, useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory, Redirect } from "react-router-dom";
import { UserContext } from "App";
import '../../../App.css';
import axios from "axios";
import Navbar_R from "./Navbar";
import { Container, Table, Alert,Button } from "reactstrap";

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
      <Navbar_R />
      {err && <Alert color="danger">{err}</Alert>}
      <h2 >Your Job Openings</h2>
      <body className='loginform'>
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
      </body>
      
      {/* <Table size="small">
        <thead>
          <tr>
            <th>Date Posted</th>
            <th>Job Title</th>
            <th>Max Positions</th>
            <th>Max Applicants</th>
          </tr>
        </thead>
        <tbody>
          {openings.map((user, ind) => (
            <tr key={ind}>
              <td>{user.postingDate}</td>
              <td>{user.title}</td>
              <td>{user.mp}</td>
              <td>{user.ma}</td>
            </tr>
          ))}
        </tbody>
      </Table> */}
    </Container>
  );
}

export default JobOpenings_R;
