import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AppBar,
         Box,
         createTheme,
         ThemeProvider,
         Toolbar, 
         Typography,
         CssBaseline,
         Grid,
         Card,
         Container
        } from '@mui/material';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

import MyChart from './MyChart';


const theme = createTheme({
  palette: {
    primary: {
      main: '#5569FF',
    },
    secondary: {
      main: '#5569FF',
    },
    background: {
      default: '#EEEEEE',
    }
  },
})

const App = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [bpi, setBpi] = useState({});

  useEffect(() => {
    axios.get("https://api.coindesk.com/v1/bpi/historical/close.json", {
      params: {
        start: "2011-01-01",
        end: "2021-10-01"
      }
    })
    .then(response => {
      setBpi(response.data.bpi);
    })
  }, [startDate, endDate])

  return (
    <>
      <ThemeProvider theme={theme}>
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
        <Box sx={{ marginTop: 2 }}>
          <Container maxWidth={false}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Box boxShadow={1}>
                  <Card>
                    Start Date
                    <DatePicker 
                    selected={startDate} 
                    onChange={(date) => setStartDate(date)}
                    minDate={new Date('2011-01-01')}
                    maxDate={Date.now()}
                    showYearDropdown={true}
                    />
                    End Date
                    <DatePicker 
                    selected={endDate} 
                    onChange={(date) => setEndDate(date)}
                    minDate={new Date('2011-01-01')}
                    maxDate={Date.now()}
                    />
                  </Card>
                </Box>
              </Grid>
              <Grid item xs={9}>
                <Box boxShadow={1}>
                  <Card>
                    <MyChart bpi={bpi}/>
                  </Card>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
