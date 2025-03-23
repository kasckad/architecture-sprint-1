import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {BrowserRouter} from "react-router-dom";
import App from "./components/App.tsx";

const Root = () => (
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<Root />);