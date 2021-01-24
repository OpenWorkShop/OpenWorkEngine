import React, { FunctionComponent } from 'react';
import {IHaveWorkspace, useWorkspaceSelector, useWorkspaceUnits, WorkspaceUnitSelect} from '../Workspaces';
import PopoverWorkBarChip from './PopoverWorkBarChip';
import {getWorkspaceStateIcon} from '../Workspaces/WorkspaceState';
import {useOwsTrans} from '../../hooks';
import {getDistanceUnitAbbreviationKey} from '../../components/Units';
import {Grid} from '@material-ui/core';
import HelpfulHeader from '../../components/Text/HelpfulHeader';
import useStyles from './styles';

type Props = IHaveWorkspace;

const WorkspaceChip: FunctionComponent<Props> = (props) => {
  const t = useOwsTrans();
  const classes = useStyles();
  const { workspaceId } = props;
  const units = useWorkspaceUnits(workspaceId);
  const workspaceState = useWorkspaceSelector(workspaceId, ws => ws.state);
  const tip = t('Adjust common workspace settings.');

  return (
    <PopoverWorkBarChip
      label={t(getDistanceUnitAbbreviationKey(units))}
      faIcon={getWorkspaceStateIcon(workspaceState)}
    >
      <Grid item xs={12} className={classes.popoverRowAlt} >
        <HelpfulHeader tip={tip} title={t('Workspace')} variant="h6" />
      </Grid>
      <Grid item xs={12} className={classes.popoverRow} >
        <WorkspaceUnitSelect workspaceId={workspaceId} />
      </Grid>
    </PopoverWorkBarChip>
  );
};

export default WorkspaceChip;
