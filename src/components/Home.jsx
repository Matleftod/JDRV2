import React, { useState, useEffect } from 'react';
import { Container, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HealthBar from './HealthBar';
import { db } from '../firebase';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  header: {
    marginBottom: theme.spacing(2),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '10px',
    "&:hover": {
      background: "transparent"
    }
  },
  healthContainer:{
    background: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '10px',
    padding: '20px',
  },
  heartIcon: {
    color: 'red',
  },
}));

function Home() {
  const classes = useStyles();
  const [characters, setCharacters] = useState([]);
  const [showHealthBars, setShowHealthBars] = useState(true);

  useEffect(() => {
    // Attach a realtime listener to monitor changes to the "personnage" collection
    const unsubscribe = db.collection("personnage")
      .onSnapshot((querySnapshot) => {
        const updatedCharacters = querySnapshot.docs.map((doc) => doc.data());
        setCharacters(updatedCharacters);
      });
    // Detach the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const toggleHealthBars = () => {
    setShowHealthBars(!showHealthBars);
  }

  return (
    <Container maxWidth="sm" className={classes.root}>
      <div className={classes.buttonContainer}>
        <IconButton onClick={toggleHealthBars}>
          <FavoriteIcon className={classes.heartIcon} />
        </IconButton>
      </div>
      {showHealthBars && (
        <div className={classes.healthContainer}>
          {characters.map((character) => (
            <HealthBar key={character.id} name={character.name} currentHealth={character.pv} maxHealth={character.max_pv} gold={character.gold}/>
          ))}
        </div>
      )}
    </Container>
  );
}

export default Home;