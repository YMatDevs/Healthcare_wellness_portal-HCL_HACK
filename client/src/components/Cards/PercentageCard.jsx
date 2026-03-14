import React from "react";
import { Card } from "react-bootstrap";

export const PercentageCard = ({ label, current, goal }) => {
  const percent = Math.round((current / goal) * 100);

  return (
    <Card className="shadow-sm text-center">
      <Card.Body>
        <div className="text-muted">{label}</div>

        <h4 className="fw-bold">
          {current} / {goal}
        </h4>

        <div className="text-success fw-semibold">
          {percent}% completed
        </div>
      </Card.Body>
    </Card>
  );
};