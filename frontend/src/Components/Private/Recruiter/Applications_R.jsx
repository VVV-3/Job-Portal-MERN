import { useState, useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory, Redirect } from "react-router-dom";
import { UserContext } from "App";
import axios from "axios";
import Navbar_R from "./Navbar";
import SortBarApplications from "./SortBarApplications";
import SubmitProcess from "./SubmitProcess";
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
  const jobId = localStorage.getItem("jobOpeningId");
  const [mp1, setMp1] = useState(null);

  function rejectjob(id) {
    axios
      .post(
        `/api/application/edit/${id}`,
        { state: "rejected" },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        console.log("rejected");
      });
    console.log(id);
    //refreshPage();
  }

  useEffect(() => {
    axios
      .get("/api/application/find")
      .then((res) => {
        setApplications(
          res.data.filter(
            (d) =>
              d.state !== "rejected" &&
              d.state !== "selected" &&
              d.jobOpening._id === jobId
          )
        );
        setMp1(
          res.data.filter(
            (d) => d.state === "selected" && d.jobOpening._id === jobId
          ).length
        );
        console.log(
          "hehe",
          res.data.filter(
            (d) => d.state === "selected" && d.jobOpening._id === jobId
          ).length
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
      name: (o) => o,
      doa: (a, b) => a.doa - b.doa,
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
      <SortBarApplications
        setSortOrder={setSortOrder}
        setDescending={setDescending}
        descending={descending}
      />
      <hr />
      <br></br>
      <Row className="d-flex justify-content-center">
        {filteredList.map((a, i) => (
          <Col md={5}>
            <Card className="mb-5">
              <CardHeader>
                <h3> {a.applicant.name}</h3>
              </CardHeader>
              <CardBody>
                <ul key="i">
                  <li>
                    Applicant Skills :{" "}
                    {a.applicant.skills.map((s) => (
                      <span> {s.name} &nbsp;</span>
                    ))}
                  </li>
                  <li>Date of Application: {a.doa}</li>
                  {/* <li>Education:</li> */}
                  <li>SOP : {a.sop}</li>
                  <li>
                    Rating :{" "}
                    {a.applicant.rating.numerator /
                      (a.applicant.rating.denominator || 1)}
                  </li>
                  <li>Current Status : {a.state}</li>
                </ul>
              </CardBody>
              <CardFooter>
                <div className="d-flex justify-content-end">
                  <Button color="danger" onClick={() => rejectjob(a._id)}>
                    Reject
                  </Button>
                  <SubmitProcess
                    jId={jobId}
                    apId={a.applicant._id}
                    aId={a._id}
                    aState={a.state}
                    mp={a.jobOpening.maxPositions}
                    mp1={mp1}
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
