import React, {FunctionComponent} from 'react';
import {HoverHelpStep} from '../Alerts';
import useStyles from './styles';
import {IHelpStep} from '../Alerts/HoverHelpStep';

type Props = IHelpStep;

const HelpfulExponent: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const { tip, isComplete } = props;

  return (
    <span className={classes.popoverTip}>
      <HoverHelpStep tip={tip} isComplete={isComplete} />
    </span>
  );
};

export default HelpfulExponent;
