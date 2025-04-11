export interface UccxConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  endpoints: {
    queueStats: string;
    agentStats: string;
  };
  pollingInterval: number;
  retryAttempts: number;
  retryDelay: number;
}

export interface RedisConfig {
  host: string;
  port: number;
  password?: string;
  db: number;
  ttl: number;
}

export interface AppConfig {
  port: number;
  environment: string;
  uccx: UccxConfig;
  redis: RedisConfig;
}

export default (): AppConfig => ({
  port: parseInt(process.env.PORT || '3001', 10),
  environment: process.env.NODE_ENV || 'development',
  uccx: {
    host: process.env.UCCX_HOST || 'http://uccx.kardan.ir',
    port: parseInt(process.env.UCCX_PORT || '9080', 10),
    username: process.env.UCCX_USERNAME || '',
    password: process.env.UCCX_PASSWORD || '',
    endpoints: {
      queueStats: '/realtime/VoiceIAQStats',
      agentStats: '/realtime/ResourceIAQStats',
    },
    pollingInterval: parseInt(process.env.UCCX_POLLING_INTERVAL || '30000', 10),
    retryAttempts: parseInt(process.env.UCCX_RETRY_ATTEMPTS || '3', 10),
    retryDelay: parseInt(process.env.UCCX_RETRY_DELAY || '1000', 10),
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD,
    db: parseInt(process.env.REDIS_DB || '0', 10),
    ttl: parseInt(process.env.REDIS_TTL || '60', 10),
  },
}); 