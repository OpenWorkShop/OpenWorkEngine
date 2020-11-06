import { createMuiTheme } from "@material-ui/core/styles";
import * as Colors from "./Colors";
const headerFont = "Cabin";
const bodyFont = "Roboto";
export default createMuiTheme({
    palette: {
        primary: Colors.purple,
        secondary: Colors.brown,
        background: {
            paper: "#fff",
            default: "#efefef",
        },
    },
    shape: {
        borderRadius: 3,
    },
    typography: {
        fontFamily: [bodyFont, headerFont, "sans-serif"].join(","),
        h1: {
            fontFamily: headerFont,
        },
        h2: {
            fontFamily: headerFont,
        },
        h3: {
            fontFamily: headerFont,
        },
        h4: {
            fontFamily: headerFont,
        },
        h5: {
            fontFamily: headerFont,
        },
        h6: {
            fontFamily: headerFont,
        },
        button: {
            fontFamily: headerFont,
        },
        body1: {
            fontFamily: bodyFont,
        },
        body2: {
            fontFamily: bodyFont,
        },
    },
});
//# sourceMappingURL=Wizard.js.map