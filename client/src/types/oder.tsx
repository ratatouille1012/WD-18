import { ObjectId } from "mongoose";

export type Order {
    user: ObjectId;          
    orderCode: string;      
    orderItems: { 
        quantity: number;      
        variantId: ObjectId;     
        variantQuantity: number;
    }[]; 
    orderStatus?: string;   
    total?: number;         
    voucher?: string;       
    ship?: string;          
    name: string;          
    address?: string;       
    phone?: number;        
    createdAt?: Date;      
    updatedAt?: Date;         
}