const express = require('express');
const userAccountController = require('../controllers/userAccount');
const cartController=require('../controllers/cart')
const userOrderController=require('../controllers/userOrder')
const redirectIfNotAuthMiddleware=require('../middleware/redirectIfNotAuthenticatedMiddleware')
const router = express.Router();

router.post('/changePwd',userAccountController.storeNewPassword)
router.get('/changePwd', userAccountController.changePassword);
router.get('/logout', userAccountController.logout);
router.post('/addOrder',cartController.storeOrder)
router.post('/profile',userAccountController.updateProfile)
router.get('/profile', userAccountController.profile)
router.get('/order/cancel/:id', userOrderController.cancelOrder)
router.get('/order/:id', userOrderController.orderDetail)
router.get('/order', userOrderController.index)
router.get('/cart', cartController.getCart)
router.post('/addCart/:sp',redirectIfNotAuthMiddleware,cartController.addCart)
router.get('/deleteProductInCart/:index',cartController.deleteProductInCart)
module.exports = router;