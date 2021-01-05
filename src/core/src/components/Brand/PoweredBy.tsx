import React, { FunctionComponent } from 'react';
import { Typography } from '@material-ui/core';
import { favicon32 } from '../Images';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import {useOwsTrans} from '../../Hooks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      width: 16,
      height: 16,
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(0.5),
    },
  }),
);

interface OwnProps {
  productName: string;
  link?: string;
}

type Props = OwnProps;

const PoweredBy: FunctionComponent<Props> = (props) => {
  const t = useOwsTrans();
  const classes = useStyles();
  const link = props.link ?? 'https://openwork.shop/about/powered-by';

  function renderIcon() {
    return <img className={classes.logo} alt={t('OpenWorkShop icon')} src={favicon32.base64} />;
  }

  return (
    <div>
      <Typography variant='subtitle2'>
        {t('{{ productName }} is powered by', props)}
        {renderIcon()}
        <a href={link} title={t('About OpenWorkShop')} target='_blank'>
          OpenWorkShop
        </a>
      </Typography>
    </div>
  );
};

export default PoweredBy;
