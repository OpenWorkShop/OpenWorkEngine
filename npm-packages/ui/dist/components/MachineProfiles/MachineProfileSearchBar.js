import { useSearchMachineProfilesLazyQuery } from '@openworkshop/lib/api/graphql';
import * as React from 'react';
import { CircularProgress, TextField, Grid, Typography } from '@material-ui/core';
import { Autocomplete, Alert } from '@material-ui/lab';
import useLogger from '@openworkshop/lib/utils/logging/UseLogger';
import { useTranslation } from 'react-i18next';
import AlertList from '../Alerts/AlertList';
import OfflineAlert from '../Alerts/OfflineAlert';
import Icons from '../Icons/';
const MachineProfileSearchBar = (props) => {
    const { t } = useTranslation();
    const [open, setOpen] = React.useState(false);
    const log = useLogger(MachineProfileSearchBar);
    const [query, setQuery] = React.useState('');
    const [machineProfiles, setMachineProfiles] = React.useState([]);
    const [searchMachines, { loading, error, data }] = useSearchMachineProfilesLazyQuery();
    React.useEffect(() => {
        // Store the sorted search results in state, which also prevents clearing of results while querying.
        if (data && data.machineProfiles) {
            log.trace(query, data);
            setMachineProfiles([...data.machineProfiles].sort(sortMachines));
        }
        if (error) {
            log.error('search error', error.name, error.networkError, error.extraInfo);
        }
    }, [data, error]);
    function sortMachines(a, b) {
        if (a.machineCategory !== b.machineCategory) {
            return -b.machineCategory.charAt(0).localeCompare(a.machineCategory.charAt(0));
        }
        return -b.name.charAt(0).localeCompare(a.name.charAt(0));
    }
    function getCategoryName(cat) {
        if (cat === 'TDP') {
            return t('3D Printer');
        }
        return cat;
    }
    function updateQuery(q) {
        setQuery(q);
        setOpen(true);
        searchMachines({ variables: { q: q } });
    }
    return (React.createElement("div", null,
        React.createElement(Autocomplete, { id: 'search-machine-profiles', open: open, onOpen: () => updateQuery(''), onClose: () => setOpen(false), onChange: (e, mp) => props.onSelectedMachineProfile(mp !== null && mp !== void 0 ? mp : undefined), options: machineProfiles, getOptionSelected: (opt, val) => opt.id === val.id, groupBy: (mp) => getCategoryName(mp.machineCategory), getOptionLabel: (mp) => [mp.brand, mp.name, mp.model].filter((a) => a && a.length > 0).join(' '), onInputChange: (e, val) => updateQuery(val), renderOption: (mp) => {
                return (React.createElement(Grid, { container: true, alignItems: 'center' },
                    React.createElement(Grid, { item: true },
                        React.createElement(Icons, { name: mp.icon, fill: '#444', style: { marginRight: 10, marginTop: 4 } })),
                    React.createElement(Grid, { item: true, xs: true },
                        mp.name && React.createElement("span", null,
                            mp.name,
                            " "),
                        mp.model && React.createElement("span", { style: { fontWeight: 700 } }, mp.model),
                        React.createElement(Typography, { variant: 'body2', color: 'textSecondary' },
                            mp.brand,
                            mp.brand && ' ',
                            getCategoryName(mp.machineCategory),
                            mp.discontinued && t(' (Discontinued)')))));
            }, renderInput: (params) => (React.createElement(TextField, Object.assign({}, params, { label: t('Search the community catalog...'), variant: 'outlined', InputProps: Object.assign(Object.assign({}, params.InputProps), { endAdornment: (React.createElement(React.Fragment, null,
                        loading ? React.createElement(CircularProgress, { size: 20 }) : null,
                        params.InputProps.endAdornment)) }) }))) }),
        React.createElement(AlertList, null,
            error && React.createElement(Alert, { severity: 'error' }, error),
            React.createElement(OfflineAlert, { feature: t('The community catalog') }))));
};
export default MachineProfileSearchBar;
//# sourceMappingURL=MachineProfileSearchBar.js.map