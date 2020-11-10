import { MachineProfile, Maybe, Scalars, useSearchMachinesQuery } from '@openworkshop/lib/api/graphql';
import * as React from 'react';
import { CircularProgress, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import useLogger from '@openworkshop/lib/utils/logging/UseLogger';
import { useTranslation } from 'react-i18next';

type str = string | null | undefined;

const MachineProfileSearchBar: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const { loading, error, data } = useSearchMachinesQuery();
  const machineProfiles = data ? data.machineProfiles : [];

  function sortMachines(a: MachineProfile, b: MachineProfile) {
    if (a.machineCategory !== b.machineCategory) {
      return -b.machineCategory.charAt(0).localeCompare(a.machineCategory.charAt(0));
    }
    return -b.name.charAt(0).localeCompare(a.name.charAt(0));
  }

  function getCategoryName(cat: string): string {
    if (cat === 'TDP') {
      return t('3D Printer');
    }
    return cat;
  }

  const sortedMachineProfiles: MachineProfile[] = [...machineProfiles].sort(sortMachines);

  const log = useLogger(MachineProfileSearchBar);
  log.debug('quem', loading, error, sortedMachineProfiles);

  // TODO: loading spinner, width prop, multiline names
  return (
    <Autocomplete
      id='grouped-demo'
      options={sortedMachineProfiles}
      groupBy={(mp: MachineProfile) => getCategoryName(mp.machineCategory)}
      getOptionLabel={(mp: MachineProfile) => [mp.brand, mp.name, mp.model].filter((a) => a && a.length > 0).join(' ')}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={t('Find your machine...')} variant='outlined' />}
    />
  );
};

export default MachineProfileSearchBar;
