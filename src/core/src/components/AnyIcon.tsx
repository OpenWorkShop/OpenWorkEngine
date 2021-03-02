import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {OwsIconName} from './OpenWorkShopIcon';
import React, {FunctionComponent} from 'react';
import {useLogger} from '../hooks';
import {OpenWorkShopIcon} from './index';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export interface IHaveAnyIcon {
  owsIcon?: OwsIconName;
  faIcon?: IconDefinition;
}

type Props = IHaveAnyIcon & React.SVGProps<SVGSVGElement>;

const AnyIcon: FunctionComponent<Props> = (props) => {
  const log = useLogger(AnyIcon);
  const { owsIcon, faIcon } = props;

  if (owsIcon) return (
    <OpenWorkShopIcon
      name={owsIcon}
      className={props.className}
      color={props.color}
    />
  );
  if (faIcon) return (
    <FontAwesomeIcon
      className={props.className}
      color={props.color}
      icon={faIcon} />
  );

  log.verbose('[ICON]', 'neither owsIcon nor faIcon were passed.');
  return null;
};

export default AnyIcon;
