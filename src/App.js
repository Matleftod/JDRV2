import BurgerMenu from './components/BurgerMenu';
import Home from './components/Home';
import './App.css';
import './Home.css';

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
        <header className="App-header">
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <BurgerMenu />
            <Home />
          </ThemeProvider>
        </header>
      </div>
  );
}

export default App;
