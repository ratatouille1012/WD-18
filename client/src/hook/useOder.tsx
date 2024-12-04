import { useEffect, useState } from 'react';
import axios from 'axios';
import { Order } from '../types/oder';
import { useParams } from 'react-router-dom';

const useOrder = () => {
    const [loadingOrder, setLoading] = useState(false);
    const [oder,setOder] = useState<Order[]>([])
    const [order, setOrder] = useState<Order>();
    const [orderDT, setOrderDT] = useState<Order>();
    const [orders, setOrders] = useState<Order>();
    const { orderId } = useParams();
    const getUserId = () => {
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            return user._id; 
        }
        return null; 
    };
    const Getall = async () => {
        try {
            setLoading(true);
            const userId = getUserId();
            const response = await axios.get(`/api/order/user/${userId}`);
            const data = response.data;
            console.log('Fetched data:', data);
            setOrder(data.data);
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
    const GetallAdmin = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/order/`);
            const data = response.data;
            console.log('Fetched data:', data);
            setOrder(data.data);
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
    const GetOrderById = async (orderId:string) => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/order/${orderId}`);
            const data = response.data;
            console.log('Fetched data order by id:', data);
            setOrders(data.data);          
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

    const getOneOrderByUserIdAndOrderId = async (orderId:string) =>{
        console.log("orderid:",orderId);
           
      try {
        setLoading(true);
        const userId = getUserId();
        if (userId && orderId) {
                const response = await axios.get(`/api/order/user/${userId}/order/${orderId}`);
                const data = response.data.data;
                console.log("Fetched order details:", data);
                setOrderDT(data);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error response:', error.response?.data);
        } else {
            console.error('Error:', error.message);
        }
      } finally {
        setLoading(false);
      }
    }

    const updateOrderById = async (orderId: string, updatedData) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.put(`/api/order/update/${orderId}`, updatedData,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Updated order:', response.data);
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
    useEffect(() => {
        Getall();  
        GetallAdmin();  
    }, []);
    useEffect(() => {
        if (orderId) {
            GetOrderById(orderId);  
            getOneOrderByUserIdAndOrderId(orderId);  
        }
    }, [orderId]);
    return { createOrder, loadingOrder,oder,order ,getOneOrderByUserIdAndOrderId,orderDT,orders,updateOrderById};
};

export default useOrder;
