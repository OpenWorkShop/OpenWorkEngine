import { Box, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import * as React from "react";
const useStyles = makeStyles((theme) => ({
    [theme.breakpoints.down("sm")]: {
        fullCentered: {
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        },
    },
    [theme.breakpoints.up("sm")]: {
        fullCentered: {
            paddingTop: theme.spacing(10),
            paddingBottom: theme.spacing(10),
        },
    },
    fullCentered: {
        minHeight: "100vh",
    },
}));
const FullCentered = (props) => {
    var _a;
    const classes = useStyles();
    return (React.createElement(Grid, { container: true, spacing: 0, direction: "column", alignItems: "center", justify: "center", className: classes.fullCentered },
        React.createElement(Box, { width: (_a = props.width) !== null && _a !== void 0 ? _a : 400 }, props.children)));
};
export default FullCentered;
//# sourceMappingURL=FullCentered.js.map