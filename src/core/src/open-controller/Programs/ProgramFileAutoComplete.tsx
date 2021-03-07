import React, { FunctionComponent } from 'react';
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  CircularProgress,
  FormHelperText,
  TextField
} from '@material-ui/core';
import {useTrans} from '../Context';
import {ProgramFileMetaFragment} from '../graphql';


type Props = OwnProps;

const ProgramFileAutoComplete: FunctionComponent<Props> = (props) => {
  const t = useTrans();
  const [options, setOptions] = React.useState<ProgramFileMetaFragment[]>([]);
  const loading = false;

  function renderOption(props: unknown, option: ProgramFileMetaFragment | unknown): React.ReactNode {
    return null;
  }

  function renderInput(params: AutocompleteRenderInputParams): React.ReactNode {
    return (
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
    );
  }

  return (<Autocomplete
    options={options}
    renderOption={renderOption}
    renderInput={renderInput}
  />);
};

export default ProgramFileAutoComplete;
