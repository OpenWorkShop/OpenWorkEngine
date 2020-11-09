import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
const useStyles = makeStyles((theme) => ({
    errorsList: {
        listStyleType: 'none',
        color: theme.palette.error.main,
        margin: 0,
        padding: 0,
        marginTop: 2,
        fontStyle: 'italic',
    },
}));
const ErrorList = (props) => {
    const classes = useStyles();
    return (React.createElement("ul", { className: classes.errorsList },
        props.apiErrors &&
            props.apiErrors.map((err) => {
                return React.createElement("li", { key: err.message }, err.message);
            }),
        props.errorMessages &&
            props.errorMessages.map((msg) => {
                return React.createElement("li", { key: msg }, msg);
            })));
};
export default ErrorList;
//# sourceMappingURL=ErrorList.js.map