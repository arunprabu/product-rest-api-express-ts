import logger from 'jet-logger';

import EnvVars from './common/constants/env';
import { connectDB } from './common/database';
import server from './server';

/******************************************************************************
                                Constants
******************************************************************************/

const SERVER_START_MESSAGE =
  'Express server started on port: ' + EnvVars.Port.toString();

/******************************************************************************
                                  Run
******************************************************************************/

// Connect to MongoDB then start the server
(async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start the server
    server.listen(EnvVars.Port, (err) => {
      if (!!err) {
        logger.err(err.message);
      } else {
        logger.info(SERVER_START_MESSAGE);
      }
    });
  } catch (error) {
    logger.err('Failed to start application:', error);
    process.exit(1);
  }
})();
