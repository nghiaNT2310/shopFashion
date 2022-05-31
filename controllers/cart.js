const Cart=require('../models/cart')
const Product=require('../models/Product')
const Order=require('../models/Order')
class cartController {
 
    storeOrder(req,res,next){
        Cart.findOne({userId: req.session.user})
        .populate('products')
        .then((tcart)=>{
            let leng=(tcart.products).length,check=true
            let pro=tcart.products,num=req.body.quantity,col=tcart.color,siz=tcart.size
            let news=[]
            for(var i=0;i<leng;i++){
                console.log(num[i])
                var sc=siz[i]+col[i]
                var y
                switch(sc){
                    case 'MĐen': y=pro[i].quantityDM; break;
                    case 'LĐen': y=pro[i].quantityDL; break;
                    case 'XLĐen': y=pro[i].quantityDXL; break;
                    case 'MTrắng': y=pro[i].quantityTM; break;
                    case 'LTrắng': y=pro[i].quantityTL; break;
                    case 'XLTrắng': y=pro[i].quantityTXL; break;
                }
                console.log('add')
                console.log('mang ')
                console.log(req.body.quantity)
                console.log(num[i])
                console.log(y)
                console.log(num[i]>y)
                if(typeof req.body.quantity !='string'){
                if(num[i]>y) {
                    check=false;
                    break;
                } else news.push(y-num[i])
            }else {
                if(num>y) {
                    check=false;
                    break;
                } else news.push(y-num)
            }
            }
            if(check==false) res.render('cart',{
                notice: "Đặt hàng không thành công do không đủ sản phẩm",
                cart:tcart,
                user:req.session.user
            })
            else {
                for(var i=0;i<leng;i++){
                    var sc=siz[i]+col[i]
                   console.log(news[i])
                    switch(sc){
                        case 'MĐen': Product.findByIdAndUpdate((tcart.products)[i]._id,{
                            quantityDM: news[i]
                        },(err)=>{
                            console.log('la'+num[i])
                            console.log('davao')
                        }); break;
                        case 'LĐen': Product.findByIdAndUpdate((tcart.products)[i]._id,{
                            quantityDL: (pro[i].quantityDL-num[i])
                        },()=>{
                            console.log('davao')
                        }); break;
                        case 'XLĐen': Product.findByIdAndUpdate((tcart.products)[i]._id,{
                            quantityDXL: (pro[i].quantityDXL-num[i])
                        },()=>{
                            console.log('davao')
                        }); break;
                        case 'MTrắng': Product.findByIdAndUpdate((tcart.products)[i]._id,{
                            quantityTM: (pro[i].quantityTM-num[i])
                        },()=>{
                            console.log('davao')
                        }); break;
                        case 'LTrắng': Product.findByIdAndUpdate((tcart.products)[i]._id,{
                            quantityTL: (pro[i].quantityTL-num[i])
                        },()=>{
                            console.log('davao')
                        }); break;
                        case 'XLTrắng':Product.findByIdAndUpdate((tcart.products)[i]._id,{
                            quantityTXL: (pro[i].quantityTXL-num[i])
                        },()=>{
                            console.log('davao')
                        }); break;
                    }
                    
                }
              
                Order.count({}, function(err, count){
                    console.log('day ne')
                    console.log(count+1)
                    Order.create({
                        userId:tcart.userId,
                        products:tcart.products,
                        size:tcart.size,
                        color: tcart.color,
                        number:req.body.quantity,
                        name:req.body.name,
                        address: req.body.address,
                        phoneNumber: req.body.phonenumber,
                        totalMoney: req.body.totalMoney,
                        code:count+1
                    },(err,ord)=>{
                        if(err) res.render('cart',{
                            notice: "Đặt hàng không thành công",
                            cart:tcart,
                          user:req.session.user
                        })
                        else {
                            Cart.findOneAndUpdate({userId: req.session.user},{
                                products:[],
                                size:[],
                                color:[],
                                number:[]
                            },(err,crt)=>{
                                console.log('day la don hang')
                                console.log(ord)
                                res.redirect('/user/order/'+ord._id)
                                
                            })
                        }
                    })
                });
            }
        })
        .catch(next)
    }

    deleteProductInCart(req,res,next){
       
        Cart.findOne({userId: req.session.user},(err,thisCart)=>{
            let newproducts=thisCart.products;
            let newsize=thisCart.size
            let newcolor=thisCart.color
            let newnumber=thisCart.number
            let index=new Number(req.params.index)
            
            newproducts.splice(index,1)
            newsize.splice(index,1)
            newcolor.splice(index,1)
            newnumber.splice(index,1)
            Cart.findOneAndUpdate({userId:req.session.user},{
                products: newproducts,
                size: newsize,
                color: newcolor,
                number: newnumber,
            },(err,theCart)=>{
                res.redirect('/user/cart')
            })
            
        })
    }

    getCart(req,res,next){
        Cart.findOne({userId: req.session.user})
        .populate('products')
        .then((cart)=>{
            res.render('cart',{
                cart,
                user:req.session.user,
                notice:null
            });
        })
        .catch(next)
    }

    addCart(req,res){
        
        Cart.findOne({userId: req.session.user},(err,thisCart)=>{
            
            let newproducts=thisCart.products;
            let newsize=thisCart.size
            let newcolor=thisCart.color
            let newnumber=thisCart.number
            let check=true;
            let i;
            for(i=0;i<newproducts.length;i++){
              
                if(req.params.sp==newproducts[i] && req.body.color==newcolor[i]
                    && req.body.size==newsize[i]) {
                        check=false; break
                    }
            }
            
            if(check){
            newproducts.push(req.params.sp);
            newsize.push(req.body.size);
            newcolor.push(req.body.color);
            newnumber.push('1');
            }else{
                let x=Number(newnumber[i])
                newnumber[i]= x+1    
            }
            
           Product.findById(req.params.sp,(err,detailProduct)=>{
            var sc=req.body.size+req.body.color
            var y
            switch(sc){
                case 'MĐen': y=detailProduct.quantityDM; break;
                case 'LĐen': y=detailProduct.quantityDL; break;
                case 'XLĐen': y=detailProduct.quantityDXL; break;
                case 'MTrắng': y=detailProduct.quantityTM; break;
                case 'LTrắng': y=detailProduct.quantityTL; break;
                case 'XLTrắng': y=detailProduct.quantityTXL; break;
            }
            if(newnumber[i]<=y){
            Cart.findOneAndUpdate({userId:req.session.user},{
                products: newproducts,
                size: newsize,
                color: newcolor,
                number: newnumber,
            },(err,theCart)=>{
                if(err) res.render('productDetail',{
                    detailProduct,
                    user:req.session.user,
                    notice:"Lỗi: không thể thêm sản phẩm vào giỏ hàng"
                })
                else res.render('productDetail',{
                    detailProduct,
                    user:req.session.user,
                    notice:"Thêm thành công"
                })
            })
        }else{
            res.render('productDetail',{
                detailProduct,
                user:req.session.user,
                notice:"Không đủ sản phẩm"
            })
        }
           })
        })
    }

   
}

module.exports = new cartController();