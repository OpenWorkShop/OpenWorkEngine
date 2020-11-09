import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import FullCentered from '../FullCentered/FullCentered';
const Preloader = () => {
    const size = 100;
    return (React.createElement(FullCentered, { width: size },
        React.createElement(CircularProgress, { size: size })));
};
export default Preloader;
//# sourceMappingURL=Preloader.js.map