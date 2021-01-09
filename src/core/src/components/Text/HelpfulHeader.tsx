import { Typography } from '@material-ui/core';
import * as React from 'react';
import {IHelpStep} from '../Alerts/HoverHelpStep';
import {HoverHelpStep} from '../Alerts';
import useStyles from './Styles';
import HelpfulExponent from './HelpfulExponent';

type Props = IHelpStep & {
  title: string;
  variant?: 'h5' | 'h6' | 'subtitle1';
};

const HelpfulHeader: React.FunctionComponent<Props> = (props) => {
  const { variant, title, tip, isComplete } = props;

  return (
    <Typography variant={variant ?? 'h5'} >
      {title}
      <HelpfulExponent tip={tip} isComplete={isComplete} />
    </Typography>
  );
};

export default HelpfulHeader;
