const express = require('express');
const adminOrderController = require('../controllers/adminOrder');
const router = express.Router();

router.get("/update/:id", adminOrderController.updateOrder)
router.get("/detail/:id", adminOrderController.orderDetail)
router.get("/", adminOrderController.orderManage)

module.exports = router;