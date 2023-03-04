import React, { useState } from "react";
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import { db } from '../firebase';

const Gold = ({ gold, name }) => {
  const [editing, setEditing] = useState(false);
  const [newGold, setNewGold] = useState(gold);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelClick = () => {
    setEditing(false);
    setNewGold(gold);
  };

  const handleSaveClick = async () => {
    await db.collection("personnage").where("name", "==", name).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        db.collection("personnage").doc(doc.id).update({ gold: newGold });
      });
    });
    setEditing(false);
  };

  const handleGoldChange = (e) => {
    setNewGold(e.target.value);
  };

  if (editing) {
    return (
      <div>
        <input type="number" value={newGold} onChange={handleGoldChange} />
        <button onClick={handleSaveClick}>Save</button>
        <button onClick={handleCancelClick}>Cancel</button>
      </div>
    );
  }

  return (
    <div onClick={handleEditClick}>
      <CurrencyBitcoinIcon />
      <span>{gold}</span>
    </div>
  );
};

export default Gold;
