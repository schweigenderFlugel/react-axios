import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import { LoginProvider } from "./Context/LoginProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoginProvider>
        <Routes>
          <Route path="/*" element={<App />}></Route>
        </Routes>
      </LoginProvider>
    </BrowserRouter>
  </React.StrictMode>
);
