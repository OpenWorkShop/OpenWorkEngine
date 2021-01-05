import {IHaveOpenControllerDeployment} from './Context';
import {BackendConnection} from '../api';

export interface IOpenControllerMain extends IHaveOpenControllerDeployment {
  connection?: BackendConnection;
}
