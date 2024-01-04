import GlobalStyle from "./GlobalStyle";
import Router from "./Router";
import { StyledEngineProvider } from '@mui/styled-engine';

function App() {
  return (
    <StyledEngineProvider injectFirst>
        <GlobalStyle />
        <Router />
    </StyledEngineProvider>
  );
}

export default App;
