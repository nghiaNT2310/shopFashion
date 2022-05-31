const express = require('express');
const adminProductController = require('../controllers/adminProduct');
const router = express.Router();


router.get('/update/:id',adminProductController.detailProduct)
router.post('/update/:id',adminProductController.updateProduct)
router.get('/delete/:id',adminProductController.deleteProduct)
router.get('/create', adminProductController.create)
router.post('/create',adminProductController.StoreProduct)
router.get('/', adminProductController.productManage);

module.exports = router;