import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store, persistor} from "./redux/store.js";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux"; // provider provides the redux store to the entire react component tree, thi is important because redux is a global state management solution
import { PersistGate } from "redux-persist/integration/react";


const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
  </Provider>
  </>
);
