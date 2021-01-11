import { Paper, Grid, Typography, CircularProgress } from '@material-ui/core';
import * as React from 'react';
import { IHaveToolGroup } from '../../Tools';
import useStyles from './Styles';
import {useTrans} from '../../Context';
import ToolLoader from '../../Tools/ToolLoader';
import {IHaveWorkspace} from '../../Workspaces';

type Props = IHaveToolGroup & IHaveWorkspace;

const ToolPane: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const t = useTrans();
  const { toolGroup, workspaceId } = props;
  const { tools } = toolGroup;
  const showTitle = false;

  return (
    <Paper className={classes.toolPaper}>
      <Grid container spacing={0}>
        <React.Suspense fallback={<CircularProgress />}>
          {tools.map((tool) => {
            return (
              <React.Fragment key={tool.id}>
                {showTitle && <Grid item xs={12}>
                  <Typography variant="h6">{t(tool.titleKey)}</Typography>
                </Grid>}
                <Grid item xs={12}>
                  <ToolLoader tool={tool} workspaceId={workspaceId} />
                </Grid>
              </React.Fragment>
            );
          })}
        </React.Suspense>
      </Grid>
    </Paper>
  );
};

export default ToolPane;
