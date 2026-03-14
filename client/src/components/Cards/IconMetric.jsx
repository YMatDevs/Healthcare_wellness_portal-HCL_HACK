
import React from "react";
import { Card } from "react-bootstrap";

export const IconMetric = ({ icon, title, value }) => {
  return (
    <Card className="shadow-sm">
      <Card.Body className="d-flex align-items-center">
        <div
          className="bg-primary text-white rounded p-3 me-3 d-flex align-items-center justify-content-center"
          style={{ width: 50, height: 50 }}
        >
          {icon}
        </div>

        <div>
          <div className="text-muted">{title}</div>
          <h5 className="fw-bold mb-0">{value}</h5>
        </div>
      </Card.Body>
    </Card>
  );
};