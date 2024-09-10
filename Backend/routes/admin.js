const express = require("express");

const router = express.Router();

const adminControllers = require("../controllers/admin");

router.get("/allproducts", adminControllers.getAllProducts);

router.post("/addproduct", adminControllers.PostAddProduct);

router.post("/image", adminControllers.PostUploadImage);

router.post("/product", adminControllers.postSingleProduct);

router.post("/deleteproduct", adminControllers.PostDeleteProduct);

router.post("/addproduct/:productId", adminControllers.postUpdateProduct);

// router.post('/update')

module.exports = router;
