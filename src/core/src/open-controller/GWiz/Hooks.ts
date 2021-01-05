import React from 'react';
import { GWizContext } from './GWizContext';
import {IVisualizeGCode} from './types';

export function useGcodeVisualizer(): IVisualizeGCode {
  const context = React.useContext(GWizContext);
  if (!context) throw new Error('No gcode visualizer');
  return context;
}

export function tryUseGcodeVisualizer(): IVisualizeGCode | undefined {
  return React.useContext(GWizContext);
}

export function usePortal(parentDomId: string): HTMLDivElement {
  const rootElemRef = React.useRef(document.createElement('div'));

  React.useEffect(function setupElement() {
    const parentElem = document.querySelector(`#${parentDomId}`);
    parentElem?.appendChild(rootElemRef.current);
    return function removeElement() {
      rootElemRef.current.remove();
    };
  }, [rootElemRef]);

  return rootElemRef.current;
}
