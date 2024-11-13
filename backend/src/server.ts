import express,{Request, Response} from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/user.routes"
import dotenv from "dotenv"

dotenv.config()

const app = express()

// middleware

app.use(cors({
    origin: 'http://localhost:4322',
    credentials:true
}))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SIGN_KEY))

// routes
app.use('/api/users', userRouter)

app.use((req:Request,res:Response)=>{
    res.status(404).send('Invalid route')
})
const PORT: number=Number(process.env.PORT || 4000)

app.listen(PORT,()=>{
    console.log(`Server running in port ${PORT}`)
})