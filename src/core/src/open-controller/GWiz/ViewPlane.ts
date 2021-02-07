import {ViewPlane} from './types';
import {OwsIconName} from '../../components/OpenWorkShopIcon';

export function getViewPlaneNameKey(vp: ViewPlane): string {
  if (vp === ViewPlane.None) return '?';
  if (vp === ViewPlane.ThreeD) return '3D';
  if (vp === ViewPlane.Top) return 'Top';
  if (vp === ViewPlane.Bottom) return 'Bottom';
  if (vp === ViewPlane.Left) return 'Left';
  if (vp === ViewPlane.Right) return 'Right';
  if (vp === ViewPlane.Front) return 'Front';
  if (vp === ViewPlane.Back) return 'Back';
  return '';
}

export function getViewPlaneIcon(vp: ViewPlane): OwsIconName {
  if (vp === ViewPlane.ThreeD) return 'view-3d';
  if (vp === ViewPlane.Top) return 'view-top';
  if (vp === ViewPlane.Left) return 'view-left';
  if (vp === ViewPlane.Right) return 'view-right';
  if (vp === ViewPlane.Front) return 'view-front';
  return 'view-unknown';
}
