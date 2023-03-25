import BurgerMenu from './components/BurgerMenu';
import RightMenu from './components/RightMenu';
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
              <RightMenu />
              <ListeDice />
          </ThemeProvider>
        </header>
      </div>
  );
}

export default App;
