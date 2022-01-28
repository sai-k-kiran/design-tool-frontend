import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store, { persistor } from "./components/redux/createStore";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { initReactI18next } from "react-i18next";
import i18next from "i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

export const CanvasContext = React.createContext();

i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "da"],
    fallbackLng: "en",
    debug: false,
    detection: {
      order: ["cookie", "path", "htmlTag"],
      caches: ["cookie"],
    },
    react: { useSuspense: false },
    backend: {
      loadPath: "/assets/locale/{{lng}}/translation.json",
    },
  });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <CanvasContext.Provider value={React.createRef()}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CanvasContext.Provider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
