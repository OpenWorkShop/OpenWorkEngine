import React, {FunctionComponent} from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  Grid,
  Paper,
  Typography
} from '@material-ui/core';
import {IHaveWorkspace} from '../Workspaces';
import {ProgramFileFragment, ProgramSyntax} from '../graphql';
import SimpleDialog from '../../components/Dialogs/SimpleDialog';
import {useTrans} from '../Context';
import HelpfulHeader from '../../components/Text/HelpfulHeader';
import useStyles from './styles';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretSquareDown} from '@fortawesome/free-solid-svg-icons';

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

  function getSyntaxName(syntax: ProgramSyntax) {
    if (syntax === ProgramSyntax.GCode) return 'Gcode';
    return syntax;
  }

  function renderProgramFile(programFile: ProgramFileFragment) {
    const { meta, lineCount, instructionCount } = programFile;
    const { name, size, syntax, lastModified, data } = meta;
    //const tags = data?.tags ?? [];
    const numLines = lineCount.toLocaleString();
    const numInstructions = instructionCount.toLocaleString();
    const syntaxName = getSyntaxName(syntax);
    const revisions = data?.revisions ?? [];
    const firstRevision = revisions.length > 0 ? revisions[0] : undefined;
    const lastRevision = revisions.length > 1 ? revisions[revisions.length - 1] : undefined;
    const username = firstRevision?.username;
    const createdTime = firstRevision ? new Date(firstRevision.createdAt).toLocaleTimeString() : undefined;
    const createdDate = firstRevision ? new Date(firstRevision.createdAt).toLocaleDateString() : undefined;
    const modifiedTime = lastRevision ? new Date(lastRevision.createdAt).toLocaleTimeString() : undefined;
    const modifiedDate = lastRevision ? new Date(lastRevision.createdAt).toLocaleDateString() : undefined;
    const lm = new Date(lastModified * 1000).toLocaleString();

    return (
      <React.Fragment>
        <Paper className={classes.dialogContent}>
          <Typography variant="h5">{name}</Typography>
          {firstRevision && <Typography variant="body1">
            {t('Created by {{ username }} on {{ createdDate }} at {{ createdTime }}',
              { username, createdDate, createdTime })}
          </Typography>}
          {lastRevision && <Typography variant="body1">
            {t('Last updated by {{ user2 }} on {{ modifiedDate }} at {{ modifiedTime }}',
              { username: lastRevision.username, modifiedDate, modifiedTime })}
          </Typography>}
          <Typography variant="body1">
            {t('Last modified at {{ lastModified }}.',
              { lastModified })}
          </Typography>
          <Typography variant="body1">
            {t('Contains {{ numInstructions }} valid {{ syntaxName }} instructions in {{ numLines}} lines of text.',
              { numInstructions, syntaxName, numLines })}
          </Typography>
        </Paper>
      </React.Fragment>
    );
  }

  return (
    <SimpleDialog
      title={t('Program File Preview')}
      open={Boolean(openProgramFile)}
      onClose={() => setOpenProgramFile(undefined)}
      footer={<FormControl fullWidth={true}>
        <Button
          variant="contained"
          color="primary"
        >
          {t('Load Program to Machine')}
        </Button>
      </FormControl> }
    >
      {openProgramFile && renderProgramFile(openProgramFile)}
    </SimpleDialog>
  );
};

export default PreviewProgramFileDialog;
