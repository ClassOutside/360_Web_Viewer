import React, { StrictMode } from "react";
import { Provider } from "react-redux"; // Import Provider from react-redux
import store from "../store.js"; // Import the store
import Viewer360 from "./Viewer360.jsx";
import Container from "@mui/material/Container"; // Import Container from MUI
import useMediaQuery from "@mui/material/useMediaQuery"; // Import useMediaQuery from MUI
import { useTheme, ThemeProvider } from "@mui/material/styles"; // Import useTheme and ThemeProvider from MUI
import theme from "../theme"; // Import the custom theme

function Viewer360Frame({ config }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Container
            disableGutters
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
            }}
          >
            <Viewer360 config={config} />
          </Container>
        </ThemeProvider>
      </Provider>
    </StrictMode>
  );
}

export default Viewer360Frame;
