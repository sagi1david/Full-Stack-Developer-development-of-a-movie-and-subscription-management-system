import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";
import { legacy_createStore as createStore } from "redux";
import reducer from "./redux/rootReducer.js";
import { Provider } from "react-redux";
import { Container, Theme } from "@radix-ui/themes";
import NavBar from "./NavBar.jsx";

const store = createStore(reducer);

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <Theme>
        <NavBar />
        <Container>
          <App />
        </Container>
      </Theme>
    </Provider>
  </BrowserRouter>
);
