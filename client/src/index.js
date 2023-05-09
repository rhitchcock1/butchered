import React from "react";
// import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import { createRoot } from "react-dom/client";


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);


root.render(
  


  <BrowserRouter>
 
    <App />
   
  </BrowserRouter>


);
