import { getMachineSpecTypeTranslationKey, getMachineSpecTypeUnits, } from '@openworkshop/lib/api/Machines/MachineSpecType';
import React from 'react';
import { useTranslation } from 'react-i18next';
const MachineSpecList = (props) => {
    const { t } = useTranslation();
    return (React.createElement("span", null, props.specs
        .map((spec) => {
        const name = t(getMachineSpecTypeTranslationKey(spec.specType));
        const units = getMachineSpecTypeUnits(spec.specType) || '';
        const val = spec.value;
        return `${name}: ${val}${units}`;
    })
        .join('; ')));
};
export default MachineSpecList;
//# sourceMappingURL=MachineSpecList.js.map