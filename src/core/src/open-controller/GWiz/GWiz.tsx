import React, { FunctionComponent } from 'react';
import {useOpenController, useWindowSize} from '../Context';
import GWizCanvas from './Visualizer/GWizCanvas';
import {IVisualizerControlsPreferences, IVisualizerStyles, ViewPlane} from './types';
import {useSelector} from 'react-redux';
import {AppState} from '../redux';
import {IMachineAxis} from '../Machines';
import NavCube from './Visualizer/NavCube';
import {IHaveWorkspace, tryUseWorkspaceControllerSelector, useWorkspaceControllerSelector} from '../Workspaces';

type Props = IHaveWorkspace & {
  className?: string,
  axes: IMachineAxis[],
};

const GWiz: FunctionComponent<Props> = (props) => {
  const { className, axes, workspaceId } = props;
  const oc = useOpenController();
  const domId = `gWiz-${workspaceId}`;
  const cubeId = `${domId}-cube`;
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
    const navCubeDiv = document.querySelector(`#${cubeId}`) as HTMLDivElement;
    canvas.draw(axes, navCubeDiv);
  }, [canvas, axes, cubeId]);

  // Respond to preferences changes.
  React.useEffect(() => { canvas.controls.applyPreferences(controls); }, [canvas, controls]);
  React.useEffect(() => { canvas.applyViewPlane(viewPlane); }, [canvas, viewPlane]);
  React.useEffect(() => { canvas.applyStyles( styles ); }, [ canvas, styles ]);

  // Update machine state
  const mPos = tryUseWorkspaceControllerSelector(workspaceId, c => c.machine.status.machinePosition );
  React.useEffect(() => {
    if (mPos) canvas.updatePosition(mPos);
  }, [canvas, mPos]);

  // Create and/or resize the canvas
  React.useEffect(() => {
    const parent = document.querySelector(`#${domId}`);

    if (parent != null) {
      if (canvas.domElement.parentElement != parent) {
        parent.innerHTML = '';
        parent.appendChild(canvas.domElement);
      }

      // Remove the (absolute) position from the screen size to get the remaining size.
      const boundingRect = parent.getBoundingClientRect();
      const w = width - boundingRect.left;
      const h = height - boundingRect.top;

      canvas.resize(w, h);
    } else {
      log.error('missing parent ID #', domId);
    }
  }, [canvas, width, height]);

  // const Wiz = React.forwardRef<HTMLDivElement, Props>((props, ref) => (
  //   <div className={className} ref={ref} id={domId} />
  // ));
  // return <Wiz {...props} />;

  return <React.Fragment>
    <div id={cubeId} style={{ width: 150, height: 150, position: 'absolute' }} />
    <div className={className} id={domId} />
  </React.Fragment>;
};

export default GWiz;
