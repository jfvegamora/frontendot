import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import "./index.css";
import Modal from "react-modal";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

Modal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </BrowserRouter>
);
