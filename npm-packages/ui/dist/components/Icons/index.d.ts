import React from 'react';
export { CncIcon } from './CncIcon';
export { MakerMadeIcon } from './MakerMadeIcon';
export { MaslowIcon } from './MaslowIcon';
export { TdpIcon } from './TdpIcon';
export { XyzIcon } from './XyzIcon';
interface IOwsIconProps extends React.SVGProps<SVGSVGElement> {
    name: string;
}
export declare const Icons: React.FunctionComponent<IOwsIconProps>;
export default Icons;
