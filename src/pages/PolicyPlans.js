import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button, InputGroup, FormControl } from "react-bootstrap";

const PolicyPlans = () => {
  const [policyList, setPolicyList] = useState([]);
  const [mode, setMode] = useState("");
  const [state, setState] = useState(false);
  const [policyDetails, setPolicyDetails] = useState({
    planName: "",
    description: "",
    coverage: "",
    noofyears: "",
  });
  const clear = () => {
    setPolicyDetails({
      planName: "",
      description: "",
      coverage: "",
      noofyears: "",
    });
  };
  const getPolicyList = () => {
    axios
      .get("/policyplanlist")
      .then((response) => {
        setPolicyList([...response.data]);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleChange = (e) => {
    setPolicyDetails({
      ...policyDetails,
      [e.target.name]: e.target.value,
    });
  };
  const editPolicy = (id) => {
    setState(true);
    setMode("edit");
    setPolicyDetails(policyList.find((obj) => obj.id === id));
  };
  const save = () => {
    if (mode === "add") {
      axios
        .post("/addpolicyplan", policyDetails)
        .then((res) => {
          alert("Policy plan added sucessfully");
          getPolicyList();
          clear();
          setState(false);
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      axios
        .post("/updatepolicyplan", policyDetails)
        .then((res) => {
          alert("Policy plan updated sucessfully");
          getPolicyList();
          clear();
          setState(false);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };
  useEffect(() => {
    getPolicyList();
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
      <div style={{ width: "80%" }}>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Policy Plan</th>
              <th>Description</th>
              <th>Coverage</th>
              <th>Years</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {policyList.map((element) => {
              return (
                <tr>
                  <td>{element.id}</td>
                  <td>{element.planName}</td>
                  <td>{element.description}</td>
                  <td>{element.coverage}</td>
                  <td>{element.noofyears}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => editPolicy(element.id)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <div>
        <Button
          variant="primary"
          onClick={() => {
            setMode("add");
            setState(true);
            clear();
          }}
        >
          Add Policy Plan
        </Button>
      </div>

      {state ? (
        <div style={{ marginTop: "50px", width: "30%" }}>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1" className="w-25">
              Policy Plan
            </InputGroup.Text>
            <FormControl
              name="planName"
              value={policyDetails.planName}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1" className="w-25">
              Description
            </InputGroup.Text>
            <FormControl
              name="description"
              value={policyDetails.description}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1" className="w-25">
              Coverage
            </InputGroup.Text>
            <FormControl
              name="coverage"
              value={policyDetails.coverage}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1" className="w-25">
              Years
            </InputGroup.Text>
            <FormControl
              name="noofyears"
              value={policyDetails.noofyears}
              onChange={handleChange}
            />
          </InputGroup>
          <div style={{ display: "flex", flexDirection: "row-reverse" }}>
            <Button variant="primary" onClick={save}>
              Save
            </Button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PolicyPlans;
