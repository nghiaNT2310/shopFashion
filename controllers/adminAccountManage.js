const User=require('../models/User');
const Order=require('../models/Order')
class adminAccountManageController {

    index(req, res) {
        User.find({},(err,accounts)=>{
            res.render('accountManager',{
                accounts
            })
        })
    }


    unlock(req,res){
        User.findByIdAndUpdate(req.params.id,{
            lock: 0
        },(err,profileAccount)=>{
            User.findById(req.params.id,(err,profileAccount)=>{
                res.redirect('/admin/account/profile/'+req.params.id)
            })
        })
    }

    back(req,res){
        User.find({},(err,accounts)=>{
            res.redirect('/admin/account')
        })
    }

    profile(req, res) {
        User.findById(req.params.id,(err,profileAccount)=>{
            if(err) res.redirect('/admin/account')
            else{
                const date=new Date()
                if(date>=profileAccount.TimeEndLock){
                    User.findByIdAndUpdate(req.params.id,{
                        lock:0,
                    },(err,profileAccount)=>{
                        User.findById(req.params.id,(err,profileAccount)=>{
                            Order.find({userId: profileAccount._id},(err,orders)=>{
                                console.log(orders)
                                orders= orders.sort((o1,o2)=>{
                                    if (o1.createAt > o2.createAt){
                                        return -1;
                                    }
                                    else {
                                        return 0;
                                    }
                                 })
                                res.render('profileAdminView',{
                                    profileAccount,
                                    orders
                                })
                            })
                        })
                    })
                }
                else{
                    Order.find({userId: profileAccount._id},(err,orders)=>{
                        console.log(orders)
                        orders= orders.sort((o1,o2)=>{
                            if (o1.createAt > o2.createAt){
                                return -1;
                            }
                            else {
                                return 0;
                            }
                         })
                        res.render('profileAdminView',{
                            profileAccount,
                            orders
                        })
                    })
                }
            }
        })
    }

    lock(req,res){
         if(req.params.value != '-1'){
             let date=new Date();
             let count=Number(req.params.value)
             date.setDate(date.getDate()+count)
             console.log(date)
            User.findByIdAndUpdate(req.params.id,{
                lock:1,
                TimeEndLock: date 
            },(err,profileAccount)=>{
                User.findById(req.params.id,(err,profileAccount)=>{
                    if(err) res.redirect('/admin/account/profile/'+req.params.id)
                    else{
                        res.redirect('/admin/account/profile/'+req.params.id)
                        
                    }
                })
            })
         }else{
            User.findByIdAndUpdate(req.params.id,{
                lock:-1,
            },(err,profileAccount)=>{
                User.findById(req.params.id,(err,profileAccount)=>{
                    if(err) res.redirect('/admin/account')
                    else{
                        res.redirect('/admin/account/profile/'+req.params.id)
                    }
                })
            })
         }
    
    }
}

module.exports = new adminAccountManageController();