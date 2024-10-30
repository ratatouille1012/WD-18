export interface TPVoucher {
    _id: string;
    code: string;
    value: string;
    description?: string;
    maxPrice?: number;
    startDate?: Date;
    endDate?: Date;
    quantity?: number;
    usedQuantity?: number;
}