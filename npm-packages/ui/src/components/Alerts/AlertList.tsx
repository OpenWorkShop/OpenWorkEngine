import _ from 'lodash';
import React from 'react';
import Alert from '@material-ui/core/Alert';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
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
  errors?: (Error | undefined)[];
}

type OwnProps = IProps;

const AlertList: React.FunctionComponent<OwnProps> = (props) => {
  const log = useLogger(AlertList);
  const classes = useStyles();
  const errors: Error[] = [];
  (props.errors ?? []).forEach((e) => {
    if (e != null) errors.push(e);
  });
  if (props.error) errors.push(props.error);

  if (errors.length > 0) log.error('errors', errors);

  function splitMessage(msg: string): string {
    const lines = _.uniq(msg.split('\n'));
    return lines.join('<br />');
  }

  return (
    <div className={classes.root}>
      {errors.map((e) => {
        const message = e.message || '';
        const name = e.name || '';
        return (
          <Alert key={name} severity="error">
            <div>
              <strong>{name}</strong>
              {name.length > 0 && message.length > 0 && <br/>}
              {splitMessage(e.message)}
            </div>
          </Alert>
        );
      })}
    </div>
  );
};

export default AlertList;
