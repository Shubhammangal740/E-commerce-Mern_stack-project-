const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Product = require("../models/product");
const { default: mongoose } = require("mongoose");
const product = require("../models/product");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

exports.postSignUp = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  try {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        const error = new Error("user already exist!");
        error.statusCode = 401;
        throw error;
      }

      bcrypt.hash(password, 12).then((hashedPassword) => {
        user = new User({
          name: name,
          email: email,
          password: hashedPassword,
          cart: { items: [] },
        });
        user.save().then((user) => {
          res.json({
            message: "user Created Successfully",
            data: user,
          });
        });
      });

      return transporter.sendMail({
        to: email,
        from: "shubhammangal740@gmail.com",
        subject: "Welcome to our app!", // Subject line
        text: "Thank you for registering!", // Plain text body
        html: "<h1>Thank you for registering!</h1>", // HTML body
      });
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.Postlogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    User.findOne({ email: email }).then((user) => {
      if (!user) {
        const error = new Error("User Does Not Exist!");
        error.statusCode = 404;
        throw error;
      }

      bcrypt.compare(password, user.password).then((isEqual) => {
        if (!isEqual) {
          const error = new Error("password is incorrect");
          error.statusCode = 402;
          throw error;
        }
        const token = jwt.sign(
          {
            email: email,
            userId: user._id.toString(),
          },
          "mostSecretmostSecret",
          { expiresIn: "1h" }
        );

        res.json({
          message: "user Logged in successfully",
          token: token,
          userId: user._id.toString(),
        });
      });
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getFetchAllProdducts = (req, res, next) => {
  try {
    Product.find({}).then((products) => {
      if (!products) {
        const error = new Error("does not have any product");
        error.statusCode = 404;
        throw error;
      }
      res.json({
        message: "All Products Fetch Successfully",
        data: products,
      });
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getCategoryProduct = (req, res, nect) => {
  category = req.params.category;
  try {
    Product.find({ category: category }).then((products) => {
      if (!product) {
        const error = new Error("Product Not Found!");
        error.statusCode = 404;
        throw error;
      }
      res.json({
        message: "Category Products Fetched Successfully",
        data: products,
      });
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.PostSingleProduct = (req, res, next) => {
  const productId = req.body.productId;

  const id = new mongoose.Types.ObjectId(productId);
  try {
    Product.findById(id).then((product) => {
      if (!product) {
        const error = new Error("Product Not Found!");
        error.statusCode = 404;
        throw error;
      }
      res.json({
        message: "Single Product Fetched Successfuly",
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

exports.getNewCollection = (req, res, next) => {
  let newCollection;
  try {
    Product.find({}).then((products) => {
      if (!product) {
        const error = new Error("Product Not Found!");
        error.statusCode = 404;
        throw error;
      }
      newCollection = products.slice(1).slice(-8);
      res.json({
        message: "New CollectionData Fetched",
        data: newCollection,
      });
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getPopularSection = (req, res, next) => {
  let popularInWomen;
  try {
    Product.find({ category: "women" }).then((products) => {
      if (!product) {
        const error = new Error("Product Not Found!");
        error.statusCode = 404;
        throw error;
      }
      popularInWomen = products.slice(0, 4);
      res.json({
        message: "Popular Section Fetched Successfully",
        data: popularInWomen,
      });
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = new mongoose.Types.ObjectId(req.userId);
  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("user not found!");
      error.statusCode = 404;
      throw error;
    }

    const itemIndex = user.cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex >= 0) {
      // Update quantity if item exists
      user.cart.items[itemIndex].quantity = quantity;
    } else {
      // Add new item to cart
      user.cart.items.push({ productId, quantity });
    }

    await user.save();
    res.json({ message: "Cart updated successfully", cart: user.cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCartItems = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.userId);
  try {
    const user = await User.findById(userId).populate("cart.items.productId");
    if (!user) {
      const error = new Error("user not found!");
      error.statusCode = 404;
      throw error;
    }

    res.json({ cartItems: user.cart.items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = new mongoose.Types.ObjectId(req.userId);
  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("user not found!");
      error.statusCode = 404;
      throw error;
    }

    const itemIndex = user.cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex >= 0) {
      if (quantity > 0) {
        user.cart.items[itemIndex].quantity = quantity;
      } else {
        user.cart.items.splice(itemIndex, 1);
      }
    } else {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    await user.save();
    res.json({ message: "Cart updated successfully", cart: user.cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.DeleteCartItems = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.userId);
  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("user not found!");
      error.statusCode = 404;
      throw error;
    }

    user.cart.items = [];
    await user.save();

    res.json({ message: "Cart cleared successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRelatedProduct = (req, res, next) => {
  try {
    Product.find({}).then((products) => {
      if (!products) {
        const error = new Error("does not have any product");
        error.statusCode = 404;
        throw error;
      }
      res.json({
        message: "All Products Fetch Successfully",
        data: products.slice(0, 4),
      });
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
