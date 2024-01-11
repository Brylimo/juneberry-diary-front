import GlobalStyle from "./GlobalStyle";
import Router from "./Router";
import { StyledEngineProvider } from '@mui/styled-engine';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  return (
    <StyledEngineProvider injectFirst>
        <GlobalStyle />
        <Router />
        {/*<ReactQueryDevtools />*/}
    </StyledEngineProvider>
  );
}

export default App;
