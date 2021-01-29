import {Logger} from '../utils/logging';
import { EventEmitter } from 'events';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import {IOpenWorkShop} from '../types';
import { WebSocketLink } from '@apollo/client/link/ws';

export enum ConnectionState {
  Disconnected = -1,
  Connecting,
  Connected,
}

export enum BackendConnectionEvent {
  ConnectionStateChanged,
}

export class BackendConnection extends EventEmitter {
  private _subscriptionClient: SubscriptionClient;

  private _webSocketLink: WebSocketLink;
  private _ows: IOpenWorkShop;
  private _log?: Logger;
  private _state: ConnectionState = ConnectionState.Disconnected;

  constructor(ows: IOpenWorkShop) {
    super();
    this._ows = ows;
    [this._subscriptionClient, this._webSocketLink] = this.rebuild();
  }

  private rebuild(): [SubscriptionClient, WebSocketLink] {
    if (this._subscriptionClient) {
      this._subscriptionClient.close(true, false);
    }

    const url = 'ws://localhost:8000/api/graphql';
    const subscriptionClient = new SubscriptionClient(url, {
      reconnect: true,
      connectionParams: async () => {
        const user = await this._ows.authManager.getUser();
        return user ? { token: user.access_token } : { };
      },
      connectionCallback: (error, result) => {
        this.log.info('[connection]', error, result);
      },
    });

    subscriptionClient.onConnected((a) => {
      this.log.info('[subscription]', 'connected.', a);
      this.setState(ConnectionState.Connected);
    });

    subscriptionClient.onConnecting((a) => {
      this.log.info('[subscription]', 'connecting...', a);
      this.setState(ConnectionState.Connecting);
    });

    subscriptionClient.onReconnected ((a) => {
      this.log.info('[subscription]', 're-connected.', a);
      this.setState(ConnectionState.Connected);
    });

    subscriptionClient.onReconnecting((a) => {
      this.log.info('[subscription]', 're-connecting...', a);
      this.setState(ConnectionState.Connecting);
    });

    subscriptionClient.onDisconnected((a) => {
      this.log.info('[subscription]', 'disconnected.', a);
      this.setState(ConnectionState.Disconnected);
    });

    subscriptionClient.onError((a) => {
      this.log.error('[subscription]', 'error', a);
      if (this.state === ConnectionState.Connecting) {
        this.setState(ConnectionState.Disconnected);
      }
    });

    const ws =  new WebSocketLink(subscriptionClient);
    ws.setOnError(req => {
      this.log.error('request error', req);
    });

    return [subscriptionClient, ws];
  }

  public async reconnect(): Promise<boolean> {
    this.log.debug('reconnecting...');
    this._subscriptionClient.close(false);
    // [this._subscriptionClient, this._webSocketLink] = this.rebuild();
    while (!this.isConnected) {
      this.log.debug('reconnection pending...', this.state);
      await new Promise((r) => setTimeout(r, 1000));
      if (this.state === ConnectionState.Disconnected) {
        this.log.warn('reconnection failed.');
        return false;
      }
    }
    this.log.debug('reconnection', this.state, this.isConnected);
    return this.isConnected;
  }

  private setState(state: ConnectionState) {
    if (this._state === state) return;
    this._state = state;
    this.log.debug('state', state);
    this.emit(BackendConnectionEvent.ConnectionStateChanged.toString(), state);
  }

  public get state(): ConnectionState { return this._state; }

  public get isConnected(): boolean { return this.state === ConnectionState.Connected; }

  public get log(): Logger {
    if (!this._log) this._log = this._ows.logManager.getLogger('Backend');
    return this._log;
  }

  public get webSocketLink(): WebSocketLink { return this._webSocketLink; }
}

