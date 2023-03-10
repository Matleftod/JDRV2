import React, { useEffect, useState } from "react";
import { db } from '../firebase';
//import { doc, getDoc } from "firebase/firestore";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Drawer,
  makeStyles,
  Modal,
  Backdrop,
  Fade,
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import ModalStat from "./ModalStats";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    background: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '10px',
  },
  list: {
    width: 250,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
  },
}));

const BurgerMenu = () => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedChar, setSelectedChar] = useState("");
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await db.collection("personnage").get();
      setCharacters(data.docs.map((doc) => doc.data().name));
    };
    fetchData();
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleModalOpen = (char) => {
    setSelectedChar(char);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {characters.map((char) => (
          <ListItem button key={char} onClick={() => handleModalOpen(char)}>
            <ListItemText primary={char} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <IconButton
        edge="start"
        className={`${classes.menuButton} burgerMenu`}
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
      <Modal
        className={classes.modal}
        open={modalOpen}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <div className={classes.paper}>
            <ModalStat open={modalOpen} char={selectedChar} />
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default BurgerMenu;
