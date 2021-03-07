import useStyles from './styles';
import React, {FunctionComponent} from 'react';
import {Card, CardActions, CardContent, CardHeader} from '@material-ui/core';
import {ICardProps, IToolbarProps} from './types';
import ToolbarContent from './ToolbarContent';
import clsx from 'clsx';

type Props = ICardProps & {
  className?: string;
}

const ToolbarCard: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const { action, subHeader, children, footer, className } = props;
  const toolbarProps = props as IToolbarProps;
  
  return (
    <Card className={clsx(classes.root, className)}>
      <CardHeader
        className={classes.cardHeader}
        action={action}
        title={<ToolbarContent {...toolbarProps} />}
      />
      {subHeader && <CardActions className={classes.subHeader}>{subHeader}</CardActions>}
      {children && <CardContent className={classes.content}>
        {children}
      </CardContent>}
      {footer && <CardActions className={classes.cardFooter}>{footer}</CardActions>}
    </Card>
  );
};

export default ToolbarCard;
