import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { FavoriteProvider } from "./context/FavoriteContext";
import { PostFavoriteProvider } from "./context/PostFavoriteContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <ThemeProvider>
        <FavoriteProvider>
          <PostFavoriteProvider>
            <App />
          </PostFavoriteProvider>
        </FavoriteProvider>
      </ThemeProvider>
    </HashRouter>
  </React.StrictMode>
);
