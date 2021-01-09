import {
  ChangeAxisMaterialPayload,
  GWIZ_SET_AXES,
  GWIZ_SET_AXIS_MATERIAL,
  GWIZ_SET_VIEW_PLANE,
  GWizActionTypes,
  ViewPlane
} from './types';
import {WorkspaceAxisMap} from '../Workspaces';

export function gWizSetViewPlane(vp: ViewPlane): GWizActionTypes {
  return {
    type: GWIZ_SET_VIEW_PLANE,
    payload: vp,
  };
}

export function gWizSetAxes(axes: WorkspaceAxisMap): GWizActionTypes {
  return {
    type: GWIZ_SET_AXES,
    payload: axes,
  };
}

export function gWizSetAxisMaterial(payload: ChangeAxisMaterialPayload): GWizActionTypes {
  return {
    type: GWIZ_SET_AXIS_MATERIAL,
    payload: payload,
  };
}
