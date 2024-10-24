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
      default: "no description",
    },
    img_des: {
      type: String,
      default: "none",
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
      ref: "Brand", 
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Category", 
      required: true,
    },
    thumbnail: {
      type: String,
      default: "",
    },
    images: { type: [String], required: true },
    variant:[
      {
        color : {
          type : mongoose.Schema.Types.ObjectId,
          ref : "color"
      },
      size : {
          type : mongoose.Schema.Types.ObjectId,
          ref : "size"
      },
      quantity : {
          type : Number,
      },
      importPrice : {
          type : Number,
      },
      listPrice : {
          type : Number,
      },
      salePrice : {
          type : Number,
      }
    }
    ]
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
