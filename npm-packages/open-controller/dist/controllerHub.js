import * as signalR from '@microsoft/signalr';
const connection = new signalR.HubConnectionBuilder()
    .withUrl('/controllers')
    .build();
export default connection;
//# sourceMappingURL=controllerHub.js.map