import type { Socket } from 'socket.io';
import type {
  ClientToServerEvents,
  Room,
  ServerToClientEvents,
} from '@org/shared-types';
import type { AppServer } from '../server';
import type { RoomService } from '../domain/room.service';
import { RoomNotFoundError } from '../domain/errors';

type AppSocket = Socket<ClientToServerEvents, ServerToClientEvents>;

/**
 * The only layer that knows about Socket.IO. It adapts incoming socket events
 * into RoomService calls and turns the results back into emits/broadcasts.
 * Keeping all transport concerns here means the domain stays framework-free.
 */
export class SocketGateway {
  constructor(
    private readonly io: AppServer,
    private readonly rooms: RoomService,
  ) {}

  register(): void {
    this.io.on('connection', (socket) => this.handleConnection(socket));
  }

  private handleConnection(socket: AppSocket): void {
    console.log('New client connected:', socket.id);

    socket.on('create_room', ({ name }) => {
      const { room, playerId } = this.rooms.createRoom(name, socket.id);
      this.admitPlayer(socket, room, playerId);
    });

    socket.on('join_room', ({ id, name }) => {
      try {
        const { room, playerId } = this.rooms.joinRoom(id, name, socket.id);
        this.admitPlayer(socket, room, playerId);
      } catch (error) {
        if (error instanceof RoomNotFoundError) {
          socket.emit('room_error', 'No room with that ID exists');
          return;
        }
        throw error;
      }
    });

    socket.on('vote', ({ roomId, playerId, vote }) => {
      this.broadcast(roomId, this.rooms.vote(roomId, playerId, vote));
    });

    socket.on('reveal', ({ roomId }) => {
      this.broadcast(roomId, this.rooms.reveal(roomId));
    });

    socket.on('reset', ({ roomId }) => {
      this.broadcast(roomId, this.rooms.reset(roomId));
    });

    socket.on('leave', () => {
      for (const { roomId, room } of this.rooms.leave(socket.id)) {
        this.io.to(roomId).emit('update_room', room);
      }
    });
  }

  /** Join the socket to the room and announce the new state to everyone. */
  private admitPlayer(socket: AppSocket, room: Room, playerId: string): void {
    socket.join(room.id);
    this.io.to(room.id).emit('update_room', room);
    socket.emit('player_id', playerId);
  }

  /** Broadcast an updated room, skipping no-op results the service returns as null. */
  private broadcast(roomId: string, room: Room | null): void {
    if (room) this.io.to(roomId).emit('update_room', room);
  }
}
