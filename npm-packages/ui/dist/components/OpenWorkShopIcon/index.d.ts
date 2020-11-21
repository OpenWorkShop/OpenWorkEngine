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
export declare const Icons: React.FunctionComponent<IOwsIconProps>;
export default Icons;
