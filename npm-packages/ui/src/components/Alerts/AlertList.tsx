import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/core';
import useLogger from '@openworkshop/lib/utils/logging/UseLogger';

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

interface IProps {
  error?: Error;
  errors?: Error[];
}

type OwnProps = IProps;

const AlertList: React.FunctionComponent<OwnProps> = (props) => {
  const log = useLogger(AlertList);
  const classes = useStyles();
  const errors = [...(props.errors || [])];
  if (props.error) errors.push(props.error);

  if (errors.length > 0) log.error('errors', errors);

  return (
    <div className={classes.root}>
      {errors.map((e) => (
        <Alert key={e.name} severity="error">
          <strong>{e.name}</strong>
          {e.name && e.message && <br />}
          {e.message}
        </Alert>
      ))}
      {props.children}
    </div>
  );
};

export default AlertList;
