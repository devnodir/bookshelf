import { createTheme } from '@mui/material/styles';
import { red, blue } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({

  palette: {
    mode: "dark",
    primary: blue,
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red[400]
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "filled",
        size: "small",
        fullWidth: true,
      }
    }
  }
});

export default theme;
