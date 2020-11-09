import * as React from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import useLogger from '@openworkshop/lib/utils/logging/UseLogger';
import { useQuery } from '@apollo/client';
import { search } from '@openworkshop/lib/api/Machines/MachineProfiles';
import { useTranslation } from 'react-i18next';
const MachineProfileSearchBar = () => {
    const { t } = useTranslation();
    const { loading, error, data } = useQuery(search);
    const machineProfiles = data ? data.machineProfiles : [];
    function sortMachines(a, b) {
        if (a.machineCategory !== b.machineCategory) {
            return -b.machineCategory.charAt(0).localeCompare(a.machineCategory.charAt(0));
        }
        return -b.name.charAt(0).localeCompare(a.name.charAt(0));
    }
    function combine(...args) {
        return args.filter(a => a && a.length > 0).join(' ');
    }
    function getCategoryName(cat) {
        if (cat === 'TDP') {
            return t('3D Printer');
        }
        return cat;
    }
    const sortedMachineProfiles = [...machineProfiles].sort(sortMachines);
    const log = useLogger(MachineProfileSearchBar);
    log.debug('quem', loading, error, sortedMachineProfiles);
    // TODO: loading spinner, width prop, multiline names
    return (React.createElement(Autocomplete, { id: "grouped-demo", options: sortedMachineProfiles, groupBy: (mp) => getCategoryName(mp.machineCategory), getOptionLabel: (mp) => combine(mp.brand, mp.name, mp.model), style: { width: 300 }, renderInput: (params) => React.createElement(TextField, Object.assign({}, params, { label: t('Find your machine...'), variant: "outlined" })) }));
};
export default MachineProfileSearchBar;
//# sourceMappingURL=MachineProfileSearchBar.js.map