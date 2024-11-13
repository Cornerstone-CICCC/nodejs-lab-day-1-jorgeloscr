"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class UserModel {
    constructor() {
        this.users = [];
    }
    // get all users
    findAll() {
        return this.users;
    }
    //Get user by id
    findById(id) {
        const user = this.users.find(user => user.id === id);
        if (!user)
            return undefined;
        return user;
    }
    //get user by nemae           this is for verification not part of the crud
    findByUsername(username) {
        const user = this.users.find(user => user.username === username);
        if (user) {
            return user;
        }
        return undefined;
    }
    // Get user  this is for verification not part of the crud
    //create user
    createUser(newUser) {
        const user = Object.assign({ id: (0, uuid_1.v4)() }, newUser);
        this.users.push(user);
        return user;
    }
    //Edit User
    editUser(id, newData) {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1) {
            return undefined;
        }
        const updatedUser = Object.assign(Object.assign({}, this.users[index]), newData);
        this.users[index] = updatedUser;
        return updatedUser;
    }
    //deleteuser
    deleteUser(id) {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1)
            return false;
        this.users.splice(index, 1);
        return true;
    }
}
exports.default = new UserModel;
