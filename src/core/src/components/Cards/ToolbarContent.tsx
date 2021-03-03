import React, {FunctionComponent} from 'react';
import HelpfulHeader from '../Text/HelpfulHeader';
import {Toolbar, Typography} from '@material-ui/core';
import {IToolbarProps} from './types';

type Props = IToolbarProps;

const ToolbarContent: FunctionComponent<Props> = (props) => {
  const { header, title, tip } = props;

  function getToolbarContent(): React.ReactNode {
    if (header) return header;
    if (title && tip) return <HelpfulHeader tip={tip} title={title} />;
    if (title) return <Typography variant="h5" >{title}</Typography>;
    return undefined;
  }

  const content = getToolbarContent();
  return content ? (<Toolbar>{content}</Toolbar>) : null;
};

export default ToolbarContent;
