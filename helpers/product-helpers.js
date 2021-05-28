var db = require("../config/connection");
var collection =require("../config/collection");
const { ObjectId } = require("mongodb");
const { response } = require("express");
module.exports = {
  addProduct: (product, callback) => {
    console.log(product);
    db.get().collection("product").insertOne(product).then((data) => {
        callback(data.ops[0]._id);
      });
    // .catch((err)=>{
    //console.log(err)
    // })
  //},
},
getAllProducts:()=>{
  return new Promise(async(resolve,reject)=>{
    let products=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
    resolve(products)
  })
},
deleteProduct:(prodId)=>{
  return new Promise((resolve,reject)=>{
    db.get().collection(collection.PRODUCT_COLLECTION).removeOne({_id:ObjectId(prodId)}).then((response)=>{
      console.log(response)
      resolve(response)
    })
  })             

},
getProductDetails:(id)=>{
  return new Promise((resolve,reject)=>{
    db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:ObjectId(id)}).then((product)=>{
      resolve(product)
    })
  })
},
updateProduct:(proId,proDetails)=>{
  return new Promise((resolve,reject)=>{
    db.get().collection(collection.PRODUCT_COLLECTION).updateOne({_id:ObjectId(proId)},
    {
      $set:{
        Name:proDetails.Name,
        Description:proDetails.Description,
        Price:proDetails.Price,
        Category:proDetails.Category
      }
    }).then((response)=>{
      resolve()
    })

  })
}

}

