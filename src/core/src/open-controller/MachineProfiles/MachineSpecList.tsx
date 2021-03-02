import {getMachineSpecTypeTranslationKey, getMachineSpecTypeUnits, IMachinePartSpec,} from '../Machines';
import React from 'react';
import {useOwsTrans} from '../../hooks';

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
