import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'
import aiRouter from "./routes/aiRoute.js";
import contactRouter from "./routes/contactRoute.js";
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const publicDir = path.join(__dirname, 'public')

// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middleware
app.use(express.json())
app.use(cors())
app.use(express.static(publicDir))

// api endpoint
app.use('/api/admin', adminRouter)

app.use('/api/doctor', doctorRouter)

app.use('/api/user', userRouter)

app.use("/api/ai", aiRouter);

app.use("/api/contact", contactRouter);

app.get("*name", (_req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'))
})

app.listen(port, ()=>{
    console.log('server started.')
})

