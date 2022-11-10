import React from "react";
import ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { blue, red } from "@mui/material/colors";
import "./index.css";
import Home from "./routes/Home";
import Test from "./routes/Test";
import Stats from "./routes/Stats";
import ErrorPage from "./routes/ErrorPage";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(161, 232, 252)",  // or "rgb(91, 163, 249)",
      background: "#282828",
    },
    secondary: {
      main: red[600],
    }
  }
})

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
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
