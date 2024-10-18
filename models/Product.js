import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  color: { type: mongoose.Schema.Types.ObjectId, required: true, ref : 'color' },
  size: { type: mongoose.Schema.Types.ObjectId, required: true, ref : 'size' },
  quantity: { type: Number, required: true },
  importPrice : {type : Number},
  listPrice : {type :Number},
  salePrice : {type : Number}
});
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
    variants: [variantSchema]
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Product", productSchema);
