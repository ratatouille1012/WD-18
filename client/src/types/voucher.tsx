<<<<<<< HEAD
export type TPVoucher = {
    _id?: string; 
=======
export interface TPVoucher {
    _id: string;
>>>>>>> f78133d14acb93caac119c2aa3ccd2d4502b33cb
    code: string;
    value: string;
    description?: string;
    maxPrice?: number;
<<<<<<< HEAD
    endDate?: Date;
    createdAt?: Date; 
    updatedAt?: Date; 
=======
    startDate?: Date;
    endDate?: Date;
    quantity?: number;
    usedQuantity?: number;
>>>>>>> f78133d14acb93caac119c2aa3ccd2d4502b33cb
}