import React from "react";
import { Typography } from "@material-ui/core";

const DiceHistory = ({ rolls }) => {
  return (
    <div style={{ position: "fixed", right: "0", top: "100px" }}>
      <Typography variant="h6" style={{ marginBottom: "10px" }}>
        Rolls History
      </Typography>
      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        {rolls.map((roll, index) => (
          <Typography key={index}>
            {`${roll.type} : ${roll.result}`}
          </Typography>
        ))}
      </div>
    </div>
  );
};

export default DiceHistory;