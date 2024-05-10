const { request } = require('express')
const Book = require('../models/bookModel')

const bookControllers = {
    create: async (req,res) => {
        try {
            if(
                !req.body.title ||
                !req.body.author ||
                !req.body.publishYear
            ) {
                return res.status(400).send({
                    message: 'Send all required fields'
                })
            }
            const newBook = {
                title: req.body.title,
                author: req.body.author,
                publishYear: req.body.publishYear
            }
            const book = await Book.create(newBook)
            return res.status(201).send(newBook)
        } catch (error) {
            console.log(error)
        }
    },
    getAll: async (req,res) => {
        try {
            const allBooks = await Book.find({})
            res.status(200).send({
                count: allBooks.length,
                data: allBooks
            })
        } catch (error) {
            console.log(error)
            res.status(500).send({message: error.message})
        }
    },
    getById: async (req,res) => {
        try {
            const {id} = req.params
            const searchedBook = await Book.findById(id)
            if(!searchedBook) {
                return res.status(404).send({message: 'Book not found'})
            }
            res.status(200).send(searchedBook)
        } catch (error) {
            console.log(error)
            res.status(500).send({message: error.message})
        }
    },
    updateBook: async (req,res) => {
        try {
            const {id} = req.params
            const updatedBook = await Book.findByIdAndUpdate(id, req.body)
            if(!updatedBook) {
                return res.status(404).send({message: 'Book not found'})
            }
            return res.status(200).send({message: 'Book successfully updated'})
        } catch (error) {
            console.log(error)
            res.status(500).send({message: error.message})
        }
    },
    deleteBook: async (req,res) => {
        try {
            const {id} = req.params
            const deletedBook = await Book.findByIdAndDelete(id)
            if(!deletedBook) {
                return res.status(404).send({message: 'Book not found'})
            }
            return res.status(200).send({item: deletedBook, message: 'Book Successfully deleted'})
        } catch (error) {
            
        }
    }
}

module.exports = bookControllers