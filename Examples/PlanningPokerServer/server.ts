import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from '@org/shared-types';
import type { ServerConfig } from './config';

/** Socket.IO server bound to our shared, typed event contract. */
export type AppServer = Server<ClientToServerEvents, ServerToClientEvents>;

export interface CreatedServer {
  httpServer: http.Server;
  io: AppServer;
}

/**
 * Factory that builds the HTTP + Socket.IO server from configuration only.
 * It knows nothing about rooms or game rules — just transport wiring.
 */
export function createServer(config: ServerConfig): CreatedServer {
  const app = express();
  const httpServer = http.createServer(app);
  const io: AppServer = new Server(httpServer, {
    cors: {
      origin: config.corsOrigins,
      methods: ['GET', 'POST'],
    },
  });

  return { httpServer, io };
}
