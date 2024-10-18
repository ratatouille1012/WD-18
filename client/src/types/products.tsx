import { ObjectId } from "mongoose";

export type TPproducts = {
    _id: string;               
    title: string;            
    price: number;            
    description?: string;     
    hide?: boolean;           
    discountPercentage?: number; 
    rating?: number;          
    stock?: number;            
    brand: ObjectId;            
    category: ObjectId;         
    thumbnail?: string;        
    images: ObjectId;        
    createdAt?: Date;      
    updatedAt?: Date;        
};
