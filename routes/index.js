const userAccountRouter = require('./userAccount');
const homeRouter = require('./home');
const adminAccountRouter = require('./adminAccount');
const adminProductRouter=require('./adminProduct');
const adminOrderRouter=require('./adminOrder');
const adminLoginMiddleware=require('../middleware/adminLoginMiddleware');
const adminAccountManageRouter=require('./adminAccountManage');

function route(app) {
    app.use('/admin/order',adminLoginMiddleware, adminOrderRouter);
    app.use('/admin/account',adminLoginMiddleware, adminAccountManageRouter);
    app.use('/admin/product',adminLoginMiddleware, adminProductRouter);
    app.use('/admin', adminAccountRouter);
    app.use('/user', userAccountRouter);
    app.use('/', homeRouter);
}

module.exports = route;
