import React, {FunctionComponent} from 'react';
import {
  MachineModalsFragment,
} from '../graphql';
import {useLogger} from '../../hooks';
import {useTrans} from '../Context';
import {getModalOptions} from '../Machines/MachineModals';
import IconSelect from '../../components/Forms/IconSelect';

interface IModal {
  value: string;
  code: string | null;
  __typename?: string;
}

type Props = {
  modals: MachineModalsFragment;
}

const modalGroups = [
  'units', 'motion', 'arcDistance', 'distance', 'feedRate', 'cannedCycleReturnMode',
  'pathControlMode', 'spindleSpeed', 'cylindricalInterpolation', 'plane', 'programState'] as const;
type ModalGroup = typeof modalGroups[number];

const MachineModalList: FunctionComponent<Props> = (props) => {
  const log = useLogger(MachineModalList);
  const t = useTrans();
  const { modals } = props;

  function setValue(modal: IModal, value: string) {
    log.debug(modal, value);
  }

  function setWcs(wcs: string) {
    log.debug('wcs', wcs);
  }

  function renderModal(modalGroup: ModalGroup): React.ReactNode {
    const modal = modals[modalGroup];
    if (!modal) return null;
    if (!modal.__typename || !modal.code) {
      log.error('Modal missing type/code', modal);
      return null;
    }
    const [title, value, options] = getModalOptions(modal.__typename, modal.value);
    log.verbose('render', title, value, options, modal);

    return <IconSelect
      key={modalGroup}
      items={options}
      selectedId={value}
      label={[title, `(${modal.code})`].join(' ')}
      setSelectedId={(s) => setValue(modal, s.toString())}
    />;
  }

  return (<React.Fragment>
    {modalGroups.map(renderModal)}
    <IconSelect
      items={[...Array(modals.workCoordinateSystemCount || 0).keys()].map(v => {
        const va = v?.toString();
        return { itemId: va, title: `#${va}` };
      })}
      selectedId={modals.workCoordinateSystemCurrent}
      label={t('Work Coordinate System')}
      setSelectedId={(s) => setWcs(s.toString())}
    />
  </React.Fragment>);
};

export default MachineModalList;
