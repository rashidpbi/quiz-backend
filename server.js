import express from "express"
import { config } from "dotenv";
import connect from "./db/conn.js";
import morgan from "morgan";
import cors from "cors"

import router from '../server/router/router.js'

config()

const app = express()


app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())


const port = process.env.PORT 

app.use('/api',router)

app.get('/',(req,res)=>{
    try{
        res.json("get request")
    }catch(err){
        res.json(err) 
    }
})



connect().then(()=>{
    app.listen(port,()=>{
        console.log(`server connected to localhost:${port}`)

    }
    )
}).catch(err=>{
    console.log("invalid db connection with error: ",err)
})
