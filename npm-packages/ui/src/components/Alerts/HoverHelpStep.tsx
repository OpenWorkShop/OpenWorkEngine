import React, { FunctionComponent } from 'react';
import { useTheme, Tooltip, IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faCheck } from '@fortawesome/free-solid-svg-icons';

export interface IHelpStep {
  tip: string;
  isComplete?: boolean;
}

type Props = IHelpStep;

const HoverHelpStep: FunctionComponent<Props> = (props) => {
  const theme = useTheme();
  const { tip, isComplete } = props;
  const icon = isComplete ? faCheck : faQuestionCircle;
  const color = isComplete ? theme.palette.secondary.dark : theme.palette.info.light;

  return (
    <Tooltip title={tip}>
      <IconButton aria-label={tip} size='small' disableFocusRipple>
        <FontAwesomeIcon color={color} icon={icon} />
      </IconButton>
    </Tooltip>
  );
};

export default HoverHelpStep;
