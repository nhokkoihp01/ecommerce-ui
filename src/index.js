import React from 'react';
import ReactDOM from 'react-dom/client';
import {ProSidebarProvider} from 'react-pro-sidebar';


import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from "~/components/GlobalStyles";
import CartProvider from "~/untils/CartProvider";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <GlobalStyles>
        <ProSidebarProvider>
            <CartProvider>
                <App/>
            </CartProvider>
        </ProSidebarProvider>

    </GlobalStyles>


    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
