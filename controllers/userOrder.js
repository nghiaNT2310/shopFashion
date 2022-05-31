const Order=require('../models/Order')

class userOrderController {
    index(req, res){
    
        Order.find({userId: req.session.user},(err,orders)=>{
            orders= orders.sort((o1,o2)=>{
                if (o1.createAt > o2.createAt){
                    return -1;
                }
                else {
                    return 0;
                }
             })
            console.log(orders)
                res.render("userOrderManager",{
                    orders,
                    user: req.session.user
                });
        })
    }

    orderDetail(req, res,next) {
         Order.findById(req.params.id).populate('products')
        .then((order)=>{
            
            res.render("userOrderDetail",{
                order,
                user: req.session.user
            });
        })
        .catch(next)

    }

    cancelOrder(req,res){
        Order.findByIdAndUpdate(req.params.id,{
            status: "Đã hủy"
        },(err,order)=>{
            res.redirect('/user/order/'+order._id)
        })
    }

}

module.exports=new userOrderController();