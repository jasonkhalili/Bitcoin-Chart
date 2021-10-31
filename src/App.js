import React from 'react';
import { AppBar,
         Box,
         Toolbar, 
         Typography,
         CssBaseline,
         Grid,
         Card
        } from '@mui/material';

const App = () => {
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
            test
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
