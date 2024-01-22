
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./typography.css"
import store from "./Redux/store";
import App from "./App";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <Provider store={store}>
            <App />
        </Provider>
    </GoogleOAuthProvider>
);
