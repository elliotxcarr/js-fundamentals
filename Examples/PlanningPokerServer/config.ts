export interface ServerConfig {
  port: number;
  corsOrigins: string[];
}

export const serverConfig: ServerConfig = {
  port: 3001,
  corsOrigins: [
    'http://localhost:4200',
    'https://your-frontend-url', // replace with deployed url
  ],
};
