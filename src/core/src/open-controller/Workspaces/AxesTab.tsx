import * as React from 'react';
import MachineAxesEditor from '../../components/MachineProfiles/MachineAxesEditor';
import _ from 'lodash';
import {IHaveWorkspace} from './types';
import useLogger from '../../utils/logging/UseLogger';
import {MachineAxes} from '../Machines/CustomizedMachine';
import HelpfulHeader from '../../components/Text/HelpfulHeader';
import {useTrans} from '../Context';

type Props = IHaveWorkspace;

const AxesTab: React.FunctionComponent<Props> = (props) => {
  const t = useTrans();
  const log = useLogger(AxesTab);
  const { workspace } = props;
  // const machine = workspace.machine;

  function onChangedAxes(a: MachineAxes) {
    log.debug('machine', a);
  }

  return (
    <div>
      <HelpfulHeader
        tip={t('Configure the size of the workspace to match reality (such that the visualizer looks correct).')}
        title={t('Axes')}
        variant="subtitle1"
      />
      <MachineAxesEditor
        axes={_.keyBy(workspace.axes, (a) => a.name)}
        onChanged={onChangedAxes}
      />
    </div>
  );
};

export default AxesTab;
