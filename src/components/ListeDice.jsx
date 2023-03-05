import React, { useState } from "react";
import { IconButton, Typography } from "@material-ui/core";
import { MdCasino, MdLooksOne, MdHelpOutline } from "react-icons/md";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    position: "absolute",
    background: "rgba(0, 0, 0, 0.5)",
    bottom: "0px",
    borderRadius: "10px",
    "&:hover": {
      background: "transparent",
    },
  },
  d100: {
    right: "150px",
  },
  d20: {
    right: "80px",
  },
  djsp: {
    right: "10px",
  },
  result: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    padding: "20px",
    background: "rgba(0, 0, 0, 0.7)",
    zIndex: "1000",
    "& h6": {
      margin: 0,
      fontSize: "48px",
      fontWeight: "bold",
      color: "white",
    },
  },
}));

const ListeDice = () => {
  const classes = useStyles();
  const [result, setResult] = useState(null);

  const handleRollDice = (type) => {
    const min = 1;
    let max;
    if (type === "d100") {
      max = 100;
    } else if (type === "d20") {
      max = 20;
    } else {
      max = parseInt(type.substring(1));
    }
    setResult(Math.floor(Math.random() * (max - min + 1)) + min);
  };

  const handleCloseResult = () => {
    setResult(null);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <IconButton
          color="primary"
          aria-label="D100"
          className={`${classes.buttonContainer} ${classes.d100}`}
          onClick={() => handleRollDice("d100")}
        >
          <MdCasino />
        </IconButton>
        <IconButton
          color="primary"
          aria-label="D20"
          className={`${classes.buttonContainer} ${classes.d20}`}
          onClick={() => handleRollDice("d20")}
        >
          <MdLooksOne />
        </IconButton>
        <IconButton
          color="primary"
          aria-label="D?"
          className={`${classes.buttonContainer} ${classes.djsp}`}
          onClick={() => {
            const custom = window.prompt("Enter dice number:");
            if (custom) handleRollDice(`d${custom}`);
          }}
        >
          <MdHelpOutline />
        </IconButton>
      </div>
      {result && (
        <div className={classes.result} onClick={handleCloseResult}>
          <Typography variant="h6">{result}</Typography>
          <Typography variant="subtitle1">Click to close</Typography>
        </div>
      )}
    </>
  );
};

export default ListeDice;