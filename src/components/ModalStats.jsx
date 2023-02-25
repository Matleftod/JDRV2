import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  IconButton,
  TextField,
} from "@material-ui/core";
import { Edit, Save } from "@material-ui/icons";
import { db } from "../firebase";

const ModalStat = ({ open, char }) => {
  const [characterPv, setCharacterPv] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [newPv, setNewPv] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await db
        .collection("personnage")
        .where("name", "==", char)
        .get();
      setCharacterPv(data.docs.map((doc) => doc.data().pv));
    };
    fetchData();
  }, [char]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      await db
        .collection("personnage")
        .where("name", "==", char)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.update({
              pv: newPv,
            });
          });
        });
      setCharacterPv(newPv);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setNewPv("");
  };

  const handleInputChange = (event) => {
    setNewPv(event.target.value);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>PV</TableCell>
            {isEditing ? (
              <>
                <TableCell>
                  <TextField
                    type="number"
                    value={newPv}
                    onChange={handleInputChange}
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={handleSaveClick}>
                    <Save />
                  </IconButton>
                  <IconButton onClick={handleCancelClick}>
                    <Edit />
                  </IconButton>
                </TableCell>
              </>
            ) : (
              <>
                <TableCell>{characterPv}</TableCell>
                <TableCell>
                  <IconButton onClick={handleEditClick}>
                    <Edit />
                  </IconButton>
                </TableCell>
              </>
            )}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ModalStat;
