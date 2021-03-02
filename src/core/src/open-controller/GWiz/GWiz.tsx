import React, {FunctionComponent} from 'react';
import {useOpenController, useWindowSize} from '../Context';
import {GWizCanvas} from './Visualizer';
import {GWizActions, IVisualizerControlsPreferences, IVisualizerSceneState, IVisualizerStyles} from './types';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../redux';
import {IMachineAxis} from '../Machines';
import {IHaveWorkspace, tryUseWorkspaceControllerSelector} from '../Workspaces';
import {gWizSlice} from './index';

type Props = IHaveWorkspace & {
  className?: string,
  axes: IMachineAxis[],
};

const GWiz: FunctionComponent<Props> = (props) => {
  const { className, axes, workspaceId } = props;
  const sceneId = workspaceId;
  const oc = useOpenController();
  const domId = `gWiz-${workspaceId}`;
  const cubeId = `${domId}-cube`;
  const log = oc.ows.logManager.getLogger(domId);
  const { width, height } = useWindowSize();

  // Redux state.
  const dispatch = useDispatch();
  const controls =
    useSelector<AppState, IVisualizerControlsPreferences>(s => s.gWiz.visualizerPreferences.controls);
  const styles = useSelector<AppState, IVisualizerStyles>(s => s.gWiz.visualizerPreferences.styles);
  const sceneState = useSelector<AppState, IVisualizerSceneState | undefined>(s => s.gWiz.scenes[sceneId]);

  function buildActions(): GWizActions {
    return {
      saveCameraState: (state) =>
        dispatch(gWizSlice.actions.setCameraState({ sceneId, state })),
      setHighlightedObject: (state) =>
        dispatch(gWizSlice.actions.setSceneHighlightedObject({ sceneId, state })),
      setSelectedObject: (state) =>
        dispatch(gWizSlice.actions.setSceneSelectedObject({ sceneId, state })),
    };
  }

  // Memo canvas must depend only upon immutable objects, so it does not get re-created.
  const canvas: GWizCanvas = React.useMemo(
    () => new GWizCanvas(oc, buildActions()),
    [oc, dispatch]
  );

  // DOM events
  /*
  React.useEffect(() => {
    const parent = document.querySelector(`#${domId}`);
    if (!parent) return;
    const handler = canvas.handleMouseMove.bind(canvas);
    parent.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [canvas, domId]);*/

  // Infrequent changes to machine axes themselves.
  React.useEffect(() => {
    const navCubeDiv = document.querySelector(`#${cubeId}`) as HTMLDivElement;
    canvas.draw(axes, navCubeDiv);
  }, [canvas, axes, cubeId]);

  // Respond to preferences & state changes.
  React.useEffect(() => { canvas.applySceneState(sceneState); }, [canvas, sceneState]);
  React.useEffect(() => { canvas.controls.applyPreferences(controls); }, [canvas, controls]);
  React.useEffect(() => { canvas.applyStyles( styles ); }, [ canvas, styles ]);

  const program = tryUseWorkspaceControllerSelector(workspaceId, c => c.machine.program);
  React.useEffect(() => {
    canvas.plans.setProgram(program ?? undefined);
  }, [canvas, program]);

  // Update machine state
  const mPos = tryUseWorkspaceControllerSelector(workspaceId, c => c.machine.status.machinePosition );
  React.useEffect(() => {
    if (mPos) canvas.updatePosition(mPos);
  }, [canvas, mPos]);

  const units = tryUseWorkspaceControllerSelector(workspaceId, c => c.machine.configuration.modals.units.data);
  const plane = tryUseWorkspaceControllerSelector(workspaceId, c => c.machine.configuration.modals.plane.data);
  React.useEffect(() => {
    if (units) dispatch(gWizSlice.actions.setSceneUnits({ sceneId, state: units }));
    if (plane) dispatch(gWizSlice.actions.setScenePlane({ sceneId, state: plane }));
  }, [canvas, sceneId, units, plane]);

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

  return <React.Fragment>
    <div id={cubeId} style={{ width: 150, height: 150, position: 'absolute' }} />
    <div className={className} id={domId} />
  </React.Fragment>;
};

export default GWiz;
