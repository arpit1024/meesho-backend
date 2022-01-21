const express = require("express");

const Product = require("../models/product.model");

const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    const user = req.user;

    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      image_urls: ["www.google.com"],
      user: user.user, //act as seller
    });

    return res.status(201).json({ product });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

router.patch("/:id", authenticate, async (req, res) => {
  try {
    const user = req.user;
    const product=await Product.findById(req.params.id);

    if(product.user == user.user._id)
    {
      const newPro=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
         return res.status(201).json(newPro);
    }else
    {
      return res.status(201).json("You cant update this Product");
    }
    return res.status(201).json({ product });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    const user = req.user;
    const product=await Product.findById(req.params.id);

    if(product.user == user.user._id)
    {
      const newPro=await Product.findByIdAndDelete(req.params.id,req.body);
         return res.status(201).json(newPro);
    }else
    {
      return res.status(201).json("You cant Delete this Product");
    }
    return res.status(201).json({ product });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

router.get("/", async (req, res) => {
  const products = await Product.find().lean().exec();

  return res.send(products);
});

module.exports = router;
