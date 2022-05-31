const User=require('../models/User');
const Product=require('../models/Product')
const Cart=require('../models/cart')
const path=require('path')
const bcrypt=require('bcrypt')

class userAccountController {
    login(req, res) {
        res.render('login',{
            err:null
        });
    }

    changePassword(req, res){
        res.render('changePasswordUser', {
            user: req.session.user,
            notice: null,
            check: null
        });
    }

    storeNewPassword(req,res){
        User.findOne({username: req.session.user.username},(err,user)=>{
            bcrypt.compare(req.body.currentPassword,user.password,(err,same)=>{
                if(same){
                    bcrypt.hash(req.body.nextPassword,10,(err,hash)=>{
                        User.findByIdAndUpdate(user._id,{
                            password:hash
                        },(err,user)=>{
                            res.render('changePasswordUser', {
                                user: req.session.user,
                                notice: null,
                                check: 'Đã đổi mật khẩu thành công'
                            });
                        })
                    })
                }else{
                    res.render('changePasswordUser', {
                        user: req.session.user,
                        notice: 'Mật khẩu không chính xác',
                        check: null
                    });
                }
            })
        })
    }

    validateLogin(req, res) {
        const {username, password}=req.body;
        User.findOne({username: username},(err,user)=>{

            if(user){
                bcrypt.compare(password,user.password,(err,same)=>{
                    if(same){
                        const date=new Date();
                if(user.lock==0||(user.lock==1 && date>=user.TimeEndLock )){
                req.session.user=user;
                Product.find({},(err,products)=>{
                    if(err) res.render('login',{
                        wrongAccount: false,
                    });
                    else{
                        res.redirect('/')
                    }
                })
                }else if(user.lock==1) {
                     let da=user.TimeEndLock 
                    let d= da.getDate()+'/'+(da.getMonth()+1)+'/'+da.getFullYear()+'  '+ da.getHours()+':'+da.getMinutes()+':'+da.getSeconds() 
                    res.render('login', {
                        err:'Tài khoản đã bị khóa đến '+d
                    });
                } else{
                    res.render('login', {
                        err:'Tài khoản đã bị khóa vĩnh viễn'
                    });
                }
                    }else{
                        res.render('login', {
                            err:'Mật khẩu không chính xác'
                        });
                    }
                })
                

            }
            else {
                res.render('login', {
                    err:'Tài khoản không tồn tại'
                });
            }

        })
    }

    register(req, res) {
        res.render('register', {
            existedUser: false,
            newUser: false
        });
    }

    store(req, res) {
        User.create(req.body,(err,user)=>{
            if(err){
                res.render('register', {
                    existedUser: req.body,
                    newUser: false
                });
            }
            else {
                Cart.create({
                    userId: user._id
                },(err,cart)=>{
                    if(err){
                        res.render('register', {
                            existedUser: req.body,
                            newUser: false
                        });
                    }else{
                        res.render('register', {
                            newUser: true,
                            existedUser: false
                        });
                    }
                })
            };
        });
    }

    profile(req, res){
        User.findById(req.session.user,(err,user)=>{
            res.render("profileUserView",{user})
        })
    }

    updateProfile(req,res){
        
        if(req.files != null){
            let image=req.files.image;
            let url=path.resolve(__dirname)
            url=url.replace('\\controllers','\\public\\upload')
            image.mv(path.resolve(url,image.name),(err)=>{
                User.findByIdAndUpdate(req.session.user,{
                 ...req.body,
                 image: '/upload/'+image.name   
                },(err)=>{
                    res.redirect('/user/profile')
                })
            })
        }else{
            User.findByIdAndUpdate(req.session.user,
                req.body  
               ,(err)=>{
                   res.redirect('/user/profile')
               })
        }
    }


    logout(req, res) {
        req.session.destroy(() => {
            res.redirect('/');
        })
    }
}

module.exports = new userAccountController();