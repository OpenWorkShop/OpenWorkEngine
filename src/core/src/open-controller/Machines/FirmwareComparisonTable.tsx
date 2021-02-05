import * as React from 'react';
import HelpfulHeader from '../../components/Text/HelpfulHeader';
import {useTrans} from '../Context';
import { faExclamationCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import {DetectedFirmwareFragment} from '../graphql';
import { Grid, Tooltip } from '@material-ui/core';
import useStyles from '../WorkBar/styles';
import { Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, useTheme } from '@material-ui/core';
import ReactGA from 'react-ga';
import {titlize} from '../../utils';
import {useLogger} from '../../hooks';

type Props = {
  firmware: DetectedFirmwareFragment,
};

interface IFirmwareComparison<T> {
  requiredValue?: T;
  detectedValue?: T;
  hasDetectedValue: boolean;
  meetsRequirement: boolean;
}

const FirmwareComparisonTable: React.FunctionComponent<Props> = (props) => {
  const t = useTrans();
  const log = useLogger(FirmwareComparisonTable);
  const theme = useTheme();
  const classes = useStyles();
  const tip = t('Firmware is flashed directly on the board of the connected machine.');
  const { firmware } = props;
  const requiredFirmware = firmware.requirement;
  const { downloadUrl, helpUrl } = requiredFirmware;

  function renderFirmwareComparison<T>(key: string, comparison: IFirmwareComparison<T>): React.ReactNode {
    log.debug(key, comparison);
    const allowed = comparison.meetsRequirement;
    const value = comparison.detectedValue;
    const expectation = comparison.requiredValue;
    const icon = allowed ? faCheckCircle : faExclamationCircle;
    const color = !allowed ? theme.palette.error.dark : theme.palette.info.light;
    const failTip = comparison.detectedValue ?
      t('Expected "{{ expectation }}"', { expectation: (expectation ?? '') }) :
      t('Nothing detected yet; looking for: "{{ expectation }}"', { expectation: (expectation ?? '') });
    const successTip = comparison.requiredValue ?
      t('Workspace requirement "{{ expectation }} is satisfied."', { expectation }) :
      t('(No firmware requirement in the workspace.)');
    const tip = allowed ? successTip : failTip;
    return [
      <Grid key={`${key}-title`} item xs={6} className={classes.popoverRow}>
        <Typography variant="subtitle1">
          {t(titlize(key))}
        </Typography>
      </Grid>,
      <Grid key={`${key}-icon`} item xs={2} className={classes.popoverRow}>
        <Tooltip title={tip} >
          <IconButton aria-label={tip} size='small' disableFocusRipple>
            <FontAwesomeIcon icon={icon} color={color} />
          </IconButton>
        </Tooltip>
      </Grid>,
      <Grid key={`${key}-value`} item xs={4} className={classes.popoverRow}>
        <Typography variant="body1">
          {value}
        </Typography>
      </Grid>
    ];
  }

  return (<React.Fragment >
    <Grid item xs={12} className={classes.popoverRowAlt} >
      <HelpfulHeader tip={tip} title={'Detected Firmware'} variant="h6" />
    </Grid>
    {renderFirmwareComparison('name', firmware.name)}
    {renderFirmwareComparison('protocol', firmware.protocol)}
    {renderFirmwareComparison('edition', firmware.edition)}
    {renderFirmwareComparison('version', firmware.version)}
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
  </React.Fragment>);
};

export default FirmwareComparisonTable;
