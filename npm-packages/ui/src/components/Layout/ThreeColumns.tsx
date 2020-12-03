import React, { FunctionComponent } from 'react';
import { Grid } from '@material-ui/core';


type CenterSize = 'lg' | 'md' | 'sm';

interface OwnProps {
  column1?: React.ReactNode;
  children: React.ReactNode;
  column3?: React.ReactNode;
  size?: CenterSize;
}

type Props = OwnProps;

type SizeNum = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

const ThreeColumns: FunctionComponent<Props> = (props) => {
  const { column1, children, column3, size } = props;
  const s = size ?? 'sm';

  let maxCenter: SizeNum = 4;
  let maxSide: SizeNum = 4;
  if (s === 'lg') {
    maxCenter = 8;
    maxSide = 2;
  }
  if (s === 'md') {
    maxCenter = 6;
    maxSide = 3;
  }

  return (
    <Grid container alignItems='center' >
      <Grid item xs={1} sm={2} md={maxSide > 3 ? 3 : maxSide} lg={maxSide > 4 ? 4 : maxSide} >
        {column1}
      </Grid>
      <Grid item xs={12} sm={8} md={maxCenter > 6 ? maxCenter : 6} lg={maxCenter > 4 ? maxCenter : 4}>
        {children}
      </Grid>
      <Grid item xs={1} sm={2} md={maxSide > 3 ? 3 : maxSide} lg={maxSide > 4 ? 4 : maxSide} >
        {column3}
      </Grid>
    </Grid>
  );
};

export default ThreeColumns;
