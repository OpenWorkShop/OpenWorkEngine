import { Modal, Typography, ThemeProvider, useTheme } from '@material-ui/core';
import * as React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import ThreeColumns from '../Layout/ThreeColumns';
import ToolbarCard from '../Cards/ToolbarCard';
import {IToolbarCardProps} from './ToolbarCard';

type Props = IToolbarCardProps & {
  open: boolean;
  onClose: () => void;
};

const CardModal: React.FunctionComponent<Props> = (props) => {
  const { t } = useTranslation();
  const { open, onClose } = props;
  const theme = useTheme();
  // const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="create workspace"
    >
      <div style={{ outline: 0 }}>
        <ThreeColumns>
          <ThemeProvider theme={theme}>
            <ToolbarCard {...props} >
              {props.children}
            </ToolbarCard>
          </ThemeProvider>
        </ThreeColumns>
      </div>
    </Modal>
  );
};

export default CardModal;
