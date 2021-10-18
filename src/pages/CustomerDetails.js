import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Button,
  InputGroup,
  FormControl,
  Dropdown,
  Form,
} from "react-bootstrap";

const CustomerDetails = () => {
  const [customerList, setCustomerList] = useState([]);
  const [mode, setMode] = useState("");
  const [state, setState] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    firstName: "",
    lastName: "",
    monthlySalary: "",
    phoneNum: "",
    branch: "",
    policyPlan: "",
  });
  const clear = () => {
    setCustomerDetails({
      firstName: "",
      lastName: "",
      monthlySalary: "",
      phoneNum: "",
      branch: "",
      policyPlan: "",
    });
  };
  const getCustomerList = () => {
    axios
      .get("/customerlist")
      .then((response) => {
        setCustomerList([...response.data]);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const handleChange = (e) => {
    setCustomerDetails({
      ...customerDetails,
      [e.target.name]: e.target.value,
    });
  };
  const editCustomer = (id) => {
    setState(true);
    setMode("edit");
    setCustomerDetails(customerList.find((obj) => obj.id === id));
  };
  const deleteCustomer = (id) => {
    axios
      .post(
        "/deletecustomer",
        customerList.find((obj) => obj.id === id)
      )
      .then((res) => {
        alert("Customer deleted sucessfully");
        getCustomerList();
        setState(false);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const save = () => {
    if (mode === "add") {
      axios
        .post("/addcustomer", customerDetails)
        .then((res) => {
          alert("Customer added sucessfully");
          getCustomerList();
          clear();
          setState(false);
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      axios
        .post("/updatecustomer", customerDetails)
        .then((res) => {
          alert("Customer updated sucessfully");
          getCustomerList();
          clear();
          setState(false);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };
  useEffect(() => {
    getCustomerList();
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
              <th>First Name</th>
              <th>Last Name</th>
              <th>Monthly Salary</th>
              <th>Phone Number</th>
              <th>Branch</th>
              <th>Policy Plan</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {customerList.map((element) => {
              return (
                <tr>
                  <td>{element.id}</td>
                  <td>{element.firstName}</td>
                  <td>{element.lastName}</td>
                  <td>{element.monthlySalary}</td>
                  <td>{element.phoneNum}</td>
                  <td>{element.branch}</td>
                  <td>{element.policyPlan}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => editCustomer(element.id)}
                    >
                      Edit
                    </Button>
                    {"  "}
                    <Button
                      variant="danger"
                      onClick={() => deleteCustomer(element.id)}
                    >
                      Delete
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
          Add Customer
        </Button>
      </div>

      {state ? (
        <div style={{ marginTop: "50px", width: "35%" }}>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1" className="w-25">
              First Name
            </InputGroup.Text>
            <FormControl
              name="firstName"
              value={customerDetails.firstName}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1" className="w-25">
              Last Name
            </InputGroup.Text>
            <FormControl
              name="lastName"
              value={customerDetails.lastName}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1" className="w-25">
              Monthly Salary
            </InputGroup.Text>
            <FormControl
              name="monthlySalary"
              value={customerDetails.monthlySalary}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1" className="w-25">
              Phone Number
            </InputGroup.Text>
            <FormControl
              name="phoneNum"
              value={customerDetails.phoneNum}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1" className="w-25">
              Branch
            </InputGroup.Text>
            <FormControl
              name="branch"
              value={customerDetails.branch}
              onChange={handleChange}
            />
            {/* <Dropdown>
              <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                Dropdown Button
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1" className="w-25">
              Policy Plan
            </InputGroup.Text>
            {/* <FormControl
              name="policyPlan"
              value={customerDetails.policyPlan}
              onChange={handleChange}
            /> */}
            <Form.Select>
              <option>Default select</option>
            </Form.Select>
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
export default CustomerDetails;
