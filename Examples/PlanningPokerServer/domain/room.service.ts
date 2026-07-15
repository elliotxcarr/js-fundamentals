import type { Player, Room } from '@org/shared-types';
import type { IdGenerator } from './id-generator';
import type { RoomRepository } from './room.repository';
import { RoomNotFoundError } from './errors';

/** Result of a player entering a room. */
export interface PlayerJoined {
  room: Room;
  playerId: string;
}

/** Result of a player leaving; `room` is null when the room became empty. */
export interface RoomLeft {
  roomId: string;
  room: Room | null;
}

/**
 * All planning-poker game rules live here — and nothing else does. The service
 * is pure domain logic: it has no idea it is driven by web sockets, so it can
 * be unit-tested in isolation and reused behind any transport.
 *
 * Its collaborators are injected as abstractions (Dependency Inversion), so the
 * storage mechanism and the ID strategies can change without touching this file.
 */
export class RoomService {
  constructor(
    private readonly rooms: RoomRepository,
    private readonly roomIdGenerator: IdGenerator,
    private readonly playerIdGenerator: IdGenerator,
  ) {}

  createRoom(playerName: string, socketId: string): PlayerJoined {
    const room: Room = {
      id: this.roomIdGenerator.generate(),
      players: [],
      revealed: false,
      votes: [],
    };
    this.rooms.save(room);
    return this.addPlayer(room, playerName, socketId, true);
  }

  joinRoom(roomId: string, playerName: string, socketId: string): PlayerJoined {
    const room = this.rooms.get(roomId);
    if (!room) throw new RoomNotFoundError(roomId);
    return this.addPlayer(room, playerName, socketId, false);
  }

  vote(roomId: string, playerId: string, vote: number): Room | null {
    const room = this.rooms.get(roomId);
    if (!room) return null;

    const player = room.players.find((p) => p.id === playerId);
    if (!player) return null;

    player.vote = vote;
    room.votes = room.players
      .map((p) => p.vote)
      .filter((v): v is number => v != null);
    this.rooms.save(room);
    return room;
  }

  reveal(roomId: string): Room | null {
    const room = this.rooms.get(roomId);
    if (!room) return null;

    room.revealed = true;
    this.rooms.save(room);
    return room;
  }

  reset(roomId: string): Room | null {
    const room = this.rooms.get(roomId);
    if (!room) return null;

    const nothingToReset = room.players.every((p) => p.vote === null);
    if (nothingToReset) return null;

    for (const player of room.players) player.vote = null;
    room.votes = [];
    room.revealed = false;
    this.rooms.save(room);
    return room;
  }

  leave(socketId: string): RoomLeft[] {
    return this.rooms.findBySocketId(socketId).map((room) => {
      room.players = room.players.filter((p) => p.socketId !== socketId);

      if (room.players.length > 0) {
        this.rooms.save(room);
        return { roomId: room.id, room };
      }

      this.rooms.delete(room.id);
      return { roomId: room.id, room: null };
    });
  }

  private addPlayer(
    room: Room,
    playerName: string,
    socketId: string,
    creator: boolean,
  ): PlayerJoined {
    const player: Player = {
      id: this.playerIdGenerator.generate(),
      name: playerName,
      vote: null,
      socketId,
      creator,
    };
    room.players.push(player);
    this.rooms.save(room);
    return { room, playerId: player.id };
  }
}
