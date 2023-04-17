const structure = {
  auth: {
    register: ['username', 'email', 'password'],
    signin: ['login', 'password'],
    signout: [],
    restore: ['token'],
  },
  messenger: {
    method: ['arg'],
  },
};

class ScaffoldError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

class ScafoldInterface {
  constructor() {
    this._events = new Map();
  }

  on(name, fn) {
    const event = this._events.get(name);
    if (event) event.add(fn);
    else this._events.set(name, new Set([fn]));
  }

  emit(name, ...args) {
    const event = this._events.get(name);
    if (!event) return;
    for (const fn of event.values()) fn(...args);
  }
}

export class Scaffold {
  constructor(url) {
    this.url = url;
    this.socket = new WebSocket(url);
    this.api = {};
    this.callId = 1;
    this.calls = new Map();
    this.socket.addEventListener('message', ({ data }) => {
      this.message(data);
    });
  }

  message(data) {
    let packet;
    try {
      packet = JSON.parse(data);
    } catch (err) {
      console.error(err);
      return;
    }
    console.log({ packet });
    const [, callId , args] = Object.keys(packet);
    const id = packet[callId];
    const result = packet[args];
    if (result) {
      const promised = this.calls.get(id);
      if (!promised) return;
      const [resolve, reject] = promised;
      if (packet.error) {
        const { message, code } = packet.error;
        const error = new ScaffoldError(message, code);
        reject(error);
        return;
      }
      resolve(result);
      return;
    }
  }

  ready() {
    return new Promise((resolve) => {
      if (this.socket.readyState === WebSocket.OPEN) resolve();
      else this.socket.addEventListener('open', resolve);
    });
  }

  load(...interfaces) {
    const available = Object.keys(structure);
    for (const interfaceName of interfaces) {
      if (!available.includes(interfaceName)) continue;
      const methods = new ScafoldInterface();
      const iface = structure[interfaceName];
      const request = this.socketCall(interfaceName);
      const methodNames = Object.keys(iface);
      for (const methodName of methodNames) {
        methods[methodName] = request(methodName);
      }
      this.api[interfaceName] = methods;
    }
  }

  socketCall(interfaceName) {
    const unit = interfaceName
    return (methodName) =>
      async (...args) => {
        const id = this.callId++;
        await this.ready();
        return new Promise((resolve, reject) => {
          this.calls.set(id, [resolve, reject]);
          const packet = { type: 'call', id, method: `${unit}/${methodName}`, args };
          this.socket.send(JSON.stringify(packet));
        });
      };
  }
}
