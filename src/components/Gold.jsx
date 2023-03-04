import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import { db } from '../firebase';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    color: 'gold',
  },
  icon: {
    marginRight: '8px',
  },
  input: {
    width: '60px',
    marginLeft: '8px',
    marginRight: '8px',
    '& input': {
      textAlign: 'right',
    },
  },
}));

function Gold({ gold, name }) {
  const classes = useStyles();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(gold);

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  const handleFocus = (event) => {
    event.target.select();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSave();
    }
  };

  const handleSave = () => {
    setEditing(false);
    db.collection('personnage')
      .where('name', '==', name)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          db.collection('personnage').doc(doc.id).update({
            gold: parseInt(value, 10),
          });
        });
      });
  };

  const handleClick = () => {
    setEditing(true);
  };

  return (
    <div className={classes.root}>
      <CurrencyBitcoinIcon className={classes.icon} />
      {editing ? (
        <TextField
          className={classes.input}
          type="number"
          value={value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyPress={handleKeyPress}
          onBlur={handleSave}
          autoFocus
          inputProps={{
            min: 0,
          }}
        />
      ) : (
        <span style={{ fontSize: '24px' }} onClick={handleClick}>
          {gold}
        </span>
      )}
    </div>
  );
}

export default Gold;