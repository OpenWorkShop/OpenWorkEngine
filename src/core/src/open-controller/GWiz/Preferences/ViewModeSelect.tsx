import * as React from 'react';
import { ViewPlane} from '../types';
import {useTrans} from '../../Context';
import {getViewPlaneIcon, getViewPlaneNameKey} from '../ViewPlane';
import IconSelect from '../../../components/Forms/IconSelect';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../../redux';
import {gWizSetViewPlane} from '../actions';

const ViewModeSelect: React.FunctionComponent = () => {
  const t = useTrans();
  const viewPlane = useSelector<AppState, ViewPlane>(s => s.gWiz.visualizerPreferences.viewPlane);
  const dispatch = useDispatch();
  const planeNumbers = [...Array(ViewPlane.NumPlanes).keys()];
  const planeOptions = planeNumbers.map((p) => {
    return {
      itemId: p.valueOf(),
      title: t(getViewPlaneNameKey(p)),
      owsIcon: getViewPlaneIcon(p),
    };
  });

  function setViewPlane(vp: ViewPlane) {
    dispatch( gWizSetViewPlane( vp ) );
  }

  return (
    <IconSelect
      items={planeOptions}
      selectedId={viewPlane.valueOf()}
      setSelectedId={(id) => setViewPlane(id as ViewPlane)}
      label={t('View Mode')}
    />
  );
};

export default ViewModeSelect;
