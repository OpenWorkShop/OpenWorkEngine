import React, { FunctionComponent } from 'react';
import { Grid } from '@material-ui/core';

interface OwnProps {
  column1?: React.ReactNode;
  children: React.ReactNode;
  column3?: React.ReactNode;
}

type Props = OwnProps;

const ThreeColumns: FunctionComponent<Props> = (props) => {
  const { column1, children, column3 } = props;

  return (
    <Grid container alignItems='center' >
      <Grid item xs={1} sm={2} md={3} lg={4} >
        {column1}
      </Grid>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        {children}
      </Grid>
      <Grid item xs={1} sm={2} md={3} lg={4} >
        {column3}
      </Grid>
    </Grid>
  );
};

export default ThreeColumns;
