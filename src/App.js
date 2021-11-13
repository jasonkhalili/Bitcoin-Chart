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
         CardContent,
         Container,
         TextField
        } from '@mui/material';
import { LocalizationProvider, DesktopDatePicker } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';

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
      default: 'rgb(242, 245, 249)',
    }
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px'
        }
      }
    }
  }
})

const App = () => {
  const [startDate, setStartDate] = useState(new Date('January 1, 2011'));
  const [endDate, setEndDate] = useState(new Date(Date.now()));
  const [bpi, setBpi] = useState({});

  useEffect(() => {
    axios.get("https://api.coindesk.com/v1/bpi/historical/close.json", {
      params: {
        start: startDate.toISOString().split('T')[0],
        end: endDate.toISOString().split('T')[0]
      }
    })
    .then(response => {
      setBpi(response.data.bpi);
    })
  }, [startDate, endDate])

  return (
    <>
      <LocalizationProvider dateAdapter={DateAdapter}>

        <ThemeProvider theme={theme}>
          <Box sx={{ flexGrow: 1 }}>
            <CssBaseline />
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h5">
                  Bitcoin Chart
                </Typography>
              </Toolbar>
            </AppBar>
          </Box>
          <Container maxWidth={false} sx={{ marginTop: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ marginBottom: 2 }}>
                      Select dates:
                    </Typography>
                    <DesktopDatePicker 
                      inputFormat="MM/dd/yyyy"
                      value={startDate}
                      label="Start Date"
                      minDate={new Date('January 1, 2011')}
                      maxDate={Date.now()}
                      onChange={(date) => setStartDate(date)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <Box sx={{ marginBottom: 3 }} />
                    <DesktopDatePicker 
                      inputFormat="MM/dd/yyyy"
                      value={endDate}
                      label="End Date"
                      minDate={new Date('January 1, 2011')}
                      maxDate={Date.now()}
                      onChange={(date) => setEndDate(date)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={9}>
                <Box>
                  <Card>
                    <MyChart bpi={bpi}/>
                  </Card>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </ThemeProvider>
      </LocalizationProvider>
    </>
  );
}

export default App;
