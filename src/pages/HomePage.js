import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";

const HomePage = () => {
  const history = useHistory();
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ marginTop: "200px", fontSize: "28px" }}>WELCOME !</div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "120px",
          }}
        >
          <div style={{ marginRight: "20px" }}>
            <Button
              variant="outline-info"
              size="lg"
              onClick={() => history.push("/PolicyPlans")}
            >
              Policy Plans
            </Button>
          </div>
          <div style={{ marginLeft: "20px", marginRight: "20px" }}>
            <Button variant="outline-info" size="lg">
              Branch Details
            </Button>
          </div>
          <div style={{ marginLeft: "20px" }}>
            <Button
              variant="outline-info"
              size="lg"
              onClick={() => history.push("/CustomerDetails")}
            >
              Customer Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
