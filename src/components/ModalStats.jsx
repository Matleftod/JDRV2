import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Collapse,
  Box,
} from "@material-ui/core";
import { Edit, Save } from "@material-ui/icons";
import { db } from "../firebase";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ModalStats = ({ open, char }) => {
  const [characterStats, setCharacterStats] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [newStats, setNewStats] = useState({});
  const [isCollapsed1, setOpen1] = useState(false);
  const [isCollapsed2, setOpen2] = useState(false);
  const [isCollapsed3, setOpen3] = useState(false);
  const [isCollapsed4, setOpen4] = useState(false);
  const [isCollapsed5, setOpen5] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await db
        .collection("personnage")
        .where("name", "==", char)
        .get();
      setCharacterStats(data.docs[0].data());
    };
    fetchData();
  }, [char]);

  const handleEditClick = () => {
    setIsEditing(true);
    setNewStats(characterStats);
  };

  const handleSaveClick = async () => {
    try {
      await db
        .collection("personnage")
        .where("name", "==", char)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.update(newStats);
          });
        });
      setCharacterStats(newStats);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setNewStats({});
  };

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setNewStats((prevStats) => ({
      ...prevStats,
      [name]: value,
    }));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableCell align="center" colSpan={2} size="small">
              {isEditing ? (
                <><IconButton onClick={handleSaveClick}>
                  <Save />
                </IconButton><IconButton onClick={handleCancelClick}>
                    <Edit />
                  </IconButton></>
              ) : (
                <IconButton onClick={handleEditClick}>
                  <Edit />
                </IconButton>
              )}
            </TableCell>
        <TableBody>
          <TableRow>
            <TableCell>PV</TableCell>
            <TableCell>

            {isEditing ? (
              <>
                <TableCell>
                  <TextField
                    type="number"
                    name="pv"
                    value={newStats.pv}
                    onChange={handleInputChange}
                  />
                </TableCell>
              </>
            ) : (
              <>
                <TableCell>{characterStats.pv}</TableCell>
              </>
            )}
            <TableCell>/</TableCell>
            {isEditing ? (
              <>
                <TableCell>
                  <TextField
                    type="number"
                    name="max_pv"
                    value={newStats.max_pv}
                    onChange={handleInputChange}
                  />
                </TableCell>
              </>
            ) : (
              <>
                <TableCell>{characterStats.max_pv}</TableCell>
              </>
            )}
            </TableCell>
          </TableRow>
{/******************************************/}
          <TableRow>
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen1(!isCollapsed1)}
              >
                {isCollapsed1 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell>Catégorie Combat</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={isCollapsed1} timeout="auto" unmountOnExit>
                <TableRow>
                  <TableCell>Arme Légère</TableCell>
                  {isEditing ? (
                    <>
                      <TableCell>
                        <TextField
                          type="number"
                          name="arm_legere"
                          value={newStats.arm_legere}
                          onChange={handleInputChange}
                        />
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{characterStats.arm_legere}</TableCell>
                    </>
                  )}
                </TableRow>
                <TableRow>
                  <TableCell>Arme Lourde</TableCell>
                  {isEditing ? (
                    <>
                      <TableCell>
                        <TextField
                          type="number"
                          name="arm_lourde"
                          value={newStats.arm_lourde}
                          onChange={handleInputChange}
                        />
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{characterStats.arm_lourde}</TableCell>
                    </>
                  )}
                </TableRow>
                <TableRow>
                  <TableCell>Mains Nues</TableCell>
                  {isEditing ? (
                    <>
                      <TableCell>
                        <TextField
                          type="number"
                          name="mains_n"
                          value={newStats.mains_n}
                          onChange={handleInputChange}
                        />
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{characterStats.mains_n}</TableCell>
                    </>
                  )}
                </TableRow>
                <TableRow>
                  <TableCell>Arme à distance</TableCell>
                  {isEditing ? (
                    <>
                      <TableCell>
                        <TextField
                          type="number"
                          name="arm_dist"
                          value={newStats.arm_dist}
                          onChange={handleInputChange}
                        />
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{characterStats.arm_dist}</TableCell>
                    </>
                  )}
                </TableRow>
                <TableRow>
                  <TableCell>Style Spécial</TableCell>
                  {isEditing ? (
                    <>
                      <TableCell>
                        <TextField
                          type="number"
                          name="style_spe"
                          value={newStats.style_spe}
                          onChange={handleInputChange}
                        />
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{characterStats.style_spe}</TableCell>
                    </>
                  )}
                </TableRow>
              </Collapse>
            </TableCell>
          </TableRow>
{/***********************************************************/}
          <TableRow>
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen2(!isCollapsed2)}
              >
                {isCollapsed2 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell>Catégorie Cerveau</TableCell>
            
          </TableRow>
          <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={isCollapsed2} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1 }}>
          <TableRow>
            <TableCell>Connaissance</TableCell>
            {isEditing ? (
              <>
                <TableCell>
                  <TextField
                    type="number"
                    name="connaissance"
                    value={newStats.connaissance}
                    onChange={handleInputChange}
                  />
                </TableCell>
              </>
            ) : (
              <>
                <TableCell>{characterStats.connaissance}</TableCell>
              </>
            )}
          </TableRow>
          <TableRow>
            <TableCell>Intelligence</TableCell>
            {isEditing ? (
              <>
                <TableCell>
                  <TextField
                    type="number"
                    name="intel"
                    value={newStats.intel}
                    onChange={handleInputChange}
                  />
                </TableCell>
              </>
            ) : (
              <>
                <TableCell>{characterStats.intel}</TableCell>
              </>
            )}
          </TableRow>
          </Box>
          </Collapse>
          </TableCell>
          </TableRow>
{/***********************************************************/}
          <TableRow>
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen3(!isCollapsed3)}
              >
                {isCollapsed3 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell>Catégorie Dextérité</TableCell>
            
          </TableRow>
          <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={isCollapsed3} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1 }}>
          <TableRow>
            <TableCell>Agilité / Discrérité</TableCell>
            {isEditing ? (
              <>
                <TableCell>
                  <TextField
                    type="number"
                    name="agi"
                    value={newStats.agi}
                    onChange={handleInputChange}
                  />
                </TableCell>
              </>
            ) : (
              <>
                <TableCell>{characterStats.agi}</TableCell>
              </>
            )}
          </TableRow>
          <TableRow>
            <TableCell>Perception</TableCell>
            {isEditing ? (
              <>
                <TableCell>
                  <TextField
                    type="number"
                    name="perception"
                    value={newStats.perception}
                    onChange={handleInputChange}
                  />
                </TableCell>
              </>
            ) : (
              <>
                <TableCell>{characterStats.perception}</TableCell>
              </>
            )}
          </TableRow>
          </Box>
          </Collapse>
          </TableCell>
          </TableRow>
{/***********************************************************/}
          <TableRow>
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen4(!isCollapsed4)}
              >
                {isCollapsed4 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell>Catégorie Mental</TableCell>
            
          </TableRow>
          <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={isCollapsed4} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1 }}>
          <TableRow>
            <TableCell>Intimidation</TableCell>
            {isEditing ? (
              <>
                <TableCell>
                  <TextField
                    type="number"
                    name="intimidation"
                    value={newStats.intimidation}
                    onChange={handleInputChange}
                  />
                </TableCell>
              </>
            ) : (
              <>
                <TableCell>{characterStats.intimidation}</TableCell>
              </>
            )}
          </TableRow>
          <TableRow>
            <TableCell>Mensonge</TableCell>
            {isEditing ? (
              <>
                <TableCell>
                  <TextField
                    type="number"
                    name="mensonge"
                    value={newStats.mensonge}
                    onChange={handleInputChange}
                  />
                </TableCell>
              </>
            ) : (
              <>
                <TableCell>{characterStats.mensonge}</TableCell>
              </>
            )}
          </TableRow>
          <TableRow>
            <TableCell>Négociation</TableCell>
            {isEditing ? (
              <>
                <TableCell>
                  <TextField
                    type="number"
                    name="negocia"
                    value={newStats.negocia}
                    onChange={handleInputChange}
                  />
                </TableCell>
              </>
            ) : (
              <>
                <TableCell>{characterStats.negocia}</TableCell>
              </>
            )}
          </TableRow>
          <TableRow>
            <TableCell>Charisme</TableCell>
            {isEditing ? (
              <>
                <TableCell>
                  <TextField
                    type="number"
                    name="charisme"
                    value={newStats.charisme}
                    onChange={handleInputChange}
                  />
                </TableCell>
              </>
            ) : (
              <>
                <TableCell>{characterStats.charisme}</TableCell>
              </>
            )}
          </TableRow>
          <TableRow>
            <TableCell>Volonté</TableCell>
            {isEditing ? (
              <>
                <TableCell>
                  <TextField
                    type="number"
                    name="volonte"
                    value={newStats.volonte}
                    onChange={handleInputChange}
                  />
                </TableCell>
              </>
            ) : (
              <>
                <TableCell>{characterStats.volonte}</TableCell>
              </>
            )}
          </TableRow>
          </Box>
          </Collapse>
          </TableCell>
          </TableRow>
{/***********************************************************/}
          <TableRow>
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen5(!isCollapsed5)}
              >
                {isCollapsed5 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell>Catégorie Haki</TableCell>
            
          </TableRow>
          <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={isCollapsed5} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1 }}>
          <TableRow>
            <TableCell>Haki de l'Armement</TableCell>
            {isEditing ? (
              <>
                <TableCell>
                  <TextField
                    type="number"
                    name="haki_arm"
                    value={newStats.haki_arm}
                    onChange={handleInputChange}
                  />
                </TableCell>
              </>
            ) : (
              <>
                <TableCell>{characterStats.haki_arm}</TableCell>
              </>
            )}
          </TableRow>
          <TableRow>
            <TableCell>Haki de l'observation</TableCell>
            {isEditing ? (
              <>
                <TableCell>
                  <TextField
                    type="number"
                    name="haki_obs"
                    value={newStats.haki_obs}
                    onChange={handleInputChange}
                  />
                </TableCell>
              </>
            ) : (
              <>
                <TableCell>{characterStats.haki_obs}</TableCell>
              </>
            )}
          </TableRow>
          <TableRow>
            <TableCell>Haki des Rois</TableCell>
            {isEditing ? (
              <>
                <TableCell>
                  <TextField
                    type="number"
                    name="haki_roi"
                    value={newStats.haki_roi}
                    onChange={handleInputChange}
                  />
                </TableCell>
              </>
            ) : (
              <>
                <TableCell>{characterStats.haki_roi}</TableCell>
              </>
            )}
          </TableRow>
          </Box>
          </Collapse>
          </TableCell>
          </TableRow>
{/***********************************************************/}

        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ModalStats;
