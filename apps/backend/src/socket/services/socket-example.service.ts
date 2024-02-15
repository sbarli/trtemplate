import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { UserWithoutPassword } from 'src/users/schemas/user.schema';

import { SocketEventError, SocketEventErrorCode, SocketEventResponse } from '@changeme/types';

@Injectable()
export class SocketExampleService {
  constructor() {}

  /**
   * @name handleExampleEvent
   * @description an example event handler
   */
  handleExampleEvent(
    socket: Socket,
    { someData, user }: { someData: string; user: UserWithoutPassword }
  ): SocketEventResponse {
    if (someData === 'goodbye') {
      const errorData = new SocketEventError(
        SocketEventErrorCode.NOT_FOUND,
        `Never say goodbye, ${user.username}. See you later!`,
        { socketId: socket.id }
      );
      return new SocketEventResponse({
        success: false,
        error: errorData,
      });
    }
    return new SocketEventResponse({
      success: true,
      data: { originalData: someData, response: `hello ${user.username}` },
    });
  }
}
