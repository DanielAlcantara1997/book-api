const express = require('express')
const router = express.Router()

const {
  create,
  getAll,
  getById,
  updateBook,
  deleteBook
} = require('../controllers/bookControllers')

router.route('/').get(getAll).post(create)
router.route('/:id').get(getById).put(updateBook).delete(deleteBook)

module.exports = router
