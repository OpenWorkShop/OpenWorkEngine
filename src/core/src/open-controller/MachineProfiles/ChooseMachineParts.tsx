import {useLogger} from '../../utils/logging/UseLogger';
import _ from 'lodash';
import ChooseMachinePart from './ChooseMachinePart';
import MachineSpecList from './MachineSpecList';
import {getMachinePartTypeTranslationKey, IMachinePartChoice} from '../Machines';
import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretSquareDown} from '@fortawesome/free-solid-svg-icons';
import {useOwsTrans} from '../../hooks';

interface IMachineOptionsProps {
  parts: IMachinePartChoice[];
  onComplete: (parts: IMachinePartChoice[]) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      fontSize: theme.typography.pxToRem(15),

      flexBasis: '50%',
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
  const parts = props.parts;
  const t = useOwsTrans();
  const log = useLogger(ChooseMachineParts);
  const classes = useStyles();
  const groupedParts = _.groupBy(parts, 'partType');
  const allPartTypes = Object.keys(groupedParts);
  const includedParts: { [key: string]: IMachinePartChoice } = {};
  const selectableParts: { [key: string]: IMachinePartChoice[] } = {};
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
      props.onComplete(Object.keys(selectedPartIds).map(
        (pt) => _.find(parts, (p) => p.id === selectedPartIds[pt]) as IMachinePartChoice,
      ));
    }
  }

  function renderPartSummary(partType: string, part?: IMachinePartChoice) {
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
          {!part && t('(None selected)')}
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
              <Typography display='block' variant='subtitle1'>
                <span>{part.description}</span>
              </Typography>
            )}
            <Typography color='primary' variant='subtitle2'>
              {t('This part is always included with your machine.')}
            </Typography>
          </AccordionDetails>
        </Accordion>
      );
    });
  }

  function renderSelectableParts() {
    return Object.keys(selectableParts).map((partType) => {
      const selectedPartId = _.has(selectedPartIds, partType) ? selectedPartIds[partType] : null;
      const part = selectedPartId && _.find(parts, (p) => p.id === selectedPartId);

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
