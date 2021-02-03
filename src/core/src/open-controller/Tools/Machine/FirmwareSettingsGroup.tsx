import React, { FunctionComponent } from 'react';
import {FirmwareSettingPolymorphicFragment} from '../../graphql';
import {Accordion, AccordionDetails, AccordionSummary, Grid, Typography} from '@material-ui/core';
import FirmwareSettingValueEditor from './FirmwareSettingValueEditor';
import useStyles from './styles';
import {useLogger} from '../../../hooks';
import {FirmwareSettingsGroupName} from '../../Machines';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretSquareDown} from '@fortawesome/free-solid-svg-icons';
import { getFirmwareSettingsGroupTitleKey } from '../../Machines';

type Props = {
  groupName: FirmwareSettingsGroupName;
  settings: FirmwareSettingPolymorphicFragment[];
  onSettingChanged: (setting: FirmwareSettingPolymorphicFragment, value: string) => void;
};

const FirmwareSettingsGroup: FunctionComponent<Props> = (props) => {
  const { settings, groupName, onSettingChanged } = props;
  const classes = useStyles();
  const log = useLogger(FirmwareSettingsGroup);

  function renderValue(setting: FirmwareSettingPolymorphicFragment, index: number) {
    if (setting.id.length <= 0) {
      log.verbose('missing setting', index, setting);
      return null;
    }
    const cn = index % 2 == 0 ? classes.settingRowAlt : classes.settingRow;
    return <React.Fragment key={setting.id}>
      <Grid item xs={1} className={cn}>
        <Typography variant="subtitle1">{setting.key}</Typography>
      </Grid>
      <Grid item xs={7} className={cn}>
        <Typography variant="h6">{setting.title}</Typography>
      </Grid>
      <Grid item xs={4} className={cn}>
        <FirmwareSettingValueEditor onChange={(v) => onSettingChanged(setting, v)} setting={setting} />
      </Grid>
    </React.Fragment>;
  }

  const title = getFirmwareSettingsGroupTitleKey(groupName);
  log.verbose('section', groupName, settings);
  return <Accordion key={groupName} className={classes.accordion}>
    <AccordionSummary
      className={classes.accordionSummary}
      expandIcon={<FontAwesomeIcon icon={faCaretSquareDown} />}
    >
      <Typography variant="h6">{title}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Grid container>
        {settings.map(renderValue)}
      </Grid>
    </AccordionDetails>
  </Accordion>;
};

export default FirmwareSettingsGroup;
