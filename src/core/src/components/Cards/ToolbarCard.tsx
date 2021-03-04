import useStyles from './styles';
import React, {FunctionComponent} from 'react';
import {Card, CardActions, CardContent, CardHeader} from '@material-ui/core';
import {ICardProps, IToolbarProps} from './types';
import ToolbarContent from './ToolbarContent';

type Props = ICardProps;

const ToolbarCard: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const { action, subHeader, children, footer } = props;
  const toolbarProps = props as IToolbarProps;
  
  return (
    <Card className={classes.root}>
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
