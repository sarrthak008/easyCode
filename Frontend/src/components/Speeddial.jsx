import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddCommentIcon from '@mui/icons-material/AddComment';
import PersonIcon from '@mui/icons-material/Person';
import QuizIcon from '@mui/icons-material/Quiz';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useNavigate } from 'react-router-dom';


const actions = [
  { icon: <HomeIcon/> , name:'status '},
  { icon: <CastForEducationIcon/>, name: 'ALL Courses' },
  { icon: <AddCommentIcon />, name: 'Add Course' },
  { icon: <PersonIcon />, name: 'All User' },
  { icon: <QuizIcon />, name: 'Add Quiz' },
];

const NAVIGATION_LOCATION =['/homesetting','/setting','/addcourse','/','/']

export default function Speeddial({operationNum}) {

   const navigate = useNavigate()

  return (
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        //sx={{ position: 'fixed', bottom: "-80%", right: "5%"  }}
        icon={<SpeedDialIcon/>}
      >
        {actions.map((action,index) => (
        <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={()=>navigate(`${NAVIGATION_LOCATION[index]}`)}
          /> 
        ))}
      </SpeedDial>
    </Box>
  );
}
