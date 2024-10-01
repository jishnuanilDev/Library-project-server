import mongoose from "mongoose";

import { Book, Member } from "./models";
import exp from "constants";

class baseMemberController {
  async addMember(name: string, memberId: string) {
    const member = new Member({ name, memberId });
    await member.save();
    return member;
  }

  async findMember(memberId: string) {
    return await Member.findOne({ memberId });
  }


  async allMembers(){
const members = Member.find({});
if(members){
    return members;
}else{
    return 'No Members Found';
}
  }

  async borrowBook(memberId:string,isbn:string){
const member = await Member.findOne({memberId});
const book =await Book.findOne({isbn});

if(book && member){
    member.borrowBooks.push(book.id)
await member.save()
return true;
  }else{
    return null;
  }
}

async returnBook(memberId:string,isbn:string){
const member =await this.findMember(memberId)
const book = await BookController.findBook(isbn);

if(book&&member){
    member.borrowBooks = member.borrowBooks.filter(b=> b.toString()!== book.id.toString());
    await member.save();
    return true;
}else{
    return null;
}

}

}


class premiumMember extends baseMemberController{

    private static max:number = 10;

 async borrowBooks (memberId:string,isbn:string){
const member = await Member.findOne({memberId});
if(member && member.borrowBooks.length >= premiumMember.max){
    return 'Cannot borrow more than 10 books';
}else{
    return super.borrowBook(memberId,isbn)
}
   }
}


class BookController {


    async getBooks(){
const books = await Book.find({})
if(books){
    return books;
}else{
    return 'No Books available'
}
    }



    async getBorrowedBooks(memberId:string){
const member = await Member.findOne({memberId}).populate('borrowBooks');
if(member && member.borrowBooks.length>0){
    console.log('heuuu kittt')
console.log('kittida borrwed',member.borrowBooks);
return member.borrowBooks;
}

    }
 async addBook(title:string,author:string,isbn:string){
const IsBook = await Book.findOne({isbn});
if(!IsBook){
    const book = new Book({title,author,isbn});
    await book.save();
    return book;
}
    }

   static async findBook(isbn:string){
    return await Book.findOne({ isbn });
    }

}


export {baseMemberController, premiumMember, BookController};