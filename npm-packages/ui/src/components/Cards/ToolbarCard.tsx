import useStyles from './CardStyles';
import React, { FunctionComponent } from 'react';
import { Card, CardActions, CardHeader, Toolbar, CardContent } from '@material-ui/core';

export interface IToolbarCardProps {
  title: string;
  action?: React.ReactNode;
  subHeader?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

type Props = IToolbarCardProps;

const ToolbarCard: FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader className={classes.cardHeader} action={props.action} title={
        <Toolbar>
          {props.title}
        </Toolbar>}
      />
      {props.subHeader && <CardActions className={classes.subHeader}>{props.subHeader}</CardActions>}
      <CardContent className={classes.content}>
        {props.children}
      </CardContent>
      {props.footer && <CardActions className={classes.cardFooter}>{props.footer}</CardActions>}
    </Card>
  );
};

export default ToolbarCard;
