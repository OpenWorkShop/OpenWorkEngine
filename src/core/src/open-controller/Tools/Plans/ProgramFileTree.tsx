import React, { FunctionComponent } from 'react';
import {ProgramFileMetaFragment, ProgramFileRevisionFragment} from '../../graphql';
import {TreeItem, TreeView} from '@material-ui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretSquareDown, faCaretSquareRight, faCaretSquareUp, faFile, faFileAlt,
} from '@fortawesome/free-solid-svg-icons';
import {useTrans} from '../../Context';
import {useLogger} from '../../../hooks';

type Props = {
  onSelected: (meta?: ProgramFileMetaFragment, revId?: number) => void;
  programFileMetas: ProgramFileMetaFragment[];
};

const ProgramFileTree: FunctionComponent<Props> = (props) => {
  const t = useTrans();
  const log = useLogger(ProgramFileTree);
  const [selectedProgramName, setSelectedProgramName] = React.useState<string>();
  const [selectedRevisionId, setSelectedRevisionId] = React.useState<number>(0);
  const { programFileMetas, onSelected } = props;
  const isDisabled = false;
  const splitter = '/'; // since file names can't have slashes, this is safe to use as a split character.

  const selected = [];
  if (selectedProgramName) selected.push(selectedProgramName);
  if (selectedProgramName && selectedRevisionId) selected.push(`${selectedProgramName}${splitter}${selectedRevisionId}`);

  /*
  const selectedMeta = selectedProgramName ? programFileMetas.find(m => m.name === selectedProgramName) : undefined;
  const selectedRevisions = selectedMeta?.data?.revisions ?? [];
  const lastRevision = selectedRevisions.length > 0 ? selectedRevisions[selectedRevisions.length - 1] : undefined;
  const hasSelectedRevision = selectedProgramName && selectedRevisionId && lastRevision?.id !== selectedRevisionId;
*/

  function selectFileRevision(name: string | undefined, revId: number) {
    if (!revId && name === selectedProgramName) {
      name = undefined;
      setSelectedProgramName(undefined);
    }
    const meta = name ? programFileMetas.find(m => m.name === name) : undefined;
    if (!meta && name) {
      log.error('missing meta', name, revId);
      name = undefined;
      revId = 0;
    }
    log.debug('select file', name, 'revision #', revId);
    setSelectedProgramName(name);
    setSelectedRevisionId(revId);
    onSelected(meta, revId);
  }

  function onSelectedNodes(event: React.SyntheticEvent, nodeIds: string[]) {
    // Bug in material UI?
    if (typeof nodeIds === 'string') nodeIds = [nodeIds];
    const parts = nodeIds.length === 1 ? nodeIds[0].split(splitter) : [];
    selectFileRevision(
      parts.length > 0 ? parts[0] : undefined,
      Number.parseInt(parts.length > 1 ? parts[1] : '0') ?? 0
    );
  }

  function renderProgramFileMeta(meta: ProgramFileMetaFragment): React.ReactNode {
    const revisions: ProgramFileRevisionFragment[] = []; // meta.data?.revisions ?? [];

    return (
      <TreeItem key={meta.name} nodeId={meta.name} label={meta.name}>
        {revisions.map(r => {
          const id = r.id.toString();
          const ts = new Date(r.createdAt).toLocaleString();
          log.debug('ts', id, ts, r.createdAt, typeof ts);

          return <TreeItem
            key={id}
            nodeId={`${meta.name}${splitter}${id}`}
            label={t('Revision #{{ id }} ({{ ts }})', { id, ts })}
          />;
        })}
      </TreeItem>
    );
  }

  return (<TreeView
    defaultCollapseIcon={<FontAwesomeIcon icon={faCaretSquareDown} />}
    defaultExpandIcon={<FontAwesomeIcon icon={faCaretSquareRight} />}
    defaultParentIcon={<FontAwesomeIcon icon={faCaretSquareUp} />}
    defaultEndIcon={<FontAwesomeIcon icon={faFileAlt} />}
    onNodeSelect={onSelectedNodes}
    disableSelection={isDisabled}
    expanded={selected}
    selected={selected}
  >
    {programFileMetas.map(renderProgramFileMeta)}
  </TreeView>);
};

export default ProgramFileTree;
