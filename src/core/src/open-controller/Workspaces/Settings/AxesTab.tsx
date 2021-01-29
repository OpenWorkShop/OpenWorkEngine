import * as React from 'react';
import MachineAxesEditor from '../../MachineProfiles/MachineAxesEditor';
import _ from 'lodash';
import {IHaveWorkspace} from '../types';
import useLogger from '../../../utils/logging/UseLogger';
import {MachineAxes} from '../../Machines/CustomizedMachine';
import HelpfulHeader from '../../../components/Text/HelpfulHeader';
import {useTrans} from '../../Context';
import {useWorkspaceSelector} from '../hooks';

type Props = IHaveWorkspace;

const AxesTab: React.FunctionComponent<Props> = (props) => {
  const t = useTrans();
  const log = useLogger(AxesTab);
  const { workspaceId } = props;
  const axes = useWorkspaceSelector(workspaceId, ws => ws.settings.axes) ?? {};
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
        axes={_.keyBy(axes, (a) => a.name)}
        onChanged={onChangedAxes}
      />
    </div>
  );
};

export default AxesTab;
