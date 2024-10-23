import axios from 'axios'
import { useEffect, useState } from 'react'
import { TPproducts } from '../types/products'


const useProduct = () => {
    const [products,setProducts] = useState<TPproducts[]>([])
    const [loading, setLoading] = useState<boolean>(false);
    const Getall = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/products");
            const data = response.data;
            console.log('Fetched data:', data);
            if (Array.isArray(data.data)) {
                setProducts(data.data);
            } else {
                console.error('Expected an array in data.data, but got:', data);
                setProducts([]);
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
    };
    useEffect(()=>{
        Getall();
    },[])

  return {products,loading}
}

export default useProduct