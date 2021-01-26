import { useState, useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory, Redirect } from "react-router-dom";
import { UserContext } from "App";
import axios from "axios";
import Navbar_R from "./Navbar";
import SortBarSelectedApplications from "./SortBarSelectedApplicants_R";
import SubmitProcess from "./SubmitProcess";
import Rate from "./Rate";
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
  const [applications, setApplications] = useState([]);
  const [err, setErr] = useState(false);
  const jobId = user.id;
  const [mp1, setMp1] = useState(null);
  var Dat = new Date();

  useEffect(() => {
    console.log("date", Date.now);
    axios
      .get("/api/application/find")
      .then((res) => {
        setApplications(
          res.data.filter(
            (d) =>
              d.state === "selected" && d.jobOpening.recruiter._id === jobId
          )
        );
      })
      .catch((err) => {
        setErr(err);
        console.log(err);
        setTimeout(() => setErr(false), 3000);
      });
  }, []);

  // sort states
  const [sortOrder, setSortOrder] = useState("default");
  const [descending, setDescending] = useState(false);

  const [filteredList, setFilteredList] = useState([]);

  // //sort logic
  useEffect(() => {
    const sortOrders = {
      name: (o) => o ,
      doj: (a, b) => a.doj - b.doj,
      rating: (a, b) =>
        a.applicant.rating.numerator / a.applicant.rating.denominator -
        b.applicant.rating.numerator / b.applicant.rating.denominator,
      default: (o) => o,
    };

    if (!applications) setFilteredList([]);

    if (descending) {
      setFilteredList(applications.sort(sortOrders[sortOrder]).reverse());
    } else {
      setFilteredList(applications.sort(sortOrders[sortOrder]));
    }

    console.log("object:", filteredList);
  }, [sortOrder, descending]);

  if (user.id === null) return <Redirect to="/" />;

  console.log("app", applications);

  return (
    <Container>
      <Navbar_R />
      {err && <Alert color="danger">{err}</Alert>}

      <br></br>
      <hr />
      <br></br>
      <SortBarSelectedApplications
        setSortOrder={setSortOrder}
        setDescending={setDescending}
        descending={descending}
      />
      <hr />
      <br></br>
      <div className="d-flex justify-content-center">
        <h3>Your Selected Applicants</h3>
      </div>
      <Row className="d-flex justify-content-center">
        {filteredList.map((a, i) => (
          <Col md={5}>
            <Card className="mb-5 loginform3">
              <CardHeader>
                <h3> {a.applicant.name}</h3>
              </CardHeader>
              <CardBody>
                <ul key="i">
                  {/* <li>
                    Applicant Skills :{" "}
                    {a.applicant.skills.map((s) => (
                      <span> {s.name} &nbsp;</span>
                    ))}
                  </li> */}
                  <li>Date of Joining: {a.doj}</li>
                  {/* <li>Education:</li> */}
                  <li>Job Title Accepted into : {a.jobOpening.title}</li>
                  <li>
                    Rating of Applicant :{" "}
                    {a.applicant.rating.numerator /
                      (a.applicant.rating.denominator || 1)}
                  </li>
                  {/* <li>Current Status : {a.state}</li> */}
                </ul>
              </CardBody>
              <CardFooter>
                <div className="d-flex justify-content-end">
                  <Rate
                    aId={a.applicant._id}
                    applicationId={a._id}
                    jrate={a.jrate}
                    numerator={a.applicant.rating.numerator}
                    denominator={a.applicant.rating.denominator}
                  />
                </div>
              </CardFooter>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default JobOpenings_A;
