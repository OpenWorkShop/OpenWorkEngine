import { useLogger } from '@openworkshop/lib/utils/logging/UseLogger';
import _ from 'lodash';
import { MachinePartCompleteFragment, MachineProfileCompleteFragment } from '@openworkshop/lib/api/graphql';
import ChooseMachinePart from './ChooseMachinePart';
import MachineSpecList from './MachineSpecList';
import { getMachinePartTypeTranslationKey } from '@openworkshop/lib/api/Machines/MachinePartType';
import React from 'react';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import { useTranslation, Trans } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretSquareDown } from '@fortawesome/free-solid-svg-icons';

interface IMachineOptionsProps {
  machineProfile: MachineProfileCompleteFragment;
  onComplete: (parts: MachinePartCompleteFragment[]) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '25%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }),
);

type SelectedPartIdMap = { [key: string]: string };

const ChooseMachineParts: React.FunctionComponent<IMachineOptionsProps> = (props) => {
  const mp = props.machineProfile;
  const { t } = useTranslation();
  const log = useLogger(ChooseMachineParts);
  const classes = useStyles();
  const groupedParts = _.groupBy(mp.parts, 'partType');
  const allPartTypes = Object.keys(groupedParts);
  const includedParts: { [key: string]: MachinePartCompleteFragment } = {};
  const selectableParts: { [key: string]: MachinePartCompleteFragment[] } = {};
  const defaultSelectedParts: SelectedPartIdMap = {};

  allPartTypes.forEach((partType) => {
    const parts = groupedParts[partType];
    if (parts.length === 1 && !parts[0].optional) {
      includedParts[partType.toString()] = parts[0];
      defaultSelectedParts[partType.toString()] = parts[0].id;
    } else {
      selectableParts[partType.toString()] = parts;
    }
  });

  const [selectedPartIds, setSelectedPartIds] = React.useState<SelectedPartIdMap>(defaultSelectedParts);

  function onSelectedPart(partType: string, partId: string | null) {
    if (partId) {
      selectedPartIds[partType] = partId;
    } else {
      delete selectedPartIds[partType];
    }
    setSelectedPartIds({ ...selectedPartIds });
    log.debug('part selection', partType, partId, selectedPartIds);

    const isCompletePartList = _.every(
      allPartTypes,
      (pt) => _.has(selectedPartIds, pt) || _.every(groupedParts[pt], (p) => p.optional),
    );

    if (isCompletePartList) {
      const parts: MachinePartCompleteFragment[] = Object.keys(selectedPartIds).map(
        (pt) => _.find(mp.parts, (p) => p.id === selectedPartIds[pt]) as MachinePartCompleteFragment,
      );
      props.onComplete(parts);
    }
  }

  function renderPartSummary(partType: string, part?: MachinePartCompleteFragment) {
    const partTypeName = t(getMachinePartTypeTranslationKey(partType));
    const specs = part ? part.specs : [];

    return (
      <AccordionSummary expandIcon={<FontAwesomeIcon icon={faCaretSquareDown} />}>
        <Typography className={classes.heading}>
          <strong>{partTypeName}</strong>
          {part && <span>: {part.title}</span>}
        </Typography>
        <Typography className={classes.secondaryHeading}>
          {specs.length > 0 && <MachineSpecList specs={specs} />}
          {!part && <Trans>(None selected)</Trans>}
        </Typography>
      </AccordionSummary>
    );
  }

  function renderIncludedParts() {
    return Object.keys(includedParts).map((partType) => {
      const part = includedParts[partType];
      const hasDescription = part.description && part.description.length > 0;

      return (
        <Accordion key={partType}>
          {renderPartSummary(partType, part)}
          <AccordionDetails>
            {hasDescription && (
              <Typography display='block'>
                <span>{part.description}</span>
              </Typography>
            )}
            <Typography color='secondary' variant='caption'>
              <em>
                <Trans>This part is always included with your machine.</Trans>
              </em>
            </Typography>
          </AccordionDetails>
        </Accordion>
      );
    });
  }

  function renderSelectableParts() {
    return Object.keys(selectableParts).map((partType) => {
      const selectedPartId = _.has(selectedPartIds, partType) ? selectedPartIds[partType] : null;
      const part = selectedPartId && _.find(mp.parts, (p) => p.id === selectedPartId);

      return (
        <Accordion key={partType}>
          {renderPartSummary(partType, part ? part : undefined)}
          <AccordionDetails>
            <ChooseMachinePart
              onSelected={onSelectedPart}
              partGroup={selectableParts[partType]}
              selectedPartId={selectedPartId}
            />
          </AccordionDetails>
        </Accordion>
      );
    });
  }

  return (
    <div>
      {renderSelectableParts()}
      {renderIncludedParts()}
    </div>
  );
};

export default ChooseMachineParts;
