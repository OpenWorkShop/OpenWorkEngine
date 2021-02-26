import React, { FunctionComponent } from 'react';
import {Accordion, Grid, AccordionSummary, Typography, AccordionDetails, FormControl, Button} from '@material-ui/core';
import {IHaveWorkspace} from '../../Workspaces';
import {ProgramFileFragment} from '../../graphql';
import SimpleDialog from '../../../components/Dialogs/SimpleDialog';
import {useTrans} from '../../Context';
import HelpfulHeader from '../../../components/Text/HelpfulHeader';
import useStyles from './styles';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretSquareDown} from '@fortawesome/free-solid-svg-icons';
import MachineSpecList from '../../MachineProfiles/MachineSpecList';

type Props = IHaveWorkspace & {
  programFile?: ProgramFileFragment;
};

const PreviewProgramFileDialog: FunctionComponent<Props> = (props) => {
  const t = useTrans();
  const classes = useStyles();
  const { workspaceId, programFile } = props;
  const [openProgramFile, setOpenProgramFile] = React.useState(programFile);

  React.useEffect(() => {
    setOpenProgramFile(programFile);
  }, [programFile, setOpenProgramFile]);

  function renderProgramFile(programFile: ProgramFileFragment) {
    const { meta, lineCount, instructionCount } = programFile;
    const { name, size, syntax, lastModified, data } = meta;
    //const tags = data?.tags ?? [];
    const revisions = data?.revisions ?? [];
    const firstRevision = revisions.length > 0 ? revisions[0] : undefined;
    const lastRevision = revisions.length > 0 ? revisions[revisions.length - 1] : undefined;
    const username = firstRevision?.username;

    return (
      <React.Fragment>
        <Typography variant="subtitle2">{name}</Typography>

        <Accordion className={classes.dialogContent}>
          <AccordionSummary expandIcon={<FontAwesomeIcon icon={faCaretSquareDown} />}>
            <HelpfulHeader
              variant="h6"
              tip={t('Information about the program, like its size and contents.')}
              title={t('File Details')}
            />
          </AccordionSummary>
          <AccordionDetails>
            <Grid container >
              <Grid item xs={10}>
                <HelpfulHeader
                  variant="subtitle1"
                  title={t('Instruction Count')}
                  tip={t('The number of valid Gcode lines / total number of lines which were detected in the file.')}
                />
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body1">{instructionCount} / {lineCount}</Typography>
              </Grid>
              {username && <Grid item xs={10}>
                <HelpfulHeader
                  variant="subtitle1"
                  title={t('Creator')}
                  tip={t('The username of the person who created this file.')}
                />
              </Grid>}
              {username && <Grid item xs={2}>
                <Typography variant="body1">{username}</Typography>
              </Grid>}
              <Grid item xs={10}>
                <HelpfulHeader
                  variant="subtitle1"
                  title={t('Revisions')}
                  tip={t('The number of different versions of this file which have been created.')}
                />
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body1">{revisions.length ?? 1}</Typography>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </React.Fragment>
    );
  }

  return (
    <SimpleDialog
      title={t('Program Plans')}
      open={Boolean(openProgramFile)}
      onClose={() => setOpenProgramFile(undefined)}
      footer={<FormControl fullWidth={true}>
        <Button variant="contained" color="primary" >
          {t('Load Program to Machine')}
        </Button>
      </FormControl> }
    >
      {openProgramFile && renderProgramFile(openProgramFile)}
    </SimpleDialog>
  );
};

export default PreviewProgramFileDialog;
