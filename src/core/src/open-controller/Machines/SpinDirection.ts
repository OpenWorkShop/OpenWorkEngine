import {CircleDirection} from '../graphql';
import {IconDefinition} from '@fortawesome/fontawesome-common-types';
import {faArrowCircleLeft, faArrowCircleRight, faStopCircle} from '@fortawesome/free-solid-svg-icons';

export function getSpinDirectionIcon(spin: CircleDirection): IconDefinition {
  if (spin === CircleDirection.Ccw) return faArrowCircleLeft;
  if (spin === CircleDirection.Cw) return faArrowCircleRight;
  return faStopCircle;
}
