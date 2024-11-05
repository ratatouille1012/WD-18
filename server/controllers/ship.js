import axios from 'axios'
import shipping from '../models/ship.js'

const addressA = {
    lat: 21.023934 , // Tọa độ Hà Nội
    lng: 105.754162,
};

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Đường kính Trái Đất (km)
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Khoảng cách (km)
};

export const getShippingCost = async (req, res) => {
    const { detailedAddress } = req.body; // Lấy địa chỉ chi tiết từ form

    try {
        // Gọi API để lấy tọa độ cho detailedAddress
        const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
            params: {
                q: detailedAddress,
                key: "39af9e1f933349fc9b70ed2a336b8d27" ,// Sử dụng khóa API từ .env
                limit: 1,
            },
        });

        if (response.data.results.length === 0) {
          return res.status(400).json({ error: 'No results found for the given address.' });
      }
  
      const { lat, lng } = response.data.results[0].geometry;
        // Tính khoảng cách
        const distance = calculateDistance(addressA.lat, addressA.lng, lat, lng);
        
        // Tính phí ship
        let shippingCost = 15000; // Giá cơ bản cho 2km
        if (distance > 2) {
            const extraDistance = Math.ceil(distance - 2); // Tính khoảng cách thêm
            shippingCost += extraDistance * 100; // Tính phí cho mỗi km thêm
        }

        // Lưu thông tin vào cơ sở dữ liệu
        const shippings = new shipping({ detailedAddress, shippingCost, distance });
        await shippings.save();

        res.json({ shippingCost, distance });
    } catch (error) {
      console.error('Error fetching geocoding data:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: 'Unable to retrieve geocoding data', details: error.response ? error.response.data : error.message });
    }
};


