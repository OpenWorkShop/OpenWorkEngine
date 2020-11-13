import {
  getMachineSpecTypeTranslationKey,
  getMachineSpecTypeUnits,
} from '@openworkshop/lib/api/Machines/MachineSpecType';
import React from 'react';
import { MachineSpecPropsFragment } from '@openworkshop/lib/api/graphql';
import { useTranslation } from 'react-i18next';

interface IMachineSpecProps {
  specs: MachineSpecPropsFragment[];
}

const MachineSpecList: React.FunctionComponent<IMachineSpecProps> = (props) => {
  const { t } = useTranslation();

  return (
    <span>
      {props.specs
        .map((spec) => {
          const name = t(getMachineSpecTypeTranslationKey(spec.specType));
          const units = getMachineSpecTypeUnits(spec.specType) || '';
          const val: number = spec.value as number;
          return `${name}: ${val}${units}`;
        })
        .join('; ')}
    </span>
  );
};

export default MachineSpecList;
