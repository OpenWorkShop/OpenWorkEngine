import {
  MachineCategory,
  MachineSearchResultFragment,
  useSearchMachineProfilesLazyQuery
} from '../graphql';
import * as React from 'react';
import {Autocomplete, CircularProgress, FormControl, FormHelperText, Grid, TextField, Typography} from '@material-ui/core';
import useLogger from '../../utils/logging/UseLogger';
import {owsClientOpts} from '../../consts';
import OfflineAlertList from '../../components/Alerts/OfflineAlertList';
import OpenWorkShopIcon from '../../components/OpenWorkShopIcon';
import useStyles from './styles';
import {useOwsTrans} from '../../hooks';

type MP = MachineSearchResultFragment;

interface IMachineProfileSearchProps {
  onSelectedMachineProfile: (mp: MachineSearchResultFragment | undefined) => void;
}

const MachineProfileSearchBar: React.FunctionComponent<IMachineProfileSearchProps> = (props) => {
  const t = useOwsTrans();
  const [open, setOpen] = React.useState(false);
  const log = useLogger(MachineProfileSearchBar);
  const classes = useStyles();
  const [query, setQuery] = React.useState('');
  const [machineProfiles, setMachineProfiles] = React.useState<MP[]>([]);
  const [searchMachines, { loading, error, data }] = useSearchMachineProfilesLazyQuery(owsClientOpts);

  React.useEffect(() => {
    // Store the sorted search results in state, which also prevents clearing of results while querying.
    if (data && data.machineProfiles) {
      log.verbose(query, data);
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

  function getCategoryName(mp: MP): string {
    if (mp.machineCategory === MachineCategory.Tdp) return t('3D Printer');
    return mp.machineCategory;
  }

  function getGroupName(mp: MP): string {
    if (mp.featured) return t('Featured');
    return getCategoryName(mp);
  }

  function updateQuery(q: string) {
    setQuery(q);
    setOpen(true);
    searchMachines({ variables: { q: q } });
  }

  return (
    <FormControl className={classes.formControl}>
      <Autocomplete
        id='search-machine-profiles'
        open={open}
        className={classes.input}
        noOptionsText={error ? error.message.split('\n')[0] : t('Nothing found')}
        loadingText={t('Loading...')}
        loading={loading}
        onOpen={() => updateQuery('')}
        onClose={() => setOpen(false)}
        onChange={(e, mp) => props.onSelectedMachineProfile(mp ?? undefined)}
        options={machineProfiles}
        getOptionSelected={(opt: MP, val: MP) => opt.id === val.id}
        groupBy={(mp: MP) => getGroupName(mp)}
        getOptionLabel={(mp: MP) => [mp.brand, mp.name, mp.model].filter((a) => a && a.length > 0).join(' ')}
        onInputChange={(e, val) => updateQuery(val)}
        renderOption={(props: unknown, mp: MP) => {
          return (
            <Grid {...props} container alignItems='center'>
              <Grid item>
                <OpenWorkShopIcon name={mp.icon} fill='#444' style={{ marginRight: 10, marginTop: 4 }} />
              </Grid>
              <Grid item xs>
                {mp.name && <span>{mp.name} </span>}
                {mp.model && <span style={{ fontWeight: 700 }}>{mp.model}</span>}
                <Typography variant='body2' color='textSecondary'>
                  {mp.brand}
                  {mp.brand && ' '}
                  {getCategoryName(mp)}
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
      <FormHelperText >{t('Try searching for brand names.')}</FormHelperText>
      <OfflineAlertList feature={t('The community catalog')} error={error} />
    </FormControl>
  );
};

export default MachineProfileSearchBar;
