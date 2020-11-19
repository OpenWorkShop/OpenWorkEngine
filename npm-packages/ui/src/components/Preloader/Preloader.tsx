import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import FullCentered from '../Layout/FullCentered';

const Preloader: React.FunctionComponent = () => {
  const size = 100;

  return (
    <FullCentered width={size}>
      <CircularProgress size={size} />
    </FullCentered>
  );
};

export default Preloader;
