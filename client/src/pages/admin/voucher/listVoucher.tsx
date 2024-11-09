import React, { useEffect, useState } from 'react';
import { useTheme } from '../../../contexts/theme';
<<<<<<< HEAD
import EditPopup from './editVoucher';
import AddPopup from './addVoucher';
import { useLoading } from '../../../contexts/loading';
import axios from 'axios';
import { TPVoucher } from '../../../types/voucher';

const Voucherlist = () => {
=======
import EditVoucherPopup from './editVoucher'; // Popup để sửa voucher
import AddVoucherPopup from './addVoucher'; // Popup để thêm voucher
import { TPVoucher } from '../../../types/voucher'; // Import interface IVoucher
import { useLoading } from '../../../contexts/loading';
import axios from 'axios';

const VoucherList = () => {
>>>>>>> f78133d14acb93caac119c2aa3ccd2d4502b33cb
    const { darkMode } = useTheme();
    const { setLoading } = useLoading();
    const [isEditPopupOpen, setEditPopupOpen] = useState(false);
    const [isAddPopupOpen, setAddPopupOpen] = useState(false);
<<<<<<< HEAD
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
=======
    const [selectedVoucher, setSelectedVoucher] = useState<TPVoucher | null>(null);
    const [vouchers, setVouchers] = useState<TPVoucher[]>([]);

    const getAllVouchers = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("/api/voucher"); // Thay đổi endpoint cho voucher
            setVouchers(data.data);
        } catch (error) {
            console.error("Error fetching vouchers:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllVouchers();
    }, []);

    const handleDeleteVoucher = async (voucherId: string) => {
        try {
            setLoading(true);
            const token = window.localStorage.getItem('token');
            await axios.delete(`/api/voucher/delete/${voucherId}`, { // Thay đổi endpoint cho voucher
>>>>>>> f78133d14acb93caac119c2aa3ccd2d4502b33cb
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            window.location.reload(); 
        } catch (error) {
<<<<<<< HEAD
            if (error.response?.data?.message === "Token invalid") {
                console.error("Token is invalid. Please log in again.");
            } else {
                console.error("Error adding category:", error.response?.data || error.message);
=======
            if (axios.isAxiosError(error) && error.response?.data?.message === "Token invalid") {
                console.error("Token is invalid. Please log in again.");
            } else {
                console.error("Error deleting voucher:", error.response?.data || error.message);
>>>>>>> f78133d14acb93caac119c2aa3ccd2d4502b33cb
            }
        } finally {
            setLoading(false);
        }
<<<<<<< HEAD
      }

    const handleEditClick = (voucher: TPVoucher) => { 
        setSelectedVoucher(voucher);
        console.log(voucher);
=======
    };

    const handleEditClick = (voucher: TPVoucher) => { 
        setSelectedVoucher(voucher);
>>>>>>> f78133d14acb93caac119c2aa3ccd2d4502b33cb
        setEditPopupOpen(true);
    };

    const closeEditPopup = () => {
        setEditPopupOpen(false);
        setSelectedVoucher(null);
    };

<<<<<<< HEAD
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
    
=======
    const handleAddVoucher = (newVoucher: TPVoucher) => {
        setVouchers([...vouchers, newVoucher]);
    };

>>>>>>> f78133d14acb93caac119c2aa3ccd2d4502b33cb
    return (
        <div className="pb-10">
            <div className={`p-4 rounded-lg shadow-md mt-6 ${darkMode ? 'bg-[#24303F]' : 'bg-white'}`}>
                <div className="flex justify-between">
<<<<<<< HEAD
                    <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : ''}`}>Danh sách kích mã giảm giá</h2>
=======
                    <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : ''}`}>Danh sách Voucher</h2>
>>>>>>> f78133d14acb93caac119c2aa3ccd2d4502b33cb
                    <button
                        className={`px-3 py-1 rounded-md hover:bg-gray-600 ${darkMode ? 'bg-gray-500 text-white' : 'bg-gray-500 text-white'}`}
                        onClick={() => setAddPopupOpen(true)}
                    >
<<<<<<< HEAD
                        Thêm mã giảm giá
=======
                        Thêm Voucher
>>>>>>> f78133d14acb93caac119c2aa3ccd2d4502b33cb
                    </button>
                </div>
                <table className="min-w-full mt-4">
                    <thead>
                        <tr className={`${darkMode ? 'bg-[#313D4A] text-[rgb(174,183,192)]' : 'bg-gray-200'}`}>
<<<<<<< HEAD
                            <th className="py-2 px-4 text-left">Stt</th>
                            <th className="py-2 px-4 text-left">Code</th>
                            <th className="py-2 px-4 text-left">Giá trị giảm (%)</th>
                            <th className="py-2 px-4 text-left">Mô tả</th>
                            <th className="py-2 px-4 text-left">Giá tối thiểu áp mã</th>
                            <th className="py-2 px-4 text-left">Ngày bắt đầu</th>
                            <th className="py-2 px-4 text-left">Ngày kết thúc</th>
=======
                            <th className="py-2 px-4 text-left">Id</th>
                            <th className="py-2 px-4 text-left">Code</th>
                            <th className="py-2 px-4 text-left">Value</th>
                            <th className="py-2 px-4 text-left">Mô tả</th>
>>>>>>> f78133d14acb93caac119c2aa3ccd2d4502b33cb
                            <th className="py-2 px-4 text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
<<<<<<< HEAD
                        {vouchers.map((voucher,index) => (
                            <tr key={index} className={`${darkMode ? 'text-meta-3' : ''}`}>
                                <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{index+1}</td>
                                <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{voucher.code}</td>
                                <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{voucher.value}</td>
                                <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{voucher.description}</td>
                                <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{voucher.maxPrice?.toLocaleString()}</td>
                                <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{formatDate(voucher.createdAt)}</td>
                                <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{formatDate(voucher.endDate)}</td>
=======
                        {vouchers.map((voucher) => (
                            <tr key={voucher._id} className={`${darkMode ? 'text-meta-3' : ''}`}>
                                <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{voucher._id}</td>
                                <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{voucher.code}</td>
                                <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{voucher.value}</td>
                                <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{voucher.description}</td>
>>>>>>> f78133d14acb93caac119c2aa3ccd2d4502b33cb
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
<<<<<<< HEAD
                    <EditPopup voucher={selectedVoucher} onClose={closeEditPopup} darkMode={darkMode} />
                )}
                {isAddPopupOpen && (
                    <AddPopup onClose={() => setAddPopupOpen(false)} onAdd={handleAddVoucher} darkMode={darkMode} />
=======
                    <EditVoucherPopup voucher={selectedVoucher} onClose={closeEditPopup} darkMode={darkMode} />
                )}
                {isAddPopupOpen && (
                    <AddVoucherPopup onClose={() => setAddPopupOpen(false)} onAdd={handleAddVoucher} darkMode={darkMode} />
>>>>>>> f78133d14acb93caac119c2aa3ccd2d4502b33cb
                )}
            </div>
        </div>
    );
};

<<<<<<< HEAD
export default Voucherlist;
=======
export default VoucherList;
>>>>>>> f78133d14acb93caac119c2aa3ccd2d4502b33cb
