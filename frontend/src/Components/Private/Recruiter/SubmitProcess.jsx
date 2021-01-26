import { useState, useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory, Redirect } from "react-router-dom";
import { UserContext } from "App";
import axios from "axios";
import Navbar_R from "./Navbar";
import SortBarApplications from "./SortBarApplications";
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


function SubmitProcess({ jId, apId, aId, aState, mp, mp1 }) {


  const [delApplications, setDelApplications] = useState([]);
  const [delApps, setDelApps] = useState([]);
  var Dat = new Date();

  function refreshPage() {
    window.location.reload(false);
  }

  useEffect(() => {
    axios.get("/api/application/find").then((res) => {
      setDelApplications(
        res.data
          .filter(
            (d) =>
              d.jobOpening._id === jId &&
              d.applicant._id !== apId &&
              d.state !== "selected" &&
              d.state != "rejected"
          )
          .map((s) => ({ id: s._id }))
      );
      console.log(
        "delApplications",
        res.data
        .filter(
          (d) =>
            d.jobOpening._id === jId &&
            d.applicant._id !== apId &&
            d.state !== "selected" &&
            d.state != "rejected"
        )
        .map((s) => ({ id: s._id }))
      );

      setDelApps(
        res.data
          .filter((d) => d.jobOpening._id !== jId && d.applicant._id === apId)
          .map((s) => ({ id: s._id }))
      );
      console.log(
        "delApplicants",
        res.data
          .filter((d) => d.jobOpening._id !== jId && d.applicant._id === apId)
          .map((s) => ({ id: s._id }))
      );
    });
  }, [jId]);

  function shortlist(id) {
    axios
      .post(
        `/api/application/edit/${id}`,
        { state: "shortlisted" },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        console.log("shortlisted");
      });
    console.log(id);
    refreshPage();
  }

  function selected(id) {
    var x;
    if (mp1 + 1 >= mp) {
      axios
        .post(
          `/api/jobOpening/edit/${jId}`,
          { state: "closed" },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          console.log("job state changed to closed");
        });

        for (x = 0; x < delApplications.length; x++) {
          axios
          .post(
            `/api/application/edit/${delApplications[x].id}`,
            { state: "rejected" },
            {
              headers: { "Content-Type": "application/json" },
            }
          )
          .then((res) => {
            console.log(res,"is rejected");
          });
    
          console.log(delApplications[x].id);
        }
    }
    console.log("yahoo", delApplications);
    for (x = 0; x < delApps.length; x++) {
      axios
      .post(
        `/api/application/edit/${delApps[x].id}`,
        { state: "rejected" },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        console.log(res,"is rejected !!");
      });

      console.log(delApps[x].id);
    }

    axios
      .post(
        `/api/application/edit/${aId}`,
        { state: "selected", doj: Dat.toISOString() },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        console.log("selected");
      });
    console.log(aId);
    refreshPage();
  }

  if (aState === "applied") {
    return (
      <Button color="info" onClick={() => shortlist(aId)}>
        Shortlist
      </Button>
    );
  }
  return (
    <Button color="success" onClick={() => selected(aId)}>
      Select Applicant
    </Button>
  );
}

export default SubmitProcess;
