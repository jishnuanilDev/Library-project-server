import  express  from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import router from "./routes";
import cors from 'cors'

const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors())


mongoose.connect('mongodb://localhost:27017/library')
.then(()=>console.log('mongodb connected succesfully'))
.catch((err)=> console.error(err));
app.use('/',router)

app.listen(port,()=>{
    console.log(`server running on ${port}`)
})
