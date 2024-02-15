import { Module } from '@nestjs/common';

import { SocketBaseService } from './services/socket-base.service';
import { SocketExampleService } from './services/socket-example.service';
import { SocketGateway } from './socket.gateway';

@Module({
  imports: [],
  providers: [SocketGateway, SocketBaseService, SocketExampleService],
})
export class SocketModule {}
