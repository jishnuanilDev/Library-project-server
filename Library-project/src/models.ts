import mongoose from "mongoose";


const {Schema, model} = mongoose

const bookSchema = new Schema({
   title:{ type: String, required: true },
   author:{ type: String, required: true },
   isbn:{ type: String, unique: true }
})


const memberSchema = new Schema({
    name:{ type: String, required: true },
    memberId:{ type: String, unique: true },
    borrowBooks:[{type:Schema.Types.ObjectId,ref:'Book'}]
})


export interface IBook extends mongoose.Document {
    title: string;
    author: string;
    isbn: string;
}

export interface IMember extends mongoose.Document {
    name:string;
    memberId:string;
    borrowBooks:mongoose.Types.ObjectId[]
}

export const Book = model<IBook>('Book',bookSchema);
export const Member = model<IMember>('Member',memberSchema);