import React, { FunctionComponent } from 'react';
import {useOpenController} from '../../Context';

const Home: FunctionComponent = () => {
  const openController = useOpenController();
  const hasWorkspaces = openController.workspaces.length > 0;

  return (
    <div>
      Home

    </div>
  );
};

export default Home;
