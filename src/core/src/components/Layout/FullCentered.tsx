import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';

interface IProps {
  width?: number;
}

const useStyles = makeStyles((theme) => ({
  [theme.breakpoints.down('sm')]: {
    fullCentered: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  },
  [theme.breakpoints.up('sm')]: {
    fullCentered: {
      paddingTop: theme.spacing(10),
      paddingBottom: theme.spacing(10),
    },
  },
  fullCentered: {
    minHeight: '100vh',
  },
}));

const FullCentered: React.FunctionComponent<IProps> = (props) => {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      className={classes.fullCentered}
    >
      {props.children}
    </Grid>
  );
};

export default FullCentered;
