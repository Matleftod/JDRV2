import React, { useState, useEffect } from "react";
import {
  Modal,
  Backdrop,
  Fade,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { db } from '../firebase';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ModalStat = ({ open, handleClose, characterId }) => {
  const classes = useStyles();
  const [characterName, setCharacterName] = useState("");

  useEffect(() => {
    if (open && characterId) {
      db.collection("personnage")
        .where("name", "==", characterId)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setCharacterName(doc.data());
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  }, [open, characterId]);
  

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <Typography variant="h4">{characterName}</Typography>
        </div>
      </Fade>
    </Modal>
  );
};

export default ModalStat;
