import express from "express"
import { baseMemberController, premiumMember, BookController } from "./contollers"
import { title } from "process";

const router = express.Router();

const bookController = new BookController();
const memberController = new baseMemberController();
const premiumMemberController = new premiumMember();

router.get('/books', async (req, res) => {
    try {
        const books = await bookController.getBooks();
        if (books && books.length > 0) {
            res.status(201).json({ books });
        } else {
            res.status(404).json({ message: 'No Books available' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.post('/myBooks', async (req, res) => {

    try {
        console.log('heyyyy ivde bakend ethi');
        const {memberId} = req.body;
        const books = await bookController.getBorrowedBooks(memberId);

        if (books && books.length > 0) {
              console.log('booksKittida',books)
            res.status(201).json({ books });
        } else {
            res.status(404).json({ message: 'No Books available' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.get('/members', async (req, res) => {
    try {
        const members = await memberController.allMembers();
        if (members && members.length > 0) {
            res.status(201).json({ members });
        } else {
            res.status(404).json({ message: 'No members available' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.post('/books',async(req,res)=>{
    console.log('passed in /books');
    const{title, author, isbn} = req.body;
const book = await bookController.addBook(title, author, isbn);
res.status(201).send(book);
})

router.post('/members',async(req,res)=>{
    const {name, memberId} = req.body;
 
    const member = await memberController.addMember(name,memberId);
    res.status(201).send(member)
})


router.post('/borrow',async (req,res)=>{
    const {memberId,isbn,premium} = req.body;
    const message = premium ?  await premiumMemberController.borrowBooks(memberId,isbn): await memberController.borrowBook(memberId,isbn);
    if(message!=null){
res.status(201).json({res:true})
    }
});


router.post('/return',async (req,res)=>{
    const {memberId, isbn, premium} = req.body;
    const message = premium? await premiumMemberController.returnBook(memberId,isbn):await memberController.returnBook(memberId,isbn);
    if(message!=null){
        res.status(201).json({res:true})
            }

})

export default router;