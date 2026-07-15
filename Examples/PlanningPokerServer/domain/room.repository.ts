import type { Room } from '@org/shared-types';

/**
 * Persistence abstraction for rooms. The service depends on this interface,
 * not on any concrete store — so swapping the Map for Redis/Postgres later
 * requires no change to the business logic (Dependency Inversion).
 */
export interface RoomRepository {
  get(id: string): Room | undefined;
  has(id: string): boolean;
  save(room: Room): void;
  delete(id: string): void;
  findBySocketId(socketId: string): Room[];
}

/** Default in-memory implementation backed by a Map. */
export class InMemoryRoomRepository implements RoomRepository {
  private readonly rooms = new Map<string, Room>();

  get(id: string): Room | undefined {
    return this.rooms.get(id);
  }

  has(id: string): boolean {
    return this.rooms.has(id);
  }

  save(room: Room): void {
    this.rooms.set(room.id, room);
  }

  delete(id: string): void {
    this.rooms.delete(id);
  }

  findBySocketId(socketId: string): Room[] {
    return Array.from(this.rooms.values()).filter((room) =>
      room.players.some((player) => player.socketId === socketId),
    );
  }
}
