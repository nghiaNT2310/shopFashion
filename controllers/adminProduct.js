const path=require('path')
const Product=require('../models/Product');


class adminProductController{
    productManage(req, res) {
        Product.find({},(err,product)=>{
            res.render('productManager',{
                product
            });
        })
    }

    detailProduct(req,res){
        
        Product.findById(req.params.id,(err,product)=>{
            res.render('updateProduct',{
                product
            })
        })
    }


    updateProduct(req,res){
        
         let image1=null
         let image2=null
         let image3=null
         let image4=null
         if(req.files != null){
          image1=req.files.img1;
          image2=req.files.img2;
          image3=req.files.img3;
          image4=req.files.img4;
         }
         let url=path.resolve(__dirname)
         url=url.replace('\\controllers','\\public\\upload')
        if(image1 !=null) image1.mv(path.resolve(url,image1.name))
        if(image2 !=null) image2.mv(path.resolve(url,image2.name))
        if(image3 !=null) image3.mv(path.resolve(url,image3.name))
        if(image4 !=null) image4.mv(path.resolve(url,image4.name))

        let product={
            name: req.body.name,
            code:req.body.code,
            type:req.body.type,
            quantityDM:req.body.quantityDM,
            quantityDL:req.body.quantityDL,
            quantityDXL:req.body.quantityDXL,
            quantityTM:req.body.quantityTM,
            quantityTL:req.body.quantityTL,
            quantityTXL:req.body.quantityTXL,
            price: req.body.price,
            discount: req.body.discount
        }
        if(image1!=null) product.image1 = '/upload/'+image1.name;
        if(image2!=null) product.image2 = '/upload/'+image2.name;
        if(image3!=null) product.image3 = '/upload/'+image3.name;
        if(image4!=null) product.image4 = '/upload/'+image4.name;
        console.log(product)
        Product.findByIdAndUpdate(req.params.id,product,(err,product)=>{
            Product.findById(req.params.id,(err,product)=>{
                res.render('updateProduct',{
                    product
                })
                
            })
           
            
        })
    }

    create(req, res) {
        res.render('addProduct',{
            notice: null
        });
    }

   
    StoreProduct(req,res){  
       
        let image1=req.files.img1;
        let image2=req.files.img2;
        let image3=req.files.img3;
        let image4=req.files.img4;
        console.log('day la')
        
        let url=path.resolve(__dirname)
        url=url.replace('\\controllers','\\public\\upload')
        
        image1.mv(path.resolve(url,image1.name))
        image2.mv(path.resolve(url,image2.name))
        image3.mv(path.resolve(url,image3.name))
        image4.mv(path.resolve(url,image4.name),function(err){
           Product.create({
               ...req.body,
               image1:'/upload/'+image1.name,
               image2:'/upload/'+image2.name,
               image3:'/upload/'+image3.name,
               image4:'/upload/'+image4.name,    
           },function (err){
               if(err){
                   return res.render('addProduct',{
                    notice: "Đã thêm sản phẩm không thành công"
                });
               }
               res.render('addProduct',{
                notice: "Đã thêm sản phẩm thành công"
            });
           } )
        })  
   }
    deleteProduct(req,res){
        Product.findByIdAndDelete(req.params.id,(err,product)=>{
            console.log(product);
            res.redirect('/admin/product')
        })
    }
    
}

module.exports=new adminProductController();