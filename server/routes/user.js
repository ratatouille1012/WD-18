import {Router} from 'express'
import { getUser, getUserById,updateUserById } from '../controllers/User.js'
const userRouter = Router()

userRouter.get('/', getUser);
userRouter.get('/:id', getUserById);
userRouter.put("/update/:id", updateUserById);
export default userRouter;