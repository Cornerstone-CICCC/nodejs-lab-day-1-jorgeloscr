// any add remove or any function like that goes here
import { User } from "../types/user"
import {v4 as uuidv4} from "uuid"
class UserModel{
    private users: User []=[]
    // get all users
    findAll():User[]{
        return this.users
    }

    //Get user by id
    findById(id:string):User | undefined{
        const user =this.users.find(user=>user.id===id)
        if(!user)return undefined
        return user
    }

    //get user by nemae           this is for verification not part of the crud
    findByUsername(username:string):User | undefined{
        const user= this.users.find(user =>user.username === username)
        if(user) {
            return user
        }
        return undefined
    }

    // Get user  this is for verification not part of the crud

    //create user
    createUser(newUser:Omit<User, "id">):User{
        
        const user= {
            id:uuidv4(),
            ...newUser
        }
        this.users.push(user)
        return user
    }

    //Edit User
    editUser(id:string,newData:Partial<User>){ //Parcial means that it doenst have to include all the values in User
    const index = this.users.findIndex(user =>user.id ===id)
    if(index === -1){
        return undefined
    }
        const updatedUser = {
            ...this.users[index],
            ...newData
        }
        this.users[index]=updatedUser
        return updatedUser
    }

    //deleteuser
    deleteUser(id:string):boolean{
        const index = this.users.findIndex(user => user.id ===id)
        if(index ===-1) return false
        this.users.splice(index,1)
        return true
    }
    }



export default new UserModel