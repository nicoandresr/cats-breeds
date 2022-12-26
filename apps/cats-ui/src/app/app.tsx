import * as React from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { Home } from './pages/home';
import { Cats } from './pages/cats';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { Container } from '@mui/material';

import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#990ae3',
    },
    secondary: {
      main: '#E30AC1',
    },
  },
});

export function App() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ width: '100vw', height: '100vh', display: 'flex' }}>
        <nav style={{ backgroundColor: '#1e1e1e', height: '100vh' }}>
          <BottomNavigation
            showLabels
            sx={{
              display: 'flex',
              height: '10rem',
              flexDirection: 'column',
              backgroundColor: '#1e1e1e',
            }}
            value={value}
            onChange={(_, newValue: unknown) => {
              setValue(newValue as number);
              if (newValue === 0) navigate('/');
              if (newValue === 1) navigate('/cats');
            }}
          >
            <BottomNavigationAction label="Breeds" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Cats" icon={<LocationOnIcon />} />
          </BottomNavigation>
        </nav>

        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cats" element={<Cats />} />
          </Routes>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
