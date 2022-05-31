const Product=require('../models/Product')

class HomeController {
    index(req, res) {
        Product.find({},(err,products)=>{
            products= products.sort((p1,p2)=>{
                if (p1.createAt > p2.createAt){
                    return -1;
                }
                else {
                    return 0;
                }
             })
            console.log(req.session.user);
            res.render('home',{
                user:req.session.user,
                products
            })
        })
    }
    productList(req,res){
        console.log(req.session);
        Product.find({},(err,products)=>{
            products= products.sort((p1,p2)=>{
                if (p1.createAt > p2.createAt){
                    return -1;
                }
                else {
                    return 0;
                }
             })
            console.log(req.session.user)
            res.render('productList',{
                user:req.session.user,
                products,
                all: true,
                shirt: false,
                pants: false,
                set: false,
                discount: false
            })
        })
        
    }

    shirtList(req,res){
        Product.find({type:'shirt'},(err,products)=>{
            console.log(products);
            products= products.sort((p1,p2)=>{
                if (p1.createAt > p2.createAt){
                    return -1;
                }
                else {
                    return 0;
                }
             })
            res.render('productList',{
                user:req.session.user,
                products,
                all: false,
                shirt: true,
                pants: false,
                set: false,
                discount: false
            })
        })
    }

    pantsList(req,res){
        Product.find({type:'pants'},(err,products)=>{
            console.log(products);
            products= products.sort((p1,p2)=>{
                if (p1.createAt > p2.createAt){
                    return -1;
                }
                else {
                    return 0;
                }
             })
            res.render('productList',{
                user:req.session.user,
                products,
                all: false,
                shirt: false,
                pants: true,
                set: false,
                discount: false
            })
        })
    }

    setList(req,res){
        Product.find({type:'set'},(err,products)=>{
            products= products.sort((p1,p2)=>{
                if (p1.createAt > p2.createAt){
                    return -1;
                }
                else {
                    return 0;
                }
             })
            console.log(products);
            res.render('productList',{
                user:req.session.user,
                products,
                all: false,
                shirt: false,
                pants: false,
                set: true,
                discount: false
            })
        })
    }

    discountList(req,res){
        console.log(req.session);
        Product.find({},(err,products)=>{
            products= products.sort((p1,p2)=>{
                if (p1.createAt > p2.createAt){
                    return -1;
                }
                else {
                    return 0;
                }
             })
            var p=products.filter(function(product){
                return product.discount>0;
            })
            res.render('productList',{
                user:req.session.user,
                products:p,
                all: false,
                shirt: false,
                pants: false,
                set: false,
                discount: true
            })
        })
        
    }

    productDetail(req,res){
        Product.findById(req.params.id,(err,detailProduct)=>{
            res.render('productDetail',{
                detailProduct,
                user:req.session.user,
                notice:null
            })
        })
    }

    sizeTable(req, res){
        res.render('sizeTable' ,{
            user:req.session.user,
        })
    }

    termOfService(req, res){
        res.render('termOfService' ,{
            user:req.session.user,
        })
    }

    returnPolicy(req, res){
        res.render('returnPolicy' ,{
            user:req.session.user,
        })
    }

    privacyPolicy(req, res){
        res.render('privacyPolicy' ,{
            user:req.session.user,
        })
    }
}

module.exports = new HomeController();