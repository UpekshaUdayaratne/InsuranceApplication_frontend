import { Tab, Tabs, Button, Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";

const InsuranceClaims = () => {
  const history = useHistory();
  const [key, setKey] = useState("ongoing");
  const [ongoingClaimList, setOngoingClaimList] = useState([]);
  const [completedClaimList, setCompletedClaimList] = useState([]);
  const getClaimList = (claimStatus) => {
    axios
      .get(`/${claimStatus}claimlist`)
      .then((response) => {
        if (claimStatus === "ongoing") setOngoingClaimList([...response.data]);
        else setCompletedClaimList([...response.data]);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const changeStatus = (id) => {
    axios
      .get(`/updateclaimstatus/${id}`)
      .then((res) => {
        alert("Claim completed");
        getClaimList("ongoing");
        getClaimList("completed");
      })
      .catch((error) => {
        // alert(error.message);
        console.log(error);
      });
  };
  useEffect(() => {
    getClaimList("ongoing");
    getClaimList("completed");
  }, []);
  return (
    <div
      style={{
        marginLeft: "15%",
        marginRight: "15%",
        marginTop: "50px",
        width: "70%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <Button
          variant="primary"
          onClick={() => history.push("/InsuranceClaims/AddClaim")}
        >
          Ceate New Claim
        </Button>
      </div>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
        <Tab eventKey="ongoing" title="Ongoing">
          <Table striped bordered hover size="lg">
            <thead>
              <tr>
                <th>#</th>
                <th>Customer Name</th>
                <th>Policy Plan</th>
                <th>Date</th>
                <th>Damage Value</th>
                <th>Agent</th>
                <th>Special Notes</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {ongoingClaimList.map((element) => {
                return (
                  <tr>
                    <td>{element.id}</td>
                    <td>{element.customerName}</td>
                    <td>{element.policyPlan}</td>
                    <td>{element.date}</td>
                    <td>{element.damageValue}</td>
                    <td>{element.agent}</td>
                    <td>{element.notes}</td>
                    <td>
                      <Button
                        variant="success"
                        onClick={() => changeStatus(element.id)}
                      >
                        Done
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="completed" title="Completed">
          <Table striped bordered hover size="lg">
            <thead>
              <tr>
                <th>#</th>
                <th>Customer Name</th>
                <th>Policy Plan</th>
                <th>Date</th>
                <th>Damage Value</th>
                <th>Agent</th>
                <th>Special Notes</th>
              </tr>
            </thead>
            <tbody>
              {completedClaimList.map((element) => {
                return (
                  <tr>
                    <td>{element.id}</td>
                    <td>{element.customerName}</td>
                    <td>{element.policyPlan}</td>
                    <td>{element.date}</td>
                    <td>{element.damageValue}</td>
                    <td>{element.agent}</td>
                    <td>{element.notes}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Tab>
      </Tabs>
    </div>
  );
};
export default InsuranceClaims;
