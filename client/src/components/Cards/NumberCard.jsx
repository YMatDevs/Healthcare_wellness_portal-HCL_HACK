import React from "react";
import { Card } from "react-bootstrap";

export const NumberCard = ({ title, value, unit }) => {
  return (
    <Card className="shadow-sm text-center p-3">
      <Card.Body>
        <div className="text-muted">{title}</div>

        <h2 className="fw-bold mt-2">
          {value} <span className="fs-6 text-muted">{unit}</span>
        </h2>
      </Card.Body>
    </Card>
  );
};