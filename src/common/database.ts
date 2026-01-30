import mongoose from 'mongoose';
import logger from 'jet-logger';

import EnvVars from '@src/common/constants/env';

/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Connect to MongoDB
 */
export async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(EnvVars.MongodbUri);
    logger.info('MongoDB connected successfully');
  } catch (error) {
    logger.err('MongoDB connection error:', error);
    process.exit(1);
  }
}

/**
 * Disconnect from MongoDB
 */
export async function disconnectDB(): Promise<void> {
  try {
    await mongoose.disconnect();
    logger.info('MongoDB disconnected successfully');
  } catch (error) {
    logger.err('MongoDB disconnection error:', error);
  }
}

/**
 * Get connection status
 */
export function getConnectionStatus(): string {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  return states[mongoose.connection.readyState] || 'unknown';
}

// Handle connection events
mongoose.connection.on('connected', () => {
  logger.info('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  logger.err('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  logger.info('Mongoose disconnected from MongoDB');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await disconnectDB();
  process.exit(0);
});

export default {
  connectDB,
  disconnectDB,
  getConnectionStatus,
} as const;
