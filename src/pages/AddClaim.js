import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, FormControl, InputGroup, Button } from "react-bootstrap";

const AddClaim = () => {
  const [claimDetails, setClaimDetails] = useState({
    policyPlan: "",
    customerName: "",
    date: "",
    damageValue: "",
    agent: "",
    notes: "",
    status: "ongoing",
  });
  const [policynameList, setPolicynameList] = useState([]);
  const [customernameList, setCustomernameList] = useState([]);
  const handleChange = (e) => {
    setClaimDetails({
      ...claimDetails,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "policyPlan") {
      axios
        .get(`/customernames?policyPlan=${e.target.value}`)
        .then((response) => {
          let arr = [];
          arr = response.data.map((array) => `${array[0]} ${array[1]}`);
          setCustomernameList(arr);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };
  const getPolicynamesList = () => {
    axios
      .get("/policynames")
      .then((response) => {
        setPolicynameList(response.data);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const clear = () => {
    setClaimDetails({
      policyPlan: "",
      customerName: "",
      date: "",
      damageValue: "",
      agent: "",
      notes: "",
      status: "ongoing",
    });
    setCustomernameList([]);
  };
  const save = () => {
    const { policyPlan, customerName, date, damageValue, agent } = claimDetails;
    if (
      policyPlan !== "" &&
      customerName !== "" &&
      date !== "" &&
      damageValue !== "" &&
      agent !== ""
    ) {
      axios
        .post("/addclaim", claimDetails)
        .then((res) => {
          alert("Claim added sucessfully");
          clear();
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      alert("Insert missing details");
    }
  };
  useEffect(() => {
    getPolicynamesList();
  }, []);
  return (
    <div
      style={{
        margin: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ marginTop: "50px", width: "45%" }}>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1" className="w-25">
            Policy Plan
          </InputGroup.Text>
          <Form.Select
            name="policyPlan"
            value={claimDetails.policyPlan}
            onChange={handleChange}
          >
            <option value="">Select Plan</option>
            {policynameList.map((name) => {
              return <option value={name}>{name}</option>;
            })}
          </Form.Select>
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1" className="w-25">
            Customer Name
          </InputGroup.Text>
          <Form.Select
            name="customerName"
            value={claimDetails.customerName}
            onChange={handleChange}
          >
            <option value="">Select Customer (first select policy plan)</option>
            {customernameList.map((name) => {
              return <option value={name}>{name}</option>;
            })}
          </Form.Select>
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1" className="w-25">
            Date
          </InputGroup.Text>
          <FormControl
            placeholder="yyyy-mm-dd"
            name="date"
            value={claimDetails.date}
            onChange={handleChange}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1" className="w-25">
            Damage Value
          </InputGroup.Text>
          <FormControl
            name="damageValue"
            value={claimDetails.damageValue}
            onChange={handleChange}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1" className="w-25">
            Agent Name
          </InputGroup.Text>
          <FormControl
            name="agent"
            value={claimDetails.agent}
            onChange={handleChange}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1" className="w-25">
            Special Notes
          </InputGroup.Text>
          <FormControl
            name="notes"
            value={claimDetails.notes}
            onChange={handleChange}
          />
        </InputGroup>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: "40px",
          }}
        >
          <Button
            variant="secondary"
            style={{ marginRight: "20px" }}
            onClick={clear}
          >
            Clear
          </Button>
          {"  "}
          <Button variant="primary" onClick={save}>
            Add Claim
          </Button>
        </div>
      </div>
    </div>
  );
};
export default AddClaim;
