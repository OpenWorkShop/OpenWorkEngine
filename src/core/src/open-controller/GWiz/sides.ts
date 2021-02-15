import {IVisualizerStyles, RenderGroupType, ViewSide} from './types';
import * as THREE from 'three';
import {OwsIconName} from '../../components/OpenWorkShopIcon';

export const allSides = [ViewSide.Front, ViewSide.Back, ViewSide.Left, ViewSide.Right, ViewSide.Top, ViewSide.Bottom];

export function isSide(sides: ViewSide, testSide: ViewSide): boolean {
  const snum = testSide as number;
  if (snum === undefined) return false;
  return (sides & snum) !== 0;
}

// Multi-side color.
export function getSidesColor(sides: ViewSide, styles: IVisualizerStyles): THREE.Color {
  let col: THREE.Color | undefined = undefined;
  allSides.forEach(s => {
    if (isSide(sides, s)) {
      const scol = new THREE.Color(getSideColor(s, styles));
      col = col?.lerp(scol, 0.5) ?? scol;
    }
  });
  const def = new THREE.Color('#FFFFFF');
  return col ? (col as THREE.Color).lerp(def, 0.5) : def;
}

// Single-side color
export function getSideColor(side: ViewSide, styles: IVisualizerStyles): string {
  if (side === ViewSide.Top || side === ViewSide.Bottom) return styles.renderGroups[RenderGroupType.Z].color;
  if (side === ViewSide.Left || side === ViewSide.Right) return styles.renderGroups[RenderGroupType.X].color;
  if (side === ViewSide.Back || side === ViewSide.Front) return styles.renderGroups[RenderGroupType.Y].color;
  throw new Error('Invalid side: ' + side.toString());
}

export function getSidesNames(sides: ViewSide): string[] {
  const parts: string[] = [];
  allSides.forEach(s => {
    if (isSide(sides, s)) {
      parts.push(s.toString());
    }
  });
  return parts;
}

export function getSideIcon(vp: ViewSide): OwsIconName {
  if (vp === ViewSide.Top) return 'view-top';
  if (vp === ViewSide.Left) return 'view-left';
  if (vp === ViewSide.Right) return 'view-right';
  if (vp === ViewSide.Front) return 'view-front';
  return 'view-3d';
}
