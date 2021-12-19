import React from "react";
import ReactDOM from "react-dom";
import "./resources/scss/index.scss";
import Home from "./components/Home/Home";
import DetailView from "./components/DetailView/DetailView";
import { Provider } from "react-redux";
import { store, persistor } from "./Store/store";
import { PersistGate } from "redux-persist/integration/react";
import {
  HashRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/details/:stateID" element={<DetailView />} />
        <Route path="*" element={<Navigate to="/#" />} />
      </Routes>
    </Router>
  );
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<div>Loading</div>} persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);


serviceWorkerRegistration.register();