'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller')

router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/admin/:id', controller.getById);
router.get('/tags/:id', controller.getByTag);
router.post('/', controller.put);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete)

module.exports = router;