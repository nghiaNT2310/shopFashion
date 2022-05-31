const Admin=require('../models/Admin');
const Order=require('../models/Order')
const bcrypt=require('bcrypt')
class adminAccountController {
    login(req, res) {
        res.render('adminLogin');
    }
    validateLogin(req, res) {
        Admin.findOne({username: req.body.username}, (err,admin) => {

            if(admin) {
                bcrypt.compare(req.body.password,admin.password,(err,same)=>{
                    if(same){
                        req.session.admin=admin;
                        // 
                        res.redirect('/admin/order')
                    }else{
                        res.render('adminLogin', {
                            wrongAccount: true
                        });
                    }
                })
                 

            }
            else {
                res.render('adminLogin', {
                    wrongAccount: true
                });
            }

        })
    }

    changePassword(req, res){
        res.render('changePasswordAdmin',{
            notice: null,
            check: null
        });
    }
    storeNewPassword(req,res){
        Admin.findOne({username: req.session.admin.username},(err,admin)=>{
            bcrypt.compare(req.body.currentPassword,admin.password,(err,same)=>{
                if(same){
                    bcrypt.hash(req.body.nextPassword,10,(err,hash)=>{
                        Admin.findByIdAndUpdate(admin._id,{
                            password:hash
                        },(err,user)=>{
                            res.render('changePasswordAdmin', {
                                notice: null,
                                check: 'Đã đổi mật khẩu thành công'
                            });
                        })
                    })
                }else{
                    res.render('changePasswordAdmin', {
                        notice: 'Mật khẩu không chính xác',
                        check: null
                    });
                }
            })
        })
    }

    logout(req, res) {
        req.session.destroy(() => {
            res.redirect('/admin');
        })
    }

}

module.exports = new adminAccountController();