import React from 'react';
import CncIcon from './CncIcon';
import MakerMadeIcon from './MakerMadeIcon';
import MaslowIcon from './MaslowIcon';
import TdpIcon from './TdpIcon';
import XyzIcon from './XyzIcon';
export { CncIcon } from './CncIcon';
export { MakerMadeIcon } from './MakerMadeIcon';
export { MaslowIcon } from './MaslowIcon';
export { TdpIcon } from './TdpIcon';
;
export { XyzIcon } from './XyzIcon';
export const Icons = (props) => {
    const name = props.name.toLowerCase();
    // Types
    if (name === 'cnc')
        return (React.createElement(CncIcon, Object.assign({}, props)));
    if (name === 'tdp' || name === '3dp')
        return (React.createElement(TdpIcon, Object.assign({}, props)));
    // Misc.
    if (name === 'maslow')
        return (React.createElement(MaslowIcon, Object.assign({}, props)));
    if (name === 'xyz')
        return (React.createElement(XyzIcon, Object.assign({}, props)));
    // Brands
    if (name === 'makermade')
        return (React.createElement(MakerMadeIcon, Object.assign({}, props)));
    return React.createElement("span", null, "name");
};
export default Icons;
//# sourceMappingURL=index.js.map