import * as React from 'react';
import {GWizContext} from './GWizContext';
import {IVisualizeGCode, IVisualizerPreferences, ViewPlane} from './types';

type Props = {
 children: React.ReactNode;
};

const GWizProvider: React.FunctionComponent<Props> = (props) => {
  const [viewPlane, setViewPlane] = React.useState<ViewPlane>(ViewPlane.None);

  const preferences: IVisualizerPreferences = {
    viewPlane,
    setViewPlane,
  };

  const wiz: IVisualizeGCode = { preferences };

  return (
    <GWizContext.Provider value={wiz}  >
      {props.children}
    </GWizContext.Provider>
  );
};

export default GWizProvider;
