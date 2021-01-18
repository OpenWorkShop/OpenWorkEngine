import React, { FunctionComponent } from 'react';
import {IHaveWorkspace, useWorkspaceControllerSelector} from '../../Workspaces';
import {Accordion, AccordionSummary} from '@material-ui/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretSquareDown} from '@fortawesome/free-solid-svg-icons';

type Props = IHaveWorkspace;

interface IModal {
  value: string;
  code: string | null;
}

const MachineModals: FunctionComponent<Props> = (props) => {
  const { workspaceId } = props;
  const modals = useWorkspaceControllerSelector(workspaceId, c => c.machine.configuration.modals);

  function renderModal(modal: IModal | null): React.ReactNode {
    if (!modal) return null;
    return (
      <Accordion>
        <AccordionSummary expandIcon={<FontAwesomeIcon icon={faCaretSquareDown} />}>
          {modal.value} ({modal.code})
        </AccordionSummary>
      </Accordion>
    );
  }

  return (<div>
    {renderModal(modals.units)}
    {renderModal(modals.arcDistance)}
    {renderModal(modals.distance)}
    {renderModal(modals.feedRate)}
    {renderModal(modals.motion)}
    {renderModal(modals.plane)}
    {renderModal(modals.programState)}
    {renderModal(modals.spindleDirection)}
    <div>
      WCS: #{modals.workCoordinateSystem}
    </div>
  </div>);
};

export default MachineModals;
