import { useState } from 'react';
import axios from 'axios';
import { Order } from '../types/oder';

const useOrder = () => {
    const [loadingOrder, setLoading] = useState(false);
    const [oder,setOder] = useState<Order[]>([])

    const createOrder = async (newOrder) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.post('/api/order', newOrder,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setOder(response.data);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error response:', error.response?.data);
            } else {
                console.error('Error:', error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return { createOrder, loadingOrder,oder };
};

export default useOrder;
