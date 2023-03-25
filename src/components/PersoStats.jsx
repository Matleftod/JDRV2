import React, { useState, useEffect } from 'react';
import { Container, Typography, IconButton, Grid, Box } from '@material-ui/core';
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
    textAlign: 'left',
  },
  gridItem: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    borderRadius: '10px',
    width: 'fit-content',
    height: 'fit-content',
  },
  gridContainer: {
    position: 'relative',
  },
  overlap: {
    position: 'absolute',
    top: (props) => theme.spacing(props.top || 0),
  },
  name: {
    marginBottom: '20px', 
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  statsAtk: {
    border: 'solid 1px red',
    borderRadius: '10px',
    padding: theme.spacing(2),
  },
  statsCerv: {
    border: 'solid 1px cyan',
    borderRadius: '10px',
    padding: theme.spacing(2),
  },
  statsDext: {
    border: 'solid 1px green',
    borderRadius: '10px',
    padding: theme.spacing(2),
  },
  statsMental: {
    border: 'solid 1px violet',
    borderRadius: '10px',
    padding: theme.spacing(2),
  },
  statsHaki: {
    border: 'solid 1px blue',
    borderRadius: '10px',
    padding: theme.spacing(2),
  },
  category: {
    fontWeight: 'bold',
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
            <Typography variant="h6" className={classes.name}>
                {characterStats.name}
            </Typography>
            <Grid container spacing={4} className={classes.gridContainer}>
                <Grid item>
                    <Box className={`${classes.gridItem} ${classes.statsAtk}`}>
                        <Typography className={classes.category}>Catégorie Combat : </Typography>
                        <Typography>Arme Légère : {characterStats.arm_legere}</Typography>
                        <Typography>Arme Lourde : {characterStats.arm_lourde}</Typography>
                        <Typography>Mains Nues : {characterStats.mains_n}</Typography>
                        <Typography>Arme à distance : {characterStats.arm_dist}</Typography>
                        <Typography>Style Spécial : {characterStats.style_spe}</Typography>
                    </Box>
                </Grid>
                <Grid item>
                    <Box
                        className={`${classes.gridItem} ${classes.statsCerv} ${classes.overlap}`}
                        style={{ top: "13px" }}
                    >
                        <Typography className={classes.category}>Catégorie Cerveau : </Typography>
                        <Typography>Connaissance : {characterStats.connaissance}</Typography>
                        <Typography>Intelligence : {characterStats.intel}</Typography>
                    </Box>
                </Grid>
                <Grid item>
                    <Box className={`${classes.gridItem} ${classes.statsDext}`}>
                        <Typography className={classes.category}>Catégorie Dextérité : </Typography>
                        <Typography>Agilité / Discrérité : {characterStats.agi}</Typography>
                        <Typography>Perception : {characterStats.perception}</Typography>
                    </Box>
                </Grid>
                <Grid item>
                    <Box
                        className={`${classes.gridItem} ${classes.statsMental} ${classes.overlap}`}
                        style={{ top: "165px" }}
                    >
                        <Typography className={classes.category}>Catégorie Mental : </Typography>
                        <Typography>Intimidation : {characterStats.intimidation}</Typography>
                        <Typography>Mensonge : {characterStats.mensonge}</Typography>
                        <Typography>Négociation : {characterStats.negocia}</Typography>
                        <Typography>Charisme : {characterStats.charisme}</Typography>
                        <Typography>Volonté : {characterStats.volonte}</Typography>
                    </Box>
                </Grid>
                <Grid item>
                    <Box className={`${classes.gridItem} ${classes.statsHaki}`}>
                        <Typography className={classes.category}>Catégorie Haki : </Typography>
                        <Typography>Haki de l'Armement : {characterStats.haki_arm}</Typography>
                        <Typography>Haki de l'observation : {characterStats.haki_obs}</Typography>
                        <Typography>Haki des Rois : {characterStats.haki_roi}</Typography>
                    </Box>
                </Grid>
            </Grid>
        </div>
        )}
    </Container>
    );
}

export default PersoStats;