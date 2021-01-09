import React, { FunctionComponent } from 'react';
import {FormControl, Grid} from '@material-ui/core';
import {HoverHelpStep} from '../Alerts';
import {IHelpStep} from '../Alerts/HoverHelpStep';
import HelpfulExponent from '../Text/HelpfulExponent';

type Props = IHelpStep & {
  children: React.ReactNode;
  before?: boolean;
};

const TipRow: FunctionComponent<Props> = (props) => {
  const { before, children } = props;

  return (
    <Grid container spacing={1} alignItems="flex-end">
      {before && <Grid item xs={1}>
        <HelpfulExponent {...props} />
      </Grid>}
      <Grid item xs={11}>
        {children}
      </Grid>
      {!before && <Grid item xs={1}>
        <HelpfulExponent {...props} />
      </Grid>}
    </Grid>
  );
};

export default TipRow;
