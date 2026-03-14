import React from "react";
import { Card, ProgressBar } from "react-bootstrap";

export const ProgressCard = ({ label, value, max }) => {
  const percent = (value / max) * 100;

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-muted">{label}</span>
          <strong>{value}</strong>
        </div>

        <ProgressBar now={percent} style={{ height: "10px" }} />

        <small className="text-muted">{Math.round(percent)}% of goal</small>
      </Card.Body>
    </Card>
  );
};