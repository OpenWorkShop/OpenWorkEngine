class MachineController {
    constructor() {
        this.workflow = { state: 'idle' };
        this._connected = false;
    }
    addListener(type, listener) {
    }
    closePort(port) {
        return Promise.resolve(undefined);
    }
    command(cmd) {
        return Promise.resolve(undefined);
    }
    connect(host) {
        return Promise.resolve(false);
    }
    get connected() {
        return this._connected;
    }
    disconnect() {
        return Promise.resolve(undefined);
    }
    listPorts() {
        return Promise.resolve([]);
    }
    openPort(opts) {
        return Promise.resolve(undefined);
    }
    removeListener(type, listener) {
    }
    write(str) {
        return Promise.resolve(undefined);
    }
    writeln(str) {
        return Promise.resolve(undefined);
    }
}
export default MachineController;
//# sourceMappingURL=MachineController.js.map