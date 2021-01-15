import React, { FunctionComponent } from 'react';
import {useOpenController, useWindowSize} from '../Context';
import GWizCanvas from './GWizCanvas';
import {IVisualizerControlsPreferences, IVisualizerStyles, ViewPlane} from './types';
import {useSelector} from 'react-redux';
import {AppState} from '../redux';
import {IMachineAxis} from '../Machines';

type Props = {
  id: string,
  className?: string,
  axes: IMachineAxis[],
};

const GWiz: FunctionComponent<Props> = (props) => {
  const { id, className, axes } = props;
  const oc = useOpenController();
  const domId = `gViz-${id}`;
  const log = oc.ows.logManager.getLogger(domId);
  const { width, height } = useWindowSize();

  // Redux state.
  const controls =
    useSelector<AppState, IVisualizerControlsPreferences>(s => s.gWiz.visualizerPreferences.controls);
  const styles = useSelector<AppState, IVisualizerStyles>(s => s.gWiz.visualizerPreferences.styles);
  const viewPlane = useSelector<AppState, ViewPlane>(s => s.gWiz.visualizerPreferences.viewPlane);

  // Memo canvas must depend only upon immutable objects, so it does not get re-created.
  const canvas: GWizCanvas = React.useMemo(() => new GWizCanvas(oc), [oc]);

  // Infrequent changes to machine axes themselves.
  React.useEffect(() => {
    canvas.draw(axes);
  }, [canvas, axes]);

  // Respond to preferences changes.
  React.useEffect(() => { canvas.controls.applyPreferences(controls); }, [canvas, controls]);
  React.useEffect(() => { canvas.applyViewPlane(viewPlane); }, [canvas, viewPlane]);
  React.useEffect(() => { canvas.applyStyles( styles ); }, [ canvas, styles ]);

  // Create and/or resize the canvas
  React.useEffect(() => {
    const parent = document.querySelector(`#${domId}`);

    if (parent != null) {
      if (canvas.domElement.parentElement != parent) {
        parent.innerHTML = '';
        parent.appendChild(canvas.domElement);
      }

      canvas.resize(parent.clientWidth, parent.clientHeight);
    } else {
      log.error('missing parent ID #', domId);
    }
  }, [canvas, width, height]);

  // const Wiz = React.forwardRef<HTMLDivElement, Props>((props, ref) => (
  //   <div className={className} ref={ref} id={domId} />
  // ));
  // return <Wiz {...props} />;

  return <div className={className} id={domId} />;
};

export default GWiz;
