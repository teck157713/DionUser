import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import i18n from "./i18n";

import { FirebaseProvider } from './providers/firebase.provider';
import { ThemeProvider } from '@mui/material';
import { MainTheme } from './main.theme';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { I18nextProvider } from 'react-i18next';
import { StripeProvider } from './providers/stripe.provider';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

defineCustomElements(window);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <I18nextProvider i18n={i18n} defaultNS={'translation'}>
            <ThemeProvider theme={MainTheme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StripeProvider>
                        <FirebaseProvider>
                            <RouterProvider router={router} />
                        </FirebaseProvider>
                    </StripeProvider>
                </LocalizationProvider>
            </ThemeProvider>
        </I18nextProvider>
    </React.StrictMode>,
)
