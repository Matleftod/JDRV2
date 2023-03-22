// PersoStats.jsx
import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { db } from '../firebase';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  statsContainer: {
    background: 'rgba(0, 0, 0, 0.85)',
    borderRadius: '10px',
    padding: theme.spacing(2),
  },
}));

function PersoStats({ char }) {
  const classes = useStyles();
  const [characterStats, setCharacterStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (char) {
        const data = await db
          .collection("personnage")
          .where("name", "==", char)
          .get();
        setCharacterStats(data.docs[0].data());
      }
    };
    fetchData();
  }, [char]);

  return (
    <Container maxWidth="sm" className={classes.root}>
      {characterStats && (
        <div className={classes.statsContainer}>
          <Typography variant="h6">{characterStats.name}</Typography>
          <Typography>Force: {characterStats.force}</Typography>
          <Typography>Agilité: {characterStats.agilite}</Typography>
          <Typography>Intelligence: {characterStats.intelligence}</Typography>
          {/* Add other statistics as needed */}
        </div>
      )}
    </Container>
  );
}

export default PersoStats;