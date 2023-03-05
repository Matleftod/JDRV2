import React from "react";
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} placement="top" classes={{ popper: className }} />
))(({ theme }) => ({
  '& .MuiTooltip-tooltip': {
    fontSize: '24px',
    backgroundColor: 'black',
  },
}));


const Prime = ({name, prime }) => {
  return (
    <CustomTooltip title={"Prime: " + prime}>
      <span>{name}</span>
    </CustomTooltip>
  );
};

export default Prime;
