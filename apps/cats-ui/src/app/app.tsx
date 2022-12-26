import * as React from "react";
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { Home } from './pages/home';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

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
  },
});

export function App() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ width: 500 }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(_, newValue: unknown) => {
            setValue(newValue as number);
            if (newValue === 0)
              navigate('/')
            if (newValue === 1)
              navigate('/page-2')
          }}
        >
          <BottomNavigationAction label="Home" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Page 2" icon={<LocationOnIcon />} />
        </BottomNavigation>
      </Box>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
      {/* END: routes */}
    </ThemeProvider>
  );
}

export default App;
