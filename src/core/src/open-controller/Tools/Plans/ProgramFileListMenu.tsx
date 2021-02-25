import React, { FunctionComponent } from 'react';
import SimpleDialog from '../../../components/Dialogs/SimpleDialog';
import ListMenu from '../../Navigation/ListMenu';
import {ProgramFileHandler} from './types';

type Props = {
  onLoaded: ProgramFileHandler;
};

const ProgramFileListMenu: FunctionComponent<Props> = (props) => {
  return (<ListMenu>

  </ListMenu>);
};

export default ProgramFileListMenu;
