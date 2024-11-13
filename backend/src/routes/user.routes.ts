import { Router, Request, Response } from "express";
import userController from "../controllers/user.controller";


const userRouter =Router()

userRouter.get('/',userController.getUsers)
userRouter.post('/',userController.addUser)
userRouter.get('/:id',userController.getUserById)
userRouter.put('/:id', userController.updateUserById)
userRouter.delete('/:id', userController.deleteUserById)
userRouter.post('/login', userController.loginUser)

export default userRouter