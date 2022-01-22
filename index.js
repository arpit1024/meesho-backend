const mongoose = require("mongoose");
const express = require("express");
const app = express();
const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    user: {
      //Act as seller of the product
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    image_urls: [{ type: String, required: true }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const Product = model("product", productSchema);
app.use(express.json());

app.get("/getProducts", async (req, res) => {
  const products = await Product.find().lean().exec();

  return res.send(products);
});
app.get("/getProducts/:id", async (req, res) => {
  const products = await Product.findOne({ id: req.params._id }).lean().exec();

  return res.send(products);
});
app.get("/", async (req, res) => {
  return res.send("HELLO FROM SERVER");
});
app.listen(2345, async function () {
  await mongoose
    .connect(
      "mongodb+srv://arpit321:test123@cluster0.epnav.mongodb.net/mydemoapp?retryWrites=true&w=majority",
      { useNewUrlParser: true }
    )
    .then(() => {
      console.log("connection success");
    })
    .catch((err) => {
      console.log(err);
    });
  console.log("listening on port 2345");
});
