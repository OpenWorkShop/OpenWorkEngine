import React from 'react';;

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

