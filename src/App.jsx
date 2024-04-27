import GlobalStyle from "./GlobalStyle";
import Router from "./Router";
import { StyledEngineProvider } from '@mui/styled-engine';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from "styled-components";
import 'react-toastify/dist/ReactToastify.css';
import media from './media';

function App() {
  return (
    <StyledEngineProvider injectFirst>
        <ThemeProvider theme={{ ...media }}>
          <GlobalStyle />
          <Router />
          <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </ThemeProvider>
        <ReactQueryDevtools />
    </StyledEngineProvider>
  );
}

export default App;
