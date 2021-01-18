import * as React from 'react';
import useStyles from './styles';

type Props = {
 
};

const Terminal: React.FunctionComponent<Props> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {'> '}
    </div>
  );
};

export default Terminal;
