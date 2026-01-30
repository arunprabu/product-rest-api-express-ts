import jetEnv, { num, str } from 'jet-env';
import { isValueOf } from 'jet-validators';

// NOTE: These need to match the names of your ".env" files
export const NodeEnvs = {
  DEV: 'development',
  TEST: 'test',
  PRODUCTION: 'production',
} as const;

const EnvVars = jetEnv({
  NodeEnv: isValueOf(NodeEnvs),
  Port: num,
  MongoUri: str,
});

export default EnvVars;
