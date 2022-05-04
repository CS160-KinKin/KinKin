import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter} from "react-router-dom";

import App from "./App.jsx";
import AdditionalInformationCollection from "./components/UserCreation/AdditionalInformationCollection.jsx";
import "./index.css"

ReactDOM.render(
    <BrowserRouter>
      <AdditionalInformationCollection />
    </BrowserRouter>,
  document.getElementById("root")
);
