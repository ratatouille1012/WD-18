import { ObjectId } from "mongoose";

export type Cart = {
    user: ObjectId;
    variantId: ObjectId;
    variantQuantity:number;
  }