import * as React from 'react';
import * as THREE from 'three';
import useStyles from './Styles';
import useLogger from '@openworkshop/lib/utils/logging/UseLogger';
import {GWizProps} from './types';
import GWizProvider from './GWizProvider';

const GcodeVisualizer: React.FunctionComponent<GWizProps> = (props) => {
  const log = useLogger(GcodeVisualizer);
  const classes = useStyles();
  const { header, children, footer, domId, className } = props;
  const [renderer] = React.useState(new THREE.WebGLRenderer());

  React.useEffect(() => {
    const parent = document.querySelector(`#${domId}`);
    log.debug('portalize', renderer, parent);
    if (parent != null) {
      parent?.appendChild(renderer.domElement);
      renderer.setSize(parent.clientWidth, parent.clientHeight);
    }
  }, [renderer]);

  log.debug('portal', children, renderer.domElement);

  return (
    <GWizProvider >
      {header ? header : null}
      <div className={className} id={domId} >
        {children}
      </div>
      {footer ? footer : null}
    </GWizProvider>
  );
};

export default GcodeVisualizer;
