/** Raised by the domain when an operation targets a room that does not exist. */
export class RoomNotFoundError extends Error {
  constructor(public readonly roomId: string) {
    super(`No room with id "${roomId}" exists`);
    this.name = 'RoomNotFoundError';
  }
}
