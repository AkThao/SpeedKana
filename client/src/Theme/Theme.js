import { createTheme } from "@mui/material/styles";
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

export default theme;
