import React, { useState, useEffect } from 'react';
import { Container, Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';
import { db } from '../firebase';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  backButton: {
    marginBottom: theme.spacing(2),
    color: 'white',
    background: 'rgba(0, 0, 0, 0.85)',
  },
  closeButton: {
    marginBottom: theme.spacing(2),
    color: 'white',
    background: 'rgba(0, 0, 0, 0.85)',
  },
  statsContainer: {
    background: 'rgba(0, 0, 0, 0.85)',
    borderRadius: '10px',
    padding: theme.spacing(2),
  },
}));

function PersoStats({ char, onBackButtonClick, onCloseButtonClick }) {
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
  
    const handleBackButtonClick = () => {
        if (onBackButtonClick) {
            onBackButtonClick();
        }
    };

    const handleCloseButtonClick = () => {
        if (onBackButtonClick) {
            onBackButtonClick();
        }
        if (onCloseButtonClick) {
            onCloseButtonClick();
        }
      };

return (
    <Container maxWidth="sm" className={classes.root}>
        <div className={classes.buttonContainer}>
            <IconButton className={classes.backButton} onClick={handleBackButtonClick}>
                <ArrowBackIcon />
            </IconButton>
            <IconButton className={classes.closeButton} onClick={handleCloseButtonClick}>
                <CloseIcon />
            </IconButton>
        </div>
        {characterStats && (
        <div className={classes.statsContainer}>
            <Typography variant="h6">{characterStats.name}</Typography>
            <Typography>Catégorie Combat : </Typography>
            <Typography>Arme Légère : {characterStats.arm_legere}</Typography>
            <Typography>Arme Lourde : {characterStats.arm_lourde}</Typography>
            <Typography>Mains Nues : {characterStats.mains_n}</Typography>
            <Typography>Arme à distance : {characterStats.arm_dist}</Typography>
            <Typography>Style Spécial : {characterStats.style_spe}</Typography>
            {/* Add other statistics as needed */}
        </div>
        )}
    </Container>
    );
}

export default PersoStats;