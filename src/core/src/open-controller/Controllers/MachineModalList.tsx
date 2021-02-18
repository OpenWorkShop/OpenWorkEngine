import React, {FunctionComponent} from 'react';
import {
  MachineModalsFragment, useSetModalSettingsMutation,
} from '../graphql';
import {useLogger} from '../../hooks';
import {useTrans} from '../Context';
import IconSelect, {ISelectItem} from '../../components/Forms/IconSelect';
import {ModalGroup, modalGroups} from '../Machines';
import {titlize} from '../../utils';
import {useControllerCommand} from './hooks';
import {IHaveWorkspaceId} from '../Workspaces';

interface IModalOption {
  code: string;
  value: string;
}

interface IModal {
  id: string;
  title: string;
  value: string;
  hasBeenRead: boolean;
}

type Props = IHaveWorkspaceId & {
  modals: MachineModalsFragment;
  disabled?: boolean;
}

const MachineModalList: FunctionComponent<Props> = (props) => {
  const log = useLogger(MachineModalList);
  const t = useTrans();
  const { modals, workspaceId, disabled } = props;
  const [ setModal ] = useControllerCommand(workspaceId, useSetModalSettingsMutation());

  async function setValue(modal: IModal, id: string) {
    const [ value, code ] = id.split(('|'));
    const change = { value, code, id: modal.id };
    const res = await setModal({ variables: { workspaceId, change } });
    log.debug(modal.id, value, code, res);
  }

  function getSelectItem(opt: IModalOption): ISelectItem {
    const title = t('{{ value }} [{{ code }}]', opt);
    return { title: title, itemId: [opt.value, opt.code].join('|') };
  }

  function findOption(opts: IModalOption[], value: string) {
    return opts.find(o => o.value === value);
  }

  function renderModal(modalGroup: ModalGroup): React.ReactNode {
    const modal = modals[modalGroup];
    if (!modal) {
      log.debug('no modal for', modalGroup);
      return null;
    }

    log.verbose(modalGroup, modal);
    if (!modal.hasBeenRead) return null;

    const opts = modal.options as IModalOption[];
    const items = opts.map(getSelectItem);
    const opt = findOption(opts, modal.value);
    if (!opt) {
      log.warn('Unknown option: ', opts, modal.value);
      return null;
    }

    const m = modal as IModal;

    return <IconSelect
      key={modalGroup}
      items={items}
      selectedId={[opt.value, opt.code].join('|')}
      label={t(titlize(modal.id))}
      setSelectedId={(s) => setValue(m, s.toString())}
      disabled={disabled}
    />;
  }

  return (<React.Fragment>
    {modalGroups.map(renderModal)}
  </React.Fragment>);
};

export default MachineModalList;
