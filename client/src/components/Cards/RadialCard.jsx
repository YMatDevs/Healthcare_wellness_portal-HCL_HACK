import React from "react";
import { Card } from "react-bootstrap";

export const RadialCard = ({ title, value, max }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progress = value / max;
  const offset = circumference - progress * circumference;

  return (
    <Card className="shadow-sm text-center p-3">
      <Card.Body>
        <svg width="120" height="120">
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#e9ecef"
            strokeWidth="10"
            fill="none"
          />

          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#0d6efd"
            strokeWidth="10"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 60 60)"
          />

          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="18"
            fontWeight="bold"
          >
            {value}
          </text>
        </svg>

        <div className="mt-2 text-muted">{title}</div>
      </Card.Body>
    </Card>
  );
};