import React from "react";
import "./styles/color.css";
import "./styles/font.css";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.css";
import "./styles/tailwind.css";
import { UserProvider } from './UserContext';
import { Provider } from 'react-redux';
import store from './store';
import { ProSidebarProvider } from "react-pro-sidebar";
ReactDOM.render(


  <Provider store={store}> 
    <ProSidebarProvider>
    <App />
    </ProSidebarProvider>
  </Provider>
      


  ,
  document.getElementById("root")
);
