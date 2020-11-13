import { MachinePartCompleteFragment } from '@openworkshop/lib/api/graphql';
import { getMachinePartTypeTranslationKey } from '@openworkshop/lib/api/Machines/MachinePartType';
import * as React from 'react';
import _ from 'lodash';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  makeStyles,
  Theme,
  createStyles,
  FormHelperText,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { useTranslation, Trans } from 'react-i18next';
import useLogger from '@openworkshop/lib/utils/logging/UseLogger';

interface IChooseMachinePartsProps {
  partGroup: MachinePartCompleteFragment[];
  onSelected: (partType: string, partId: string | null) => void;
  selectedPartId: string | null;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      width: '100%',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

const ChooseMachinePart: React.FunctionComponent<IChooseMachinePartsProps> = (props) => {
  const { t } = useTranslation();
  const log = useLogger(ChooseMachinePart);
  const classes = useStyles();
  const firstPart = props.partGroup[0];
  const partType = firstPart.partType;
  const partTypeName = t(getMachinePartTypeTranslationKey(partType));
  const isSingle = props.partGroup.length === 1;
  const isOptional = _.every(props.partGroup, (p) => p.optional);
  const fallbackDefaultPart = isOptional ? undefined : firstPart;
  const defaultPart = _.find(props.partGroup, (p) => p.isDefault) ?? fallbackDefaultPart;
  const defaultPartId = defaultPart ? defaultPart.id : null;
  const selectedPartId = props.selectedPartId ?? defaultPartId;

  log.trace('selecting part type', partType, defaultPartId, selectedPartId);

  function onSelected(partId: string | null) {
    props.onSelected(partType, partId);
  }

  React.useEffect(() => {
    if (props.selectedPartId !== selectedPartId) {
      onSelected(selectedPartId);
    }
  }, [selectedPartId, props]);

  if (isSingle) {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={selectedPartId === firstPart.id}
            onChange={(e) => onSelected(e.target.checked ? firstPart.id : null)}
          />
        }
        label={firstPart.title}
      />
    );
  }

  return (
    <FormControl required={!isOptional} className={classes.formControl}>
      <InputLabel shrink id={`${partType}-label`}>
        {partTypeName}
      </InputLabel>
      <Select
        labelId={`${partType}-label`}
        id={partType}
        displayEmpty
        value={selectedPartId ?? ''}
        onChange={(e) => onSelected(e.target.value as string)}
        className={classes.selectEmpty}>
        {isOptional && (
          <MenuItem value=''>
            <em>
              <Trans>None</Trans>
            </em>
          </MenuItem>
        )}
        {props.partGroup.map((part) => {
          return (
            <MenuItem key={part.id} value={part.id}>
              {part.title}
            </MenuItem>
          );
        })}
      </Select>
      {!isOptional && (
        <FormHelperText>
          <Trans>Required</Trans>
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default ChooseMachinePart;
