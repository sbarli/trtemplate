export enum SocketEventErrorCode {
  DUPE = 5050,
  INVALID = 5035,
  NOT_FOUND = 5040,
  UNKNOWN = 5000,
}

export class SocketEventError {
  constructor(
    public errorCode: SocketEventErrorCode,
    public message: string,
    public data?: unknown
  ) {}
}

export class SocketEventResponse {
  public success: boolean;
  public data?: unknown;
  public error?: SocketEventError;
  constructor(responseData: { success: boolean; data?: unknown; error?: SocketEventError }) {
    this.success = responseData.success;
    this.data = responseData.data;
    this.error = responseData.error;
  }
}

export enum SocketEvent {
  // server-emitted events

  // client-Emitted Events
  EXAMPLE_EVENT = 'exampleEvent',

  // event emitted to rooms
}
