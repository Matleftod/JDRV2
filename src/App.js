import BurgerMenu from './components/BurgerMenu';
import Health from './components/Health';
import ListeDice from './components/ListeDice';
import './App.css';
import './Health.css';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
function App() {
  return (
    
      <div className="App">
        <header className="App-header imgBg">
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
              <BurgerMenu />
              <Health />
              <ListeDice />
          </ThemeProvider>
        </header>
      </div>
  );
}

export default App;
