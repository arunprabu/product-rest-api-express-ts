import jetPaths from 'jet-paths';

const Paths = {
  _: '/api/v1',
  Products: {
    _: '/products',
    Get: '/',
    Add: '/',
    GetById: '/:id',
    Update: '/:id',
    Delete: '/:id',
  }
} as const;

export const JetPaths = jetPaths(Paths);
export default Paths;
