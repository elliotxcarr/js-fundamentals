import { v4 as uuid } from 'uuid';

/**
 * Abstraction over "produce an identifier". Small on purpose (Interface
 * Segregation) so callers depend only on the one method they need.
 */
export interface IdGenerator {
  generate(): string;
}

/** Short, human-friendly room codes (e.g. "1042"), easy to read out loud. */
export class RandomRoomIdGenerator implements IdGenerator {
  generate(): string {
    return Math.floor(Math.random() * 1000 + 1000).toString();
  }
}

/** Globally-unique, unguessable player identifiers. */
export class UuidGenerator implements IdGenerator {
  generate(): string {
    return uuid();
  }
}
