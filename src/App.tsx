import { CssBaseline } from "@mui/material";
import { ColorModeContextProvider } from "./providers/ColorModeProvider";
import { LocalizationProvider } from "./providers/LocalizationProvider";
import { SesaRouter } from "./router/SesaRouter";

const App = () => {
  return (
    <LocalizationProvider>
      <ColorModeContextProvider>
        <CssBaseline />
        <SesaRouter />
      </ColorModeContextProvider>
    </LocalizationProvider>
  );
};

export default App;
