import {ListItem, ListItemText, ListItemIcon, Typography, useTheme} from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { Link, LinkProps, useLocation } from 'react-router-dom';
import useStyles from './Styles';

interface OwnProps {
  drawIcon: (col: string) => React.ReactNode;
  title: string;
  to: string;
  subcomponent?: React.ReactNode;
}

type Props = OwnProps;

const ListMenuItem: FunctionComponent<Props> = (props) => {
  const { drawIcon, title, to, subcomponent } = props;
  const theme = useTheme();
  const classes = useStyles();
  const location = useLocation();
  const selected = location.pathname === to;
  const col = selected ? theme.palette.secondary.dark : theme.palette.primary.main;
  const icon = drawIcon(col);

  const CustomLink = React.useMemo(() =>
    React.forwardRef<HTMLAnchorElement, Omit<LinkProps, 'to'>>(
      (props, ref) => <Link ref={ref} to={to} {...props} />
    ), [to]
  );

  return (
    <ListItem selected={selected} button component={CustomLink}>
      <ListItemIcon className={classes.listMenuIcon}>{icon}</ListItemIcon>
      <ListItemText primary={<Typography variant='h6'>{title}</Typography>} secondary={subcomponent} />
    </ListItem>
  );
};

export default ListMenuItem;
