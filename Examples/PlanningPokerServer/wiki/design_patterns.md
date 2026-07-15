# Design patterns used

Pattern: Repository
- Where: RoomRepository / InMemoryRoomRepository
- What it buys you: Isolates persistence behind an interface; the domain
doesn't know it's a Map.


Pattern: Strategy
- Where: IdGenerator with RandomRoomIdGenerator / UuidGenerator
- What it buys you: Two interchangeable ID algorithms selected by
injection; room codes and player IDs use different strategies through
one contract.


Pattern: Dependency Injection
- Where: Constructors of RoomService and SocketGateway
- What it buys you: Collaborators are passed in, never new-ed internally —
the key enabler of OCP/DIP and unit testing.


Pattern: Composition Root
- Where: main.ts
- What it buys you: The single spot that knows concrete types and assembles
the object graph.


Pattern: Factory
- Where: createServer()
- What it buys you: Encapsulates the express/http/socket.io construction
behind one call.


Pattern: Adapter / Gateway
- Where: SocketGateway
- What it buys you: Adapts the Socket.IO transport to plain domain method
calls; the domain stays protocol-agnostic.