import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    hide: {
      type: Boolean,
      default: false,
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref : "brand",
      default: "No brand",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      default: "660d72178414e74a3907abdd",
      ref: "Category",
    },
    thumbnail: {
      type: String,
      default: "",
    },
    images: {
      type : mongoose.Schema.Types.ObjectId,
      ref : "images",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
