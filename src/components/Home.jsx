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
    const fetchData = async () => {
      const data = await db.collection("personnage").get();
      setCharacters(data.docs.map((doc) => doc.data()));
    };
    fetchData();
  }, []);

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Typography variant="h4" component="h1" className={classes.header}>
        Health Bars
      </Typography>
      {characters.map((character) => (
        <HealthBar key={character.id} name={character.name} currentHealth={character.pv} maxHealth= {character.max_pv}/>
      ))}
    </Container>
  );
}

export default Home;