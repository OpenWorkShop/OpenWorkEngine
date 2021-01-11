import { ButtonGroup, Button, Paper, Grid } from '@material-ui/core';
import * as React from 'react';
import {IHaveWorkspace} from '../../Workspaces';
import useStyles from './Styles';
import clsx from 'clsx';
import {useTrans, useWindowSize} from '../../Context';
import {OpenWorkShopIcon} from '../../../components';
import useLogger from '../../../utils/logging/UseLogger';
import ToolPane from './ToolPane';
import {Route, Switch, useHistory} from 'react-router-dom';
import {IToolGroup} from '../../Tools';
import {getWorkspaceTools, useWorkspace} from '../../Workspaces';

type Props = IHaveWorkspace & {
  selectedToolGroupId?: string;
}

const ToolBar: React.FunctionComponent<Props> = (props) => {
  const log = useLogger(ToolBar);
  const classes = useStyles();
  const t = useTrans();
  const { workspaceId, selectedToolGroupId } = props;
  const workspace = useWorkspace(workspaceId);
  const history = useHistory();
  // const [selectedToolId, setSelectedToolId] = React.useState<string | undefined>(undefined);
  const windowSize = useWindowSize();
  const isOnBottom = windowSize.width < windowSize.height;
  const workspacePath = `/workspaces/${workspaceId}`;
  const tools = getWorkspaceTools(workspace);

  function getToolGroupPath(toolGroup: IToolGroup): string {
    return `${workspacePath}/${toolGroup.id}`;
  }

  function onSelectedToolGroup(toolGroup: IToolGroup): void {
    const toolGroupId = toolGroup.id === selectedToolGroupId ? undefined : toolGroup.id;
    log.debug('[TOOL]', selectedToolGroupId, '->', toolGroup.id, toolGroupId);
    // setSelectedToolId(toolId);
    history.push(`${workspacePath}/${toolGroupId ?? ''}`);
  }

  return (
    <Grid
      container
      direction={isOnBottom ? 'column' : 'row'}
      spacing={1}
      className={clsx(classes.toolBar, {
        [classes.toolBarSide]: !isOnBottom,
        [classes.toolBarBottom]: isOnBottom,
      })}
    >
      <Grid item xs={isOnBottom ? 12 : 10}>
        <Switch>
          {tools.map((toolGroup) => {
            return (
              <Route exact key={toolGroup.id} path={getToolGroupPath(toolGroup)} >
                <ToolPane toolGroup={toolGroup} workspaceId={workspaceId} />
              </Route>
            );
          })}
        </Switch>
      </Grid>
      <Grid item xs={isOnBottom ? 12 : 2}>
        <Paper className={classes.toolBarPaper} >
          <ButtonGroup
            className={classes.tabs}
            orientation={isOnBottom ? 'horizontal' : 'vertical'}
            aria-label={t('Toolbar Tabs')}
          >
            {tools.map(toolGroup => {
              return (
                <Button
                  key={toolGroup.titleKey}
                  className={clsx({ [classes.tabSide]: !isOnBottom, [classes.tabBottom]: isOnBottom })}
                  color={toolGroup.id === selectedToolGroupId ? 'secondary' : 'primary'}
                  onClick={() => onSelectedToolGroup(toolGroup)}
                  aria-label={toolGroup.titleKey}
                >
                  <OpenWorkShopIcon name={toolGroup.icon} />
                </Button>
              );
            })}
          </ButtonGroup>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ToolBar;
