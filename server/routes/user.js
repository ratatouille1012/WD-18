 import {Router} from 'express'
import { getUser, getUserById } from '../controllers/user.js'
const userRouter = Router()

userRouter.get('/', getUser);
userRouter.get('/:id', getUserById);

export default userRouter;