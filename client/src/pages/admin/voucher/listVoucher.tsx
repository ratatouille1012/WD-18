import React, { useEffect, useState } from 'react';
import { useTheme } from '../../../contexts/theme';
import EditVoucherPopup from './editVoucher'; // Popup để sửa voucher
import AddVoucherPopup from './addVoucher'; // Popup để thêm voucher
import { TPVoucher } from '../../../types/voucher'; // Import interface IVoucher
import { useLoading } from '../../../contexts/loading';
import axios from 'axios';

const VoucherList = () => {
    const { darkMode } = useTheme();
    const { setLoading } = useLoading();
    const [isEditPopupOpen, setEditPopupOpen] = useState(false);
    const [isAddPopupOpen, setAddPopupOpen] = useState(false);
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
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            window.location.reload(); 
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data?.message === "Token invalid") {
                console.error("Token is invalid. Please log in again.");
            } else {
                console.error("Error deleting voucher:", error.response?.data || error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (voucher: TPVoucher) => { 
        setSelectedVoucher(voucher);
        setEditPopupOpen(true);
    };

    const closeEditPopup = () => {
        setEditPopupOpen(false);
        setSelectedVoucher(null);
    };

    const handleAddVoucher = (newVoucher: TPVoucher) => {
        setVouchers([...vouchers, newVoucher]);
    };

    return (
        <div className="pb-10">
            <div className={`p-4 rounded-lg shadow-md mt-6 ${darkMode ? 'bg-[#24303F]' : 'bg-white'}`}>
                <div className="flex justify-between">
                    <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : ''}`}>Danh sách Voucher</h2>
                    <button
                        className={`px-3 py-1 rounded-md hover:bg-gray-600 ${darkMode ? 'bg-gray-500 text-white' : 'bg-gray-500 text-white'}`}
                        onClick={() => setAddPopupOpen(true)}
                    >
                        Thêm Voucher
                    </button>
                </div>
                <table className="min-w-full mt-4">
                    <thead>
                        <tr className={`${darkMode ? 'bg-[#313D4A] text-[rgb(174,183,192)]' : 'bg-gray-200'}`}>
                            <th className="py-2 px-4 text-left">Id</th>
                            <th className="py-2 px-4 text-left">Code</th>
                            <th className="py-2 px-4 text-left">Value</th>
                            <th className="py-2 px-4 text-left">Mô tả</th>
                            <th className="py-2 px-4 text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {vouchers.map((voucher) => (
                            <tr key={voucher._id} className={`${darkMode ? 'text-meta-3' : ''}`}>
                                <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{voucher._id}</td>
                                <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{voucher.code}</td>
                                <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{voucher.value}</td>
                                <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{voucher.description}</td>
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
                    <EditVoucherPopup voucher={selectedVoucher} onClose={closeEditPopup} darkMode={darkMode} />
                )}
                {isAddPopupOpen && (
                    <AddVoucherPopup onClose={() => setAddPopupOpen(false)} onAdd={handleAddVoucher} darkMode={darkMode} />
                )}
            </div>
        </div>
    );
};

export default VoucherList;
