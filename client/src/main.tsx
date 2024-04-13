import { ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { store } from "./store/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#ff8e3c",
            borderRadius: 5,
            colorBgContainer: "white",
            colorSplit: "#f1f5f9",
            colorLink: "#ff8e3c",
          },
          components: {
            Table: {
              borderColor: "#fffffe",
              headerBg: "#fafafa",
              rowHoverBg: "#fafafa",
            },
          },
        }}
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);

// Brightly Orange Number 2: #f43a09

// Grandpa Orange: #ffb766

// Grey Blue Green: #c2edda

// Live Green: #68d388
