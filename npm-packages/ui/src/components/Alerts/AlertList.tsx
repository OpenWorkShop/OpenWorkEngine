import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      'paddingTop': theme.spacing(1),
      'width': '100%',
      '& > * + *': {
        marginTop: theme.spacing(1),
      },
    },
  }),
);

const AlertList: React.FunctionComponent = (props) => {
  const classes = useStyles();

  return <div className={classes.root}>{props.children}</div>;
};

export default AlertList;
