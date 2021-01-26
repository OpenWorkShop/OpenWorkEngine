import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import {FormControl, Input, InputAdornment, Typography} from '@material-ui/core';
import {HoverHelpStep} from '../../../components';
import useStyles from './styles';
import {useTrans} from '../../Context';
import {useHotkeys} from 'react-hotkeys-hook';

interface OwnProps {
  sendCommand: (code: string) => void;
}

type Props = OwnProps;

const TerminalInput: FunctionComponent<Props> = (props) => {
  const t = useTrans();
  const classes = useStyles();
  const { sendCommand } = props;
  const [code, setCode] = React.useState('');

  useHotkeys('Shift+Enter', (e ) => {
    // if (!e.ctrlKey && !e.metaKey && !e.shiftKey) return;
    sendCommand(code);
  }, [code, sendCommand]);

  return (<FormControl
    className={clsx(classes.inputFormControl, classes.altRow)}
    margin='normal'
    fullWidth={true}
    variant='outlined'
    color="secondary"
  >
    <Input
      id='cmd'
      type='text'
      className={classes.input}
      value={code}
      startAdornment={
        <Typography className={classes.prompt} >{'$>'}</Typography>
      }
      endAdornment={
        <InputAdornment style={{ marginRight: 0, marginLeft: 0 }} position='end'>
          <HoverHelpStep
            tip={t('Type here to write a command directly to the machine. You must use valid syntax (i.e., GCode).')}
          />
        </InputAdornment>
      }
      autoFocus={true}
      onChange={(e) => setCode(e.currentTarget.value)}
    />
  </FormControl>);
};

export default TerminalInput;
