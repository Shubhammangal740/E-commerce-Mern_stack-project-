const Product = require("../models/product");
const mongoose = require("mongoose");

exports.PostAddProduct = (req, res, next) => {
  const name = req.body.name;
  const image = req.body.image;
  const category = req.body.category;
  const old_price = req.body.old_price;
  const new_price = req.body.new_price;
  try {
    const product = new Product({
      name: name,
      image: image,
      category: category,
      old_price: old_price,
      new_price: new_price,
    });
    product.save().then((result) => {
      res.json({
        message: "Product Save Successfully",
        data: result,
      });
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.PostUploadImage = (req, res, next) => {
  try {
    res.json({
      message: "File Uploaded",
      imageUrl: `https://cloth-store-backend-kruy.onrender.com/images/${req.file.filename}`,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAllProducts = (req, res, next) => {
  try {
    Product.find({}).then((product) => {
      if (!product) {
        const error = new Error("Product Not Found!");
        error.statusCode = 404;
        throw error;
      }
      res.json({
        message: "Product Fetched successfully",
        data: product,
      });
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.PostDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  try {
    Product.findByIdAndDelete({ _id: productId }).then((product) => {
      if (!product) {
        const error = new Error("Product Not Found!");
        error.statusCode = 404;
        throw error;
      }

      res.json({
        message: "Product Deleted",
      });
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postUpdateProduct = (req, res, next) => {
  const id = req.params.productId;
  const updateName = req.body.name;
  const updateCategory = req.body.category;
  const update_old_price = req.body.old_price;
  const update_new_price = req.body.new_price;
  let updateImage;

  const productId = new mongoose.Types.ObjectId(id);
  try {
    if (req.body.image) {
      updateImage = req.body.image;
    }

    Product.findById({ _id: productId })
      .then((product) => {
        if (!product) {
          const error = new Error("Product Not Found!");
          error.statusCode = 404;
          throw error;
        }
        if (updateName) {
          product.name = updateName;
        }
        if (updateCategory) {
          product.category = updateCategory;
        }
        if (update_old_price) {
          product.old_price = update_old_price;
        }
        if (update_new_price) {
          product.new_price = update_new_price;
        }
        if (updateImage) {
          product.image = updateImage;
        }
        return product.save();
      })
      .then((updateProduct) => {
        res.json({
          message: "Product Updated Successfully",
          data: updateProduct,
        });
      });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postSingleProduct = (req, res, next) => {
  const id = req.body.productId;
  const productId = new mongoose.Types.ObjectId(id);
  try {
    Product.findById({ _id: productId }).then((product) => {
      if (!product) {
        const error = new Error("Product Not Found!");
        error.statusCode = 404;
        throw error;
      }
      res.json({
        message: "product Fetched successfully",
        data: product,
      });
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
