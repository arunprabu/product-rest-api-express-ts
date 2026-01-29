import { Router } from 'express';
import Paths from '@src/common/constants/Paths';
import ProductRoutes from './ProductRoutes';

const apiRouter = Router();

// ----------------------- Implement UsersRouter --------------------------------- //

// const userRouter = Router();

// userRouter.get(Paths.Users.Get, UserRoutes.getAll);
// userRouter.post(Paths.Users.Add, UserRoutes.add);
// userRouter.put(Paths.Users.Update, UserRoutes.update);
// userRouter.delete(Paths.Users.Delete, UserRoutes.delete);

// apiRouter.use(Paths.Users._, userRouter);


// ----------------------- Implement ProductRouter --------------------------------- //
const productRouter = Router();
productRouter.get(Paths.Products.Get, ProductRoutes.getAll);
productRouter.post(Paths.Products.Add, ProductRoutes.add);
productRouter.get(Paths.Products.GetById, ProductRoutes.getById);
productRouter.put(Paths.Products.Update, ProductRoutes.update);
productRouter.delete(Paths.Products.Delete, ProductRoutes.delete);


// The following was the missed line in yesterday's implementtion
apiRouter.use(Paths.Products._, productRouter);

export default apiRouter;
