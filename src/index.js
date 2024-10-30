import React from "react";
import ReactDOM from "react-dom/client"; // Note the updated import path
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import Router components
import store from "./redux/store";
import App from "./App";

// Create a root and render the application
const root = ReactDOM.createRoot(document.getElementById("root")); // Create a root
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<App />} /> {/* Catch-all route */}
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
