import * as React from 'react';
import {useTrans} from '../../Context';
import {allSides, getSideIcon, getSidesNames} from '../sides';
import IconSelect from '../../../components/Forms/IconSelect';
// import {useDispatch} from 'react-redux';
import {ViewSide} from '../types';

const ViewSideSelect: React.FunctionComponent = () => {
  const t = useTrans();
  const viewPlane = ViewSide.Back;
  // const dispatch = useDispatch();
  const planeOptions = allSides.map((p) => {
    return {
      itemId: p.valueOf(),
      title: t(getSidesNames(p).join('-')),
      owsIcon: getSideIcon(p),
    };
  });

  function setViewPlane(vp: ViewSide) {
    // dispatch( gWizSlice.actions.setViewPlane( vp ) );
  }

  return (
    <IconSelect
      items={planeOptions}
      selectedId={viewPlane.valueOf()}
      setSelectedId={(id) => setViewPlane(id as ViewSide)}
      label={t('View Mode')}
    />
  );
};

export default ViewSideSelect;
