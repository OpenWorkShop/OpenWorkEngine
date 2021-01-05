import * as React from 'react';
import * as THREE from 'three';
import useStyles from './Styles';
import useLogger from '../../utils/logging/UseLogger';
import {GWizProps, IVisualizeGCode, IVisualizerPreferences, ViewPlane} from './types';
import GWizScene from './GWizScene';
import { useTheme } from '@material-ui/core';
import { GWizContext } from './GWizContext';
import {useOpenController, useWindowSize} from '../Context';

const GcodeVisualizer: React.FunctionComponent<GWizProps> = (props) => {
  const log = useLogger(GcodeVisualizer);
  const theme = useTheme();
  const { header, children, footer, domId, className } = props;
  const oc = useOpenController();
  const renderer = React.useMemo(() => new THREE.WebGLRenderer(), []);
  const [scene, setScene] = React.useState<GWizScene | undefined>(undefined);
  const [viewPlane, setViewPlane] = React.useState<ViewPlane>(ViewPlane.None);
  const { width, height } = useWindowSize();

  const preferences: IVisualizerPreferences = {
    viewPlane,
    setViewPlane,
  };

  const wiz: IVisualizeGCode = { visualizerPreferences: preferences };

  function createScene(): GWizScene {
    const scene: GWizScene = new GWizScene(renderer, wiz.visualizerPreferences, theme, oc);
    setScene(scene);
    return scene;
  }

  // Create and/or resize the canvas
  React.useEffect(() => {
    const canvasId = `canvas-${domId}`;
    const parent = document.querySelector(`#${domId}`);

    if (parent != null) {
      log.debug('gwiz', domId, parent.clientWidth, parent.clientHeight);

      const existing = document.querySelector(`#${canvasId}`);
      if (existing !== renderer.domElement) {
        existing?.remove();
        renderer.domElement.id = canvasId;
        parent?.appendChild(renderer.domElement);
      }

      const sc = scene ?? createScene();
      sc.resize(parent.clientWidth, parent.clientHeight);
    } else {
      log.error('missing parent ID #', domId);
    }
  }, [renderer, width, height]);

  return (
    <GWizContext.Provider value={wiz} >
      {header ? header : null}
      <div className={className} id={domId} >
        {children}
      </div>
      {footer ? footer : null}
    </GWizContext.Provider>
  );
};

export default GcodeVisualizer;
