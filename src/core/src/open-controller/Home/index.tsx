import React, {FunctionComponent} from 'react';
import {Card, Grid, Paper} from '@material-ui/core';
import {HelpfulHeader, ToolbarCard} from '../../components';
import {useTrans} from '../Context';
import useStyles from './styles';

const Home: FunctionComponent = () => {
  const t = useTrans();
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12} md={6} lg={4} xl={3}>
        <ToolbarCard title={t('Gcode Programs')} >

        </ToolbarCard>
      </Grid>
    </Grid>
  );
};

export default Home;
