import React, { FunctionComponent } from 'react';
import {IHaveWorkspace, WorkspaceUnitSelect} from '../Workspaces';
import PopoverWorkBarChip from './PopoverWorkBarChip';
import {getWorkspaceStateIcon} from '../Workspaces/WorkspaceState';
import {useOwsTrans} from '../../Hooks';
import {getDistanceUnitAbbreviationKey} from '../../components/Units';
import {Grid} from '@material-ui/core';
import HelpfulHeader from '../../components/Text/HelpfulHeader';
import useStyles from './Styles';

type Props = IHaveWorkspace;

const WorkspaceChip: FunctionComponent<Props> = (props) => {
  const t = useOwsTrans();
  const classes = useStyles();
  const { workspace } = props;
  const workspaceState = workspace.state;
  const tip = t('Adjust common workspace settings.');

  return (
    <PopoverWorkBarChip
      label={t(getDistanceUnitAbbreviationKey(workspace.isImperialUnits))}
      faIcon={getWorkspaceStateIcon(workspaceState)}
    >
      <Grid item xs={12} className={classes.popoverRowAlt} >
        <HelpfulHeader tip={tip} title={t('Workspace')} variant="h6" />
      </Grid>
      <Grid item xs={12} className={classes.popoverRow} >
        <WorkspaceUnitSelect workspace={workspace} />
      </Grid>
    </PopoverWorkBarChip>
  );
};

export default WorkspaceChip;
