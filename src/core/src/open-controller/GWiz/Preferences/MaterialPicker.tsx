import React, { FunctionComponent } from 'react';
import {Color, ColorBox} from 'material-ui-color';
import {Button, Popover} from '@material-ui/core';
import {IMaterial} from '../types';
import useStyles from './styles';
import {useLogger} from '../../../Hooks';

type Props = {
  materialParameters: IMaterial;
  onChange: (c: IMaterial) => void;
};

const MaterialPicker: FunctionComponent<Props> = (props) => {
  const log = useLogger(MaterialPicker);
  const classes = useStyles();
  const { onChange, materialParameters } = props;
  const { color } = materialParameters;
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const buttonStyle = false ? {} : { backgroundColor: color };

  function onColorChange(c: Color): void {
    // log.debug('color', c.rgb);
    onChange({ ...materialParameters, color: `#${c.hex}` });
  }

  log.verbose('draw');

  return (
    <React.Fragment>
      <Button
        style={buttonStyle}
        className={classes.colorButton}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={() => setAnchorEl(null)}
      >
        <ColorBox
          value={color}
          onChange={onColorChange}
        />
      </Popover>
    </React.Fragment>
  );
  // return (
  //   <ColorPicker
  //     defaultValue={materialParameters.color}
  //     onChange={onColorChange}
  //     disableAlpha={true}
  //     hideTextfield
  //   />
  // );
};

export default MaterialPicker;
