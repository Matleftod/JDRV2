import React from "react";
import LinearProgress from "@mui/material/LinearProgress";

const HealthBar = ({ name, currentHealth, maxHealth }) => {
  const healthPercentage = (currentHealth / maxHealth) * 100;

  return (
    <div>
      <div>{name}</div>
      <LinearProgress
        variant="determinate"
        value={healthPercentage}
        color={
          healthPercentage > 50 ? "success" : healthPercentage > 20 ? "warning" : "error"
        }
      />
      <div>{currentHealth}/{maxHealth}</div>
    </div>
  );
};

export default HealthBar;
