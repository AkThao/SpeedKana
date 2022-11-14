import React from "react";
import ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./index.css";
import Home from "./routes/Home";
import Test from "./routes/Test";
import Stats from "./routes/Stats";
import ErrorPage from "./routes/ErrorPage";
import { green, grey, red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    general: {
      white: "#FFF",
      black: "#000",
    },
    background: {
      paper: "#181818",
    },
    primary: {
      main: "rgb(161, 232, 252)",
      red: red[500],
      grey: grey[700],
      green: green[500],
    },
    secondary: {
      main: "rgb(91, 163, 249)",
      red: red[800],
      grey: grey[500],
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
