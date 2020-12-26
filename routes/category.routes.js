const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/category.controller');

// Create new category
router.post('/', (req, res) => {
  CategoryController.create(req.body, (err, result) => {
    if (err) {
      res.status(500).json({
        confirmation: false,
        message: err.message
      });
      return;
    }

    res.status(201).json({
      confirmation: true,
      data: result
    })
  })
})

// Get one category
router.get('/:id', (req, res) => {
  CategoryController.findById(req.params.id, (err, category) => {
    if (err) {
      res.status(500).json({
        confirmation: false,
        message: err.message
      });
      return;
    }
    if (!category) {
      res.status(404).json({
        confirmation: false,
        message: 'category not found'
      })
      return;
    }
    res.json({
      confirmation: true,
      category
    })
  })
})

// Get all categorys
router.get('/', (req, res) => {
  CategoryController.find({}, (err, categories) => {
    if (err) {
      res.status(500).json({
        confirmation: false,
        message: err.message
      });
      return;
    }

    res.status(200).json({
      confirmation: true,
      categories
    })
  })
})

// Update category
router.put('/:id', (req, res) => {
  CategoryController.update(req.params.id, req.body, (err, category) => {
    if (err) {
      res.status(500).json({
        confirmation: false,
        message: err.message
      });
      return;
    }

    res.status(200).json({
      confirmation: true,
      category: category
    })
  })
})

router.delete('/:id', (req, res) => {
  CategoryController.delete(req.params.id, (err, category) => {
    if (err) {
      res.status(500).json({
        confirmation: false,
        message: err.message
      });
      return;
    }

    res.status(200).json({
      confirmation: true,
      category
    })
  })
})

module.exports = router;
