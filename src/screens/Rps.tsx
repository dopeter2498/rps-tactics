import '../styles/Rps.css';
import * as React from 'react';
import socket from '../components/socket.ts';
import { Container,ButtonGroup,Button,Box } from '@mui/material';
import ContentCutTwoToneIcon from '@mui/icons-material/ContentCutTwoTone';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

const Rps = () => {
  const currSocket = socket;
  return (
  <body>
    <Container fixed sx={{ borderRadius: 9, backgroundColor: 'white'}}>
      <div>
        <h1> RPS Tactics! </h1>
      </div>
      <Box textAlign='center' sx={{backgroundColor: 'white'}}>
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button startIcon={<CircleOutlinedIcon sx={{ fontSize: 40 }}/>} ></Button>
          <Button startIcon={<ArticleRoundedIcon/>}></Button>
          <Button startIcon={<ContentCutTwoToneIcon/>}></Button>
        </ButtonGroup>
      </Box>
    </Container>
  </body>
  );
} 


export default Rps;
