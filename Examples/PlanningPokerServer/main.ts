import { serverConfig } from './config';
import { createServer } from './server';
import { RandomRoomIdGenerator, UuidGenerator } from './domain/id-generator';
import { InMemoryRoomRepository } from './domain/room.repository';
import { RoomService } from './domain/room.service';
import { SocketGateway } from './gateway/socket.gateway';

/**
 * Composition root: the single place that knows every concrete class and wires
 * the dependency graph together. Swapping an implementation (e.g. a Redis-backed
 * repository) is a change here only — every other module depends on abstractions.
 */
const { httpServer, io } = createServer(serverConfig);

const roomRepository = new InMemoryRoomRepository();
const roomService = new RoomService(
  roomRepository,
  new RandomRoomIdGenerator(),
  new UuidGenerator(),
);

new SocketGateway(io, roomService).register();

httpServer.listen(serverConfig.port, () =>
  console.log(`Server running on port ${serverConfig.port}`),
);
