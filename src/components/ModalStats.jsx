import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody, 
    TableCell, 
    TableContainer, 
    TableRow, 
    Paper
} from "@material-ui/core";
import { db } from '../firebase';

const ModalStat = ({ open, char }) => {
  const [characterPv, setcharacterPv] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await db.collection("personnage").where("name", "==", char).get();
      setcharacterPv(data.docs.map((doc) => doc.data().pv));
    };
    fetchData();
  }, [char]);
  
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>PV</TableCell>
            <TableCell>{characterPv}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ModalStat;
