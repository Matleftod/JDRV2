import React from "react";
import Health from "./Health";
import { Container } from '@material-ui/core';
import Perso from "./Perso";

const RightMenu = () => {
  return (
    <Container>
      <Health />
      <Perso />
    </Container>
  );
};

export default RightMenu;