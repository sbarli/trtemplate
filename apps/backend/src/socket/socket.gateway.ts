import { Logger, UseGuards } from '@nestjs/common';
import {
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
  OnGatewayDisconnect,
  OnGatewayInit,
  ConnectedSocket,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { CurrentUserFromRequest } from 'src/auth/decorators/current-user.decorator';
import { JwtWsAuthGuard } from 'src/auth/guards/jwt-ws-auth.guard';
import { UserWithoutPassword } from 'src/users/schemas/user.schema';

import { SocketEvent } from '@changeme/types';

import { SocketBaseService } from './services/socket-base.service';
import { SocketExampleService } from './services/socket-example.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  // NOTE: this has to be delcared for websockets to work, but isn't necessary to use 🤷🏼‍♂️
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  @WebSocketServer() private server!: Socket;
  private logger: Logger = new Logger('SocketGateway');

  constructor(
    private readonly socketBaseService: SocketBaseService,
    private readonly socketExampleService: SocketExampleService
  ) {}

  afterInit() {
    this.logger.log('initialized');
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`Client disconnected: ${socket.id}`);
  }

  handleConnection(@ConnectedSocket() socket: Socket) {
    return this.socketBaseService.handleConnection(socket);
  }

  @UseGuards(JwtWsAuthGuard)
  @SubscribeMessage(SocketEvent.EXAMPLE_EVENT)
  exampleEventHandler(
    @CurrentUserFromRequest() user: UserWithoutPassword,
    @MessageBody('someData') someData: string,
    @ConnectedSocket() socket: Socket
  ) {
    return this.socketExampleService.handleExampleEvent(socket, {
      someData,
      user,
    });
  }

  // Implement other Socket.IO event handlers and message handlers
}
