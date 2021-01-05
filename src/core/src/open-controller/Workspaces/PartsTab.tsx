import * as React from 'react';
import {useTrans} from '../Context';
import useLogger from '../../utils/logging/UseLogger';
import useStyles from './Styles';
import {IHaveWorkspace} from './types';
import ChooseMachineParts from '../../components/MachineProfiles/ChooseMachineParts';
import {IMachinePartChoice, IMachinePartSetting} from '../Machines/CustomizedMachine';
import {MachinePartFragment, MachineSettingFragment, MachineSettingsFragment} from '../graphql';
import HelpfulHeader from '../../components/Text/HelpfulHeader';

type Props = IHaveWorkspace;

const PartsTab: React.FunctionComponent<Props> = (props) => {
  const t = useTrans();
  const log = useLogger(PartsTab);
  const classes = useStyles();
  const { workspace } = props;
  const parts = workspace.parts;

  function onCompletedParts() {
    log.debug('hi');
  }

  function getSetting(setting: MachineSettingsFragment): IMachinePartSetting {
    return {
      ...setting,
      title: setting.title ?? '',
    };
  }

  function getPart(part: MachinePartFragment): IMachinePartChoice {
    return {
      sortOrder: 0,
      ...part,
      id: part.id ?? '',
      description: part.description ?? '',
      title: part.title ?? '',
      settings: part.settings.map(getSetting),
    };
  }

  return (
    <React.Fragment>
      <HelpfulHeader
        tip={t('These tell Makerverse the capabilities of your machine, and therefore what UI to display.')}
        title={t('Parts')}
        variant="subtitle1"
      />
      <ChooseMachineParts parts={parts.map(getPart)} onComplete={onCompletedParts} />
    </React.Fragment>
  );
};

export default PartsTab;
