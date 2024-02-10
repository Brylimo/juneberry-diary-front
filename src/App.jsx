import GlobalStyle from "./GlobalStyle";
import Router from "./Router";
import { StyledEngineProvider } from '@mui/styled-engine';
//import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <StyledEngineProvider injectFirst>
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
        {/*<ReactQueryDevtools />*/}
    </StyledEngineProvider>
  );
}

export default App;
