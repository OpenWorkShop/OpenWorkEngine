import {MachinePartCompleteFragment} from '../graphql';
import {getMachinePartTypeTranslationKey} from '../Machines';
import * as React from 'react';
import _ from 'lodash';
import {
  Checkbox,
  createStyles,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Theme,
} from '@material-ui/core';
import useLogger from '../../utils/logging/UseLogger';
import {useOwsTrans} from '../../hooks';

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
  const t = useOwsTrans();
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

  log.verbose('selecting part type', partType, defaultPartId, selectedPartId);

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
        onChange={(e) => onSelected(e.target.value )}
        className={classes.selectEmpty}>
        {isOptional && (
          <MenuItem value=''>
            <em>
              {t('None')}
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
          {t('Required')}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default ChooseMachinePart;
