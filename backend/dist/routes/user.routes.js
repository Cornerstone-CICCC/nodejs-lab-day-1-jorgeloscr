"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const userRouter = (0, express_1.Router)();
userRouter.get('/', user_controller_1.default.getUsers);
userRouter.post('/', user_controller_1.default.addUser);
userRouter.get('/:id', user_controller_1.default.getUserById);
userRouter.put('/:id', user_controller_1.default.updateUserById);
userRouter.delete('/:id', user_controller_1.default.deleteUserById);
userRouter.post('/login', user_controller_1.default.loginUser);
exports.default = userRouter;
