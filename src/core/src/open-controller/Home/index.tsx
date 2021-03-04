import React, {FunctionComponent} from 'react';
import {Grid} from '@material-ui/core';
import {ToolbarCard} from '../../components';
import {useTrans} from '../Context';

const Home: FunctionComponent = () => {
  const t = useTrans();

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
