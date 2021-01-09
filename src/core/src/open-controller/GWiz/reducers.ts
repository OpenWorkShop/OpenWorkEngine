import {
  GWIZ_SET_AXES,
  GWIZ_SET_AXIS_MATERIAL,
  GWIZ_SET_VIEW_PLANE,
  GWizActionTypes,
  GWizState,
  ViewPlane,
} from './types';
import * as THREE from 'three';
import {combineReducers} from '@reduxjs/toolkit';

const initialState: GWizState = {
  visualizerPreferences: {
    axes: {},
    viewPlane: ViewPlane.None,
    controls: {},
    styles: {
      backgroundColor: new THREE.Color('white'),
      axes: {},
    },
  }
};

export function gWizReducer(
  state = initialState,
  action: GWizActionTypes,
): GWizState {
  const vp = state.visualizerPreferences;
  switch ( action.type ) {
  case GWIZ_SET_VIEW_PLANE:
    return { visualizerPreferences: { ...vp, viewPlane: action.payload } };
  case GWIZ_SET_AXES:
    return { visualizerPreferences: { ...vp, axes: action.payload } };
  case GWIZ_SET_AXIS_MATERIAL:
    return { visualizerPreferences: { ...vp, styles: { ...vp.styles, axes: {
      ...vp.styles.axes, [action.payload.axisName]: action.payload.material
    } } } };
  default:
    return state;
  }
}

export default combineReducers({
  gWiz: gWizReducer,
});
