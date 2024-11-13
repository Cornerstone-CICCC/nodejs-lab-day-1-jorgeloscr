import {Request, Response } from 'express'
import userModel from '../models/user.model'
import { User } from '../types/user'
import { compareHash, hashed } from '../utils/hash.utils'


const getUsers = (req:Request,res:Response)=>{
    const users = userModel.findAll()
    res.json(users)
}


const getUserById = (req:Request<{id:string}>,res:Response)=>{
    const {id} = req.params
    const user = userModel.findById(id)
    if(!user){
        res.status(404).json({message:'user not found'})
        return
    }
    res.json(user)

}


const addUser =async(req:Request<{},{},User>, res: Response)=>{
    const {username, email, password} =req.body
    const hashedPassword= await hashed(password)
    const user= userModel.createUser({username,email,password:hashedPassword})
    res.status(201).json(user)
}

//update user by id
const updateUserById = (req:Request<{id: string},{},User>,res:Response)=>{
    const {id}=req.params
    const{username, email}= req.body
    const user = userModel.editUser(id,{username, email})
    if((!user)){
        res.status(404).json({message:"User not found"})
        return
    }
    res.status(200).json(user)
}

//Delete user
    const deleteUserById= (req:Request<{id:string}>,res:Response)=>{
        const {id}= req.params
        const isDeleted = userModel.deleteUser(id)
        if(!isDeleted){
            res.status(404).json({message:'user not found'})
            return
        }
        res.status(200).json({message:'Deleted'})
    }

    //Login User

    const loginUser=async (req:Request <{},{},User>,res:Response)=>{
        const {username,password}=req.body  
        const user = userModel.findByUsername(username)
        if(!user){
            res.status(404).json({message:'user not found'})
            return
        }
        const isMatch = await compareHash(password,user.password)
        if(!isMatch){
            res.status(401).json({message:"Password it's incorrect"})
            return
        }
        
            res.cookie('isAuthenticated',true,{
                httpOnly:true,
                maxAge: 3 *60*1000,
                signed: true
            })
            res.cookie('userId',user.id,{
                httpOnly:true,
                maxAge: 3*60 *1000,
                signed: true
            })
            res.status(200).json({message:"authenticatied"})
            
        }
        
    

export default {
    getUsers,
    addUser,
    getUserById,
    updateUserById,
    deleteUserById,
    loginUser

}