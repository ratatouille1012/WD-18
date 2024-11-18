import React, { useEffect, useState } from 'react';
import { useTheme } from '../../../contexts/theme';
import EditPopup from './editVoucher';
import AddPopup from './addVoucher';
import { useLoading } from '../../../contexts/loading';
import axios from 'axios';
import { TPVoucher } from '../../../types/voucher';

const Voucherlist = () => {
    const { darkMode } = useTheme();
    const { setLoading } = useLoading();
    const [isEditPopupOpen, setEditPopupOpen] = useState(false);
    const [isAddPopupOpen, setAddPopupOpen] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [vouchers, setVouchers] = useState<TPVoucher[]>([]);

    const getAllVoucher = async () => {
        try {
          setLoading(true);
          const { data } = await axios.get("/api/voucher");
          setVouchers(data.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        getAllVoucher();
      },[]);

      const handleDeleteVoucher = async (voucherId: string) => {
        try {
            setLoading(true);
            const token = window.localStorage.getItem('token');
             await axios.delete(`/api/voucher/delete/${voucherId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            window.location.reload(); 
        } catch (error) {
            if (error.response?.data?.message === "Token invalid") {
                console.error("Token is invalid. Please log in again.");
            } else {
                console.error("Error adding category:", error.response?.data || error.message);
            }
        } finally {
            setLoading(false);
        }
      }

    const handleEditClick = (voucher: TPVoucher) => { 
        setSelectedVoucher(voucher);
        console.log(voucher);
        setEditPopupOpen(true);
    };

    const closeEditPopup = () => {
        setEditPopupOpen(false);
        setSelectedVoucher(null);
    };

    const handleAddVoucher= (newVoucher: string) => {
        vouchers.push({ id: vouchers.length + 1, voucher: newVoucher });
    };

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        };
        const formatter = new Intl.DateTimeFormat('vi-VN', options);
        return formatter.format(new Date(dateString));
    };
    
    return (
        <div className="pb-10">
            <div className={`p-4 rounded-lg shadow-md mt-6 ${darkMode ? 'bg-[#24303F]' : 'bg-white'}`}>
                <div className="flex justify-between">
                    <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : ''}`}>Danh sách kích mã giảm giá</h2>
                    <button
                        className={`px-3 py-1 rounded-md hover:bg-gray-600 ${darkMode ? 'bg-gray-500 text-white' : 'bg-gray-500 text-white'}`}
                        onClick={() => setAddPopupOpen(true)}
                    >
                        Thêm mã giảm giá
                    </button>
                </div>
                <table className="min-w-full mt-4">
                    <thead>
                        <tr className={`${darkMode ? 'bg-[#313D4A] text-[rgb(174,183,192)]' : 'bg-gray-200'}`}>
                            <th className="py-2 px-4 text-left">Stt</th>
                            <th className="py-2 px-4 text-left">Code</th>
                            <th className="py-2 px-4 text-left">Giá trị giảm (%)</th>
                            <th className="py-2 px-4 text-left">Mô tả</th>
                            <th className="py-2 px-4 text-left">Giá tối thiểu áp mã</th>
                            <th className="py-2 px-4 text-left">Ngày bắt đầu</th>
                            <th className="py-2 px-4 text-left">Ngày kết thúc</th>
                            <th className="py-2 px-4 text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {vouchers.map((voucher,index) => (
                            <tr key={index} className={`${darkMode ? 'text-meta-3' : ''}`}>
                                <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{index+1}</td>
                                <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{voucher.code}</td>
                                <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{voucher.value}</td>
                                <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{voucher.description}</td>
                                <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{voucher.maxPrice?.toLocaleString()}</td>
                                <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{formatDate(voucher.createdAt)}</td>
                                <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{formatDate(voucher.endDate)}</td>
                                <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>
                                    <button onClick={() => handleDeleteVoucher(voucher._id)} className={`${darkMode ? 'bg-[#E94E77] text-white' : 'bg-red-500 text-white'} px-3 py-1 rounded-md mr-2 hover:bg-red-600`}>
                                        Xóa
                                    </button>
                                    <button
                                        className={`${darkMode ? 'bg-[#4CAF50] text-white' : 'bg-green-500 text-white'} px-3 py-1 rounded-md hover:bg-green-600`}
                                        onClick={() => handleEditClick(voucher)}
                                    >
                                        Sửa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {isEditPopupOpen && selectedVoucher && (
                    <EditPopup voucher={selectedVoucher} onClose={closeEditPopup} darkMode={darkMode} />
                )}
                {isAddPopupOpen && (
                    <AddPopup onClose={() => setAddPopupOpen(false)} onAdd={handleAddVoucher} darkMode={darkMode} />
                )}
            </div>
        </div>
    );
};

export default Voucherlist;
