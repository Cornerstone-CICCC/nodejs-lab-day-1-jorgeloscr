"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const hash_utils_1 = require("../utils/hash.utils");
const getUsers = (req, res) => {
    const users = user_model_1.default.findAll();
    res.json(users);
};
const getUserById = (req, res) => {
    const { id } = req.params;
    const user = user_model_1.default.findById(id);
    if (!user) {
        res.status(404).json({ message: 'user not found' });
        return;
    }
    res.json(user);
};
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const hashedPassword = yield (0, hash_utils_1.hashed)(password);
    const user = user_model_1.default.createUser({ username, email, password: hashedPassword });
    res.status(201).json(user);
});
//update user by id
const updateUserById = (req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;
    const user = user_model_1.default.editUser(id, { username, email });
    if ((!user)) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    res.status(200).json(user);
};
//Delete user
const deleteUserById = (req, res) => {
    const { id } = req.params;
    const isDeleted = user_model_1.default.deleteUser(id);
    if (!isDeleted) {
        res.status(404).json({ message: 'user not found' });
        return;
    }
    res.status(200).json({ message: 'Deleted' });
};
//Login User
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = user_model_1.default.findByUsername(username);
    if (!user) {
        res.status(404).json({ message: 'user not found' });
        return;
    }
    const isMatch = yield (0, hash_utils_1.compareHash)(password, user.password);
    if (!isMatch) {
        res.status(401).json({ message: "Password it's incorrect" });
        return;
    }
    res.cookie('isAuthenticated', true, {
        httpOnly: true,
        maxAge: 3 * 60 * 1000,
        signed: true
    });
    res.cookie('userId', user.id, {
        httpOnly: true,
        maxAge: 3 * 60 * 1000,
        signed: true
    });
    res.status(200).json({ message: "authenticatied" });
});
exports.default = {
    getUsers,
    addUser,
    getUserById,
    updateUserById,
    deleteUserById,
    loginUser
};
