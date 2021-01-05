import {
  getMachineSpecTypeTranslationKey,
  getMachineSpecTypeUnits,
} from '../../open-controller/Machines/MachineSpecType';
import React from 'react';
import {useOwsTrans} from '../../Hooks';
import {IMachinePartSpec} from '../../open-controller/Machines/CustomizedMachine';

interface IMachineSpecProps {
  specs: IMachinePartSpec[];
}

const MachineSpecList: React.FunctionComponent<IMachineSpecProps> = (props) => {
  const t = useOwsTrans();

  return (
    <span>
      {props.specs
        .map((spec) => {
          const name = t(getMachineSpecTypeTranslationKey(spec.specType));
          const units = getMachineSpecTypeUnits(spec.specType) || '';
          const val: number = spec.value;
          return `${name}: ${val}${units}`;
        })
        .join('; ')}
    </span>
  );
};

export default MachineSpecList;
