# How each SOLID principle is satisfied

## S — Single Responsibility.
Each class has exactly one reason to change:
- RoomService changes only when game rules change.
- SocketGateway changes only when the transport/wire protocol changes.
- InMemoryRoomRepository changes only when storage changes.
- createServer changes only when server wiring changes.

In the old file, all four reasons to change lived in one place — a socket-library upgrade and a scoring-rule tweak both meant editing the same function.

## O — Open/Closed.
The system is open to extension, closed to modification.
Want Redis-backed rooms? Write a RedisRoomRepository implements RoomRepository and change one line in main.ts — RoomService is never touched. Want unguessable room codes? Swap the injected generator. New behavior is added, not edited in.

## L — Liskov Substitution.
Any RoomRepository or IdGenerator implementation is a drop-in substitute because they honor the same contract. RoomService works correctly with InMemoryRoomRepository today and would work with any conforming replacement without knowing the difference.

## I — Interface Segregation.
The interfaces are deliberately tiny. IdGenerator exposes a single generate() method, so a consumer isn't forced to depend on methods it doesn't use. RoomRepository exposes only the five operations the service actually calls.

## D — Dependency Inversion.
The high-level policy (RoomService) depends on abstractions (RoomRepository, IdGenerator), not concrete classes. The concretions are created at the outermost edge (main.ts) and injected inward. Dependencies point toward interfaces, not toward implementation details.