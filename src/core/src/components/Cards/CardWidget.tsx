import React, { FunctionComponent } from 'react';
import {CardWidgetProps, ICardProps} from './types';
import CardDialog from './CardDialog';
import ToolbarCard from './ToolbarCard';

const CardWidget: FunctionComponent<CardWidgetProps> = (props) => {
  const { open } = props;
  const isDialog = open !== undefined;
  const cardProps = props as ICardProps;

  return isDialog ? (<CardDialog {...props} />) : (<ToolbarCard {...cardProps} />);
};

export default CardWidget;

