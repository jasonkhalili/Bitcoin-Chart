import React, { useState } from 'react';
import axios from 'axios';
import { AppBar,
         Box,
         Toolbar, 
         Typography,
         CssBaseline,
         Grid,
         Card
        } from '@mui/material';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";


const App = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  axios.get("https://api.coindesk.com/v1/bpi/historical/close.json", {
    params: {
      start: "2015-01-01",
      end: "2021-10-01"
    }
  })
  .then(response => {
    console.log(response.data);
  })
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Bitcoin Chart
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card>
            Start Date
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            End Date
            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            test
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
