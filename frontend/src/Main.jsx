import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import { AuthProvider } from "./AuthContext.jsx"; 


const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

const Main = () => {
  return (
    <App />
  );
};

root.render(
  <AuthProvider>
    <Main />
  </AuthProvider>
);
