import React from "react";
import ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import "./index.css";
import Home from "./routes/Home";
import Test from "./routes/Test";
import Stats from "./routes/Stats";
import ErrorPage from "./routes/ErrorPage";
import theme from "./Theme/Theme";
import { AppProvider } from "./Context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "test",
    element: <Test />,
  },
  {
    path: "stats",
    element: <Stats />,
  }
]);

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
