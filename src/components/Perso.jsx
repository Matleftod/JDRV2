import React, { useState, useEffect } from 'react';
import { Container, IconButton, List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import { db } from '../firebase';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    position: 'absolute',
    top: '80px',
    right: '10px',
    background: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '10px',
    "&:hover": {
      background: "transparent"
    }
  },
  personIcon: {
    color: 'white',
  },
  personList: {
    width: 'fit-content',
    margin: 'auto',
  },
  personItem: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    background: 'rgba(0, 0, 0, 0.85)',
    borderRadius: '10px',
    "&:hover": {
      background: "transparent"
    }
  },
}));

function Perso() {
  const classes = useStyles();
  const [characters, setCharacters] = useState([]);
  const [showCharacters, setShowCharacters] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await db.collection("personnage").get();
      const fetchedCharacters = querySnapshot.docs.map((doc) => doc.data());
      setCharacters(fetchedCharacters);
    };
    fetchData();
  }, []);

  const toggleCharacters = () => {
    setShowCharacters(!showCharacters);
  };

  return (
    <Container maxWidth="sm" className={classes.root}>
      <div className={classes.buttonContainer}>
        <IconButton onClick={toggleCharacters}>
          <PersonIcon className={classes.personIcon} />
        </IconButton>
      </div>
      {showCharacters && (
        <List className={classes.personList}>
          {characters.map((character, index) => (
            <ListItem className={classes.personItem} key={index}>
              <ListItemText primary={character.name} />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
}

export default Perso;