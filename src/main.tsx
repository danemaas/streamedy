//package imports
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

//local imports
import { store } from "./store/store.ts";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
