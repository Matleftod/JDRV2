import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HealthBar from './HealthBar';
import { db } from '../firebase';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  header: {
    marginBottom: theme.spacing(2),
  },
}));

function Home() {
  const classes = useStyles();
  const [characters, setCharacters] = useState([]);

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

  return (
    <Container maxWidth="sm" className={classes.root}>
      {characters.map((character) => (
        <HealthBar key={character.id} name={character.name} currentHealth={character.pv} maxHealth={character.max_pv} />
      ))}
    </Container>
  );
}

export default Home;