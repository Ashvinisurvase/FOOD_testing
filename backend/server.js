import  express  from "express";
import cors from "cors"
import { connectDB } from "./Config/db.js";
import foodRouter from "./Routes/foodRout.js";
import userRouter from "./Routes/userRout.js";

import 'dotenv/config'
import cartRouter from "./Routes/cartRout.js";
import orderRouter from "./Routes/orderRoute.js";

// app config

const app = express()
const port = 4000

// middlewear

app.use(express.json())
app.use(cors())

// db connection

connectDB();

// API endpoint

app.use("/api/food", foodRouter)
app.use("/images", express.static('Uploades'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)


app.get("/", (req, res)=>{
res.send("API Working")

})

app.listen(port, ()=>{
    console.log(`Server Started on http://localhost:${port}`)
})



