import { Typography } from '@material-ui/core';
import * as React from 'react';
import {IHelpStep} from '../Alerts/HoverHelpStep';
import {HoverHelpStep} from '../Alerts';
import useStyles from './Styles';

type Props = IHelpStep & {
  title: string;
  variant?: 'h5' | 'h6' | 'subtitle1';
};

const HelpfulHeader: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const { variant, title, tip, isComplete } = props;

  return (
    <Typography variant={variant ?? 'h5'} >
      {title}
      <span className={classes.popoverTip}>
        <HoverHelpStep tip={tip} isComplete={isComplete} />
      </span>
    </Typography>
  );
};

export default HelpfulHeader;
