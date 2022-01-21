const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    user: {       //Act as seller of the product
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

module.exports = model("product", productSchema);
