import * as React from 'react';
import PopoverWorkBarChip from './PopoverWorkBarChip';
import HelpfulHeader from '../../components/Text/HelpfulHeader';
import {useTrans} from '../Context';
import { faMicrochip, faExclamationCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import {DetectedFirmwareFragment, FirmwareRequirementFragment} from '../graphql';
import { Grid, Tooltip } from '@material-ui/core';
import useStyles from './styles';
import { Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, useTheme } from '@material-ui/core';
import ReactGA from 'react-ga';

type Props = {
  detectedFirmware: DetectedFirmwareFragment,
  requiredFirmware?: FirmwareRequirementFragment,
  label?: string,
};

const FirmwareChip: React.FunctionComponent<Props> = (props) => {
  const t = useTrans();
  const theme = useTheme();
  const classes = useStyles();
  const tip = t('Firmware is flashed directly on the board of the connected machine.');
  const { detectedFirmware, requiredFirmware, label } = props;
  const icon = faMicrochip;
  const downloadUrl = requiredFirmware?.downloadUrl;
  const helpUrl = requiredFirmware?.helpUrl;

  function renderKeyValueRow(title: string, expectation?: string | null, value?: string | null, match?: boolean) {
    if (!value) return [];
    const allowed = !requiredFirmware || match;
    const icon = allowed ? faCheckCircle : faExclamationCircle;
    const color = !allowed ? theme.palette.error.dark : theme.palette.info.light;
    const exptTip = t('Expected "{{ expectation }}"', { expectation: (expectation ?? '') });
    const failTip = requiredFirmware ? exptTip : t('(No firmware requirement in workspace.)');
    const tip = allowed ? t('') : failTip;
    return [
      <Grid key={`${title}-title`} item xs={6} className={classes.popoverRow}>
        <Typography variant="subtitle1">
          {title}
        </Typography>
      </Grid>,
      <Grid key={`${title}-icon`} item xs={2} className={classes.popoverRow}>
        <Tooltip title={tip} >
          <IconButton aria-label={tip} size='small' disableFocusRipple>
            <FontAwesomeIcon icon={icon} color={color} />
          </IconButton>
        </Tooltip>
      </Grid>,
      <Grid key={`${title}-value`} item xs={4} className={classes.popoverRow}>
        <Typography variant="body1">
          {value}
        </Typography>
      </Grid>
    ];
  }

  function strCmp(detected: string | null, requirement?: string | null) {
    if (!requirement || !detected) return true;
    detected = detected.toLowerCase().trim();
    return detected === requirement.toLowerCase().trim();
  }

  return (<PopoverWorkBarChip faIcon={icon} label={label} >
    <Grid item xs={12} className={classes.popoverRowAlt} >
      <HelpfulHeader tip={tip} title={'Detected Firmware'} variant="h6" />
    </Grid>
    {renderKeyValueRow(
      t('Protocol'),
      requiredFirmware?.controllerType,
      detectedFirmware.protocol,
      strCmp(detectedFirmware.protocol, requiredFirmware?.controllerType))}
    {renderKeyValueRow(
      t('Name'),
      requiredFirmware?.name,
      detectedFirmware.name,
      strCmp(detectedFirmware.name, requiredFirmware?.name))}
    {renderKeyValueRow(
      t('Edition'),
      requiredFirmware?.edition,
      detectedFirmware.edition,
      strCmp(detectedFirmware.edition, requiredFirmware?.edition))}
    {renderKeyValueRow(
      t('Version'),
      requiredFirmware?.requiredVersion,
      detectedFirmware.value,
      detectedFirmware.value >= (requiredFirmware?.requiredVersion ?? 0))}
    {renderKeyValueRow(t('Friendly Name'), detectedFirmware.friendlyName)}
    {(downloadUrl || helpUrl) && <Grid item xs={12} className={classes.popoverRowAlt} >
      <HelpfulHeader tip={tip} title={'Help'} variant="h6" />
    </Grid>}
    {downloadUrl && <Grid item xs={12} className={classes.popoverRow}>
      <Typography variant="subtitle2">
        <ReactGA.OutboundLink eventLabel='firmware_download' to={downloadUrl} target='_blank'>
          {t('Download firmware')}
        </ReactGA.OutboundLink>
      </Typography>
    </Grid>}
    {helpUrl && <Grid item xs={12} className={classes.popoverRow}>
      <Typography variant="subtitle2">
        <ReactGA.OutboundLink eventLabel='firmware_help' to={helpUrl} target='_blank'>
          {t('Firmware Documentation')}
        </ReactGA.OutboundLink>
      </Typography>
    </Grid>}
  </PopoverWorkBarChip>);
};

export default FirmwareChip;
