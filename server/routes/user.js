 import {Router} from 'express'
import { getUser, getUserById } from '../controllers/user'
const userRouter = Router()

userRouter.get('/', getUser);
userRouter.get('/:id', getUserById);

export default userRouter;