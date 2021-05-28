var express = require('express');
var fileUpload=require('express-fileupload');
const productHelpers = require('../helpers/product-helpers');
const userHelpers = require("../helpers/user-helpers");
var router = express.Router();
var productHelper= require('../helpers/product-helpers');
var objectId=require('mongodb').objectId
/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelpers.getAllProducts().then((products)=>{
    console.log(products)
    res.render('admin/view-products',{admin:true,products})
  })
});
router.get('/add-product',function(req,res){
res.render('admin/add-product')
})
router.post('/add-product',(req,res)=>{
  console.log(req.body);
   console.log(req.files.foo);
 productHelpers.addProduct(req.body,(id)=>{
   let image=req.files.foo
   console.log(id)
   image.mv('./public/product-images/'+id+'.jpg',(err,done)=>{
     if(!err){
      res.render("admin/add-product")
     }
     else{
       console.log(err)
     }
   })
   
    
  })
})
router.get('/delete-product/:id',(req,res)=>{
  let proId=req.params.id
  console.log(proId)
  productHelpers.deleteProduct(proId).then((response)=>{
    res.redirect('/admin')
  })
})
router.get('/edit-product/:id',async (req,res)=>{
  let product=await productHelpers.getProductDetails(req.params.id)
  console.log(product)
  res.render('admin/edit-product',{product})
})
router.post('/edit-product/:id',(req,res)=>{
  productHelpers.updateProduct(req.params.id,req.body).then(()=>{
    res.redirect('/admin')
    if(req.files.Image){
      let image=req.files.Image
      let id=req.params.id
      image.mv('./public/product-images/'+id+'.jpg',)
    }
   
  })            
})
/*router.get("/login", (req, res) => {
  if (req.session.admin) {
    res.redirect("/");
  } else 
  {
    res.render("admin/login",{"loginErr":req.session.adminLoginErr});
    req.session.adminLoginErr=false
   
  }
});
router.post("/login", (req, res) => {
  userHelpers.doLoginAdmin(req.body).then((response) => {
    if (response.status) {
      req.session.admin = response.admin;
      req.session.admin.loggedIn = true;
      res.render('admin/view-products')
    } else {
      req.session.adminLoginErr="invalid username or password"
      res.redirect("/login");
    }
  });
});*
*/

module.exports = router;
