import {IHaveOpenControllerDeployment} from './Context';
import {BackendConnection} from '@openworkshop/lib/api';

export interface IOpenControllerMain extends IHaveOpenControllerDeployment {
  connection?: BackendConnection;
}
