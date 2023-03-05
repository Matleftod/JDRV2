import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Gold from "./Gold";
import Prime from "./Prime";

const HealthBar = ({ name, currentHealth, maxHealth, gold, prime }) => {
  const healthPercentage = (currentHealth / maxHealth) * 100;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div><Prime name={name} prime={prime} /></div>
        <Gold gold={gold} name={name} />
      </div>
      <LinearProgress
        variant="determinate"
        value={healthPercentage}
        color={
          healthPercentage > 50 ? "success" : healthPercentage > 20 ? "warning" : "error"
        }
      />
      <div style={{ marginBottom: "25px" }}>PV : {currentHealth}/{maxHealth}</div>
    </div>
  );
};

export default HealthBar;
