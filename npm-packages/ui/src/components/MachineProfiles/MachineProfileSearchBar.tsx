import * as React from 'react';
import { CircularProgress, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import useLogger from '@openworkshop/lib/utils/logging/UseLogger';
import { useQuery } from '@apollo/client';
import { IMachineProfileSearchData, IMachineProfile, search } from '@openworkshop/lib/api/Machines/MachineProfiles';
import { useTranslation } from 'react-i18next';


const MachineProfileSearchBar: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const { loading, error, data } = useQuery<IMachineProfileSearchData>(search);
  const machineProfiles = data ? data.machineProfiles : [];

  function sortMachines(a: IMachineProfile, b: IMachineProfile) {
    if (a.machineCategory !== b.machineCategory) {
      return -b.machineCategory.charAt(0).localeCompare(a.machineCategory.charAt(0));
    }
    return -b.name.charAt(0).localeCompare(a.name.charAt(0));
  }

  function combine(...args: string[]): string {
    return args.filter(a => a && a.length > 0).join(' ');
  }

  function getCategoryName(cat: string): string {
    if (cat === 'TDP') {
      return t('3D Printer');
    }
    return cat;
  }

  const sortedMachineProfiles: IMachineProfile[] = [...machineProfiles].sort(sortMachines);

  const log = useLogger(MachineProfileSearchBar);
  log.debug('quem', loading, error, sortedMachineProfiles);

  // TODO: loading spinner, width prop, multiline names
  return (
    <Autocomplete
      id="grouped-demo"
      options={sortedMachineProfiles}
      groupBy={(mp: IMachineProfile) => getCategoryName(mp.machineCategory)}
      getOptionLabel={(mp: IMachineProfile) => combine(mp.brand, mp.name, mp.model)}
      style={{ width: 300 }}
      renderInput={(params) => <TextField
        {...params}
        label={t('Find your machine...')}
        variant="outlined"
      />}
    />
  );
};

export default MachineProfileSearchBar;
