import * as React from 'react';
import {IHaveWorkspace} from './types';
import useLogger from '../../utils/logging/UseLogger';
import useStyles from './Styles';
import {InchesMillimetersSelect} from '../../components/Units';
import {useWorkspaceUnits} from './Hooks';
import {UnitType} from '../../components/Units/types';

type Props = IHaveWorkspace;

const WorkspaceUnitSelect: React.FunctionComponent<Props> = (props) => {
  const log = useLogger(WorkspaceUnitSelect);
  const classes = useStyles();
  const { workspaceId } = props;
  const units = useWorkspaceUnits(workspaceId);

  function setUnits(u: UnitType) {
    log.debug('imp', u);
  }

  return (
    <InchesMillimetersSelect units={units} setUnits={setUnits} />
  );
};

export default WorkspaceUnitSelect;
