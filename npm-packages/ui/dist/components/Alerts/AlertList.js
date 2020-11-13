import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => createStyles({
    root: {
        paddingTop: theme.spacing(1),
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(1),
        },
    },
}));
const AlertList = (props) => {
    const classes = useStyles();
    return (React.createElement("div", { className: classes.root }, props.children));
};
export default AlertList;
//# sourceMappingURL=AlertList.js.map