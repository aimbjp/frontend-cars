import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import {store} from "./services/store";
import {createTheme, ThemeProvider} from "@mui/material";

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);

const theme = createTheme({
});


root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();
