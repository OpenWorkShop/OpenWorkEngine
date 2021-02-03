import React, {FunctionComponent} from 'react';
import {
  MachineModalsFragment,
} from '../../graphql';
import {useLogger} from '../../../hooks';
import {useTrans} from '../../Context';
import {getModalOptions} from '../../Machines/MachineModals';
import IconSelect from '../../../components/Forms/IconSelect';

interface IModal {
  value: string;
  code: string | null;
  __typename?: string;
}

type Props = {
  modals: MachineModalsFragment;
}

const MachineModals: FunctionComponent<Props> = (props) => {
  const log = useLogger(MachineModals);
  const t = useTrans();
  const { modals } = props;

  function setValue(modal: IModal, value: string) {
    log.debug(modal, value);
  }

  function setWcs(wcs: string) {
    log.debug('wcs', wcs);
  }

  function renderModal(modal: IModal | null): React.ReactNode {
    if (!modal) return null;
    if (!modal.__typename || !modal.code) {
      log.error('Modal missing type/code', modal);
      return null;
    }
    const [title, value, options] = getModalOptions(modal.__typename, modal.value);
    log.debug('render', title, value, options, modal);

    return <IconSelect
      items={options}
      selectedId={value}
      label={[title, `(${modal.code})`].join(' ')}
      setSelectedId={(s) => setValue(modal, s.toString())}
    />;
  }

  return (<React.Fragment>
    {renderModal(modals.units)}
    {renderModal(modals.motion)}
    {renderModal(modals.arcDistance)}
    {renderModal(modals.distance)}
    {renderModal(modals.feedRate)}
    {renderModal(modals.plane)}
    {renderModal(modals.programState)}
    {renderModal(modals.spindleDirection)}
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

export default MachineModals;
