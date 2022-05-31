const Order=require('../models/Order')

class adminOrderController {
    orderManage(req, res) {
        
        Order.find({},(err,orders)=>{
            console.log(orders)
            orders= orders.sort((o1,o2)=>{
                if (o1.createAt > o2.createAt){
                    return -1;
                }
                else {
                    return 0;
                }
             })
            res.render('orderManager',{
                orders
            })
        })
    }

    orderDetail(req, res,next) {
        Order.findById(req.params.id).populate('products')
        .then((order)=>{
            console.log(order)
            res.render('orderDetail',{
                order
            })
        })
        .catch(next) 
    }

    updateOrder(req,res,next){
        console.log(req.query)
        Order.findByIdAndUpdate(req.params.id,{
            status: req.query.status
        },(err,order)=>{
            res.redirect('/admin/order/detail/'+req.params.id)
        })
    }
}

module.exports=new adminOrderController();