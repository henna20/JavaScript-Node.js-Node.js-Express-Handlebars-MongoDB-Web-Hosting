var db = require('../config/connection')
var collection = require('../config/collections');
var objectId = require('mongodb').ObjectID
const { resolve, reject } = require('promise');
const { response } = require('express');
const { ObjectId } = require('mongodb');
module.exports = {
    addProduct: (product, callback) => {
        console.log('product');
        db.get().collection('product').insertOne(product).then((data) => {

            callback(data.insertedId)

        })
    },
    getAllProducts: () => {
        return new Promise(async (resolve, reject) => {
            let products = await db.get().collection(collection.PRODUCT_COLLECTIONS).find().toArray()
            resolve(products)
        })
    },
    deleteProduct: (prodId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PRODUCT_COLLECTIONS).deleteOne({ _id: objectId(prodId) }).then((response) => {
                //console.log(response);
                resolve(response)
            })

        })
    },

    getProductDetails: (prodId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PRODUCT_COLLECTIONS).findOne({ _id: objectId(prodId) }).then((product) => {
                resolve(product)
            })
        })
    },
    updateProduct: (proId, proDetails) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PRODUCT_COLLECTIONS).updateOne({ _id: ObjectId(proId) }, {
                $set: {
                    Name: proDetails.Name,
                    Description: proDetails.Description,
                    Category: proDetails.Category,
                    Price: proDetails.Price,
                }
            }).then((response) => {
                resolve()
            })
        })
    }

}