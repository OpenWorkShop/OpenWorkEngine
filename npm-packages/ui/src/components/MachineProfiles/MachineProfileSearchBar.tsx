import { MachineSearchResultFragment, useSearchMachineProfilesLazyQuery } from '@openworkshop/lib/api/graphql';
import * as React from 'react';
import { CircularProgress, TextField, Grid, Typography } from '@material-ui/core';
import { Autocomplete, Alert } from '@material-ui/lab';
import useLogger from '@openworkshop/lib/utils/logging/UseLogger';
import { useTranslation, Trans } from 'react-i18next';
import AlertList from '../Alerts/AlertList';
import OfflineAlert from '../Alerts/OfflineAlert';
import Icons from '../Icons/';

type MP = MachineSearchResultFragment;

interface IMachineProfileSearchProps {
  onSelectedMachineProfile: (mp: MachineSearchResultFragment | undefined) => void;
}

const MachineProfileSearchBar: React.FunctionComponent<IMachineProfileSearchProps> = (props) => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const log = useLogger(MachineProfileSearchBar);
  const [query, setQuery] = React.useState('');
  const [machineProfiles, setMachineProfiles] = React.useState<MP[]>([]);
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

  function sortMachines(a: MP, b: MP) {
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

  function updateQuery(q: string) {
    setQuery(q);
    setOpen(true);
    searchMachines({ variables: { q: q } });
  }

  return (
    <div>
      <Autocomplete
        id='search-machine-profiles'
        open={open}
        onOpen={() => updateQuery('')}
        onClose={() => setOpen(false)}
        onChange={(e, mp) => props.onSelectedMachineProfile(mp ?? undefined)}
        options={machineProfiles}
        getOptionSelected={(opt: MP, val: MP) => opt.id === val.id}
        groupBy={(mp: MP) => getCategoryName(mp.machineCategory)}
        getOptionLabel={(mp: MP) => [mp.brand, mp.name, mp.model].filter((a) => a && a.length > 0).join(' ')}
        onInputChange={(e, val) => updateQuery(val)}
        renderOption={(mp: MP) => {
          return (
            <Grid container alignItems='center'>
              <Grid item>
                <Icons name={mp.icon} fill='#444' style={{ marginRight: 10, marginTop: 4 }} />
              </Grid>
              <Grid item xs>
                {mp.name && <span>{mp.name} </span>}
                {mp.model && <span style={{ fontWeight: 700 }}>{mp.model}</span>}
                <Typography variant='body2' color='textSecondary'>
                  {mp.brand}
                  {mp.brand && ' '}
                  {getCategoryName(mp.machineCategory)}
                  {mp.discontinued && t(' (Discontinued)')}
                </Typography>
              </Grid>
            </Grid>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={t('Search the community catalog...')}
            variant='outlined'
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
      <AlertList>
        {error && <Alert severity='error'>{error}</Alert>}
        <OfflineAlert feature={t('The community catalog')} />
      </AlertList>
    </div>
  );
};

export default MachineProfileSearchBar;
