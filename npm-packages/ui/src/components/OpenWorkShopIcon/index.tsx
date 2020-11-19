import React from 'react';
import CncIcon from './CncIcon';
import MakerMadeIcon from './MakerMadeIcon';
import MaslowIcon from './MaslowIcon';
import TdpIcon from './TdpIcon';
import XyzIcon from './XyzIcon';
import ExtruderIcon from './ExtruderIcon';
import HeatedBedIcon from './HeatedBedIcon';

export { CncIcon, MaslowIcon, MakerMadeIcon, TdpIcon, XyzIcon, HeatedBedIcon, ExtruderIcon };

export interface IOwsIconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
}

export const Icons: React.FunctionComponent<IOwsIconProps> = (props) => {
  const name = props.name.toLowerCase();

  // Types
  if (name === 'cnc') return <CncIcon {...props} />;
  if (name === 'tdp' || name === '3dp') return <TdpIcon {...props} />;

  // Misc.
  if (name === 'maslow') return <MaslowIcon {...props} />;
  if (name === 'xyz') return <XyzIcon {...props} />;
  if (name === 'extruder') return <ExtruderIcon {...props} />;
  if (name === 'heated-bed') return <HeatedBedIcon {...props} />;

  // Brands
  if (name === 'makermade') return <MakerMadeIcon {...props} />;

  return <span>name</span>;
};

export default Icons;
