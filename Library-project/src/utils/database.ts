import mongoose from "mongoose";

class Database {
    
    private mongoUrl:string;

    constructor(mongoUrl:string){
        this.mongoUrl = mongoUrl;
    }


    async connect():promise<void>{
        try{
            await mongoose.connect('this.mongoUrl');
            console.log('MongoDB connected succesfully')
        }catch(err){
            console.log("error connecting mongoDB",err);
            throw err;
        }
      
        
    }
}

export default Database