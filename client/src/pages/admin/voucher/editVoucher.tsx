import React, { useEffect } from 'react';
<<<<<<< HEAD
import { TPVoucher } from '../../../types/voucher';
=======
import { TPVoucher } from '../../../types/voucher'; // Import interface IVoucher
>>>>>>> f78133d14acb93caac119c2aa3ccd2d4502b33cb
import { useLoading } from '../../../contexts/loading';
import axios from 'axios';
import { useForm } from 'react-hook-form';

<<<<<<< HEAD
const EditPopup = ({ voucher, onClose, darkMode }) => {
=======
const VoucherEditPopup = ({ voucher, onClose, darkMode }) => {
>>>>>>> f78133d14acb93caac119c2aa3ccd2d4502b33cb
    const { setLoading } = useLoading();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<TPVoucher>();

<<<<<<< HEAD
    // Set initial values in the form when voucher prop changes
    useEffect(() => {
        setValue('code', voucher.code);
        setValue('value', voucher.value);
        setValue('description', voucher.description || '');
        setValue('maxPrice', voucher.maxPrice || '');
        setValue('endDate', voucher.endDate?.split('T')[0]); // Format date for input
=======
    useEffect(() => {
        setValue('code', voucher.code);
        setValue('value', voucher.value);
        setValue('description', voucher.description);
        setValue('maxPrice', voucher.maxPrice);
        setValue('startDate', voucher.startDate ? voucher.startDate.split('T')[0] : ''); // Chuyển đổi sang định dạng ngày
        setValue('endDate', voucher.endDate ? voucher.endDate.split('T')[0] : '');
        setValue('quantity', voucher.quantity);
        setValue('usedQuantity', voucher.usedQuantity);
>>>>>>> f78133d14acb93caac119c2aa3ccd2d4502b33cb
    }, [voucher, setValue]);

    const editVoucher = async (values: TPVoucher) => {
        try {
            setLoading(true);
            const id = voucher._id;
            const token = window.localStorage.getItem('token');
            const response = await axios.put(`/api/voucher/update/${id}`, values, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            onClose();
            window.location.reload();
        } catch (error) {
            let errorMessage = 'An error occurred. Please try again.';
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error);
                errorMessage = error.response?.data?.message || errorMessage;
            } else {
                console.error('Error:', error.message);
            }
            alert(errorMessage); 
        } finally {
            setLoading(false);
        }
    };
<<<<<<< HEAD

    return (
        <div className="fixed ml-[280px] inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <form onSubmit={handleSubmit(editVoucher)}>
                <div className={`p-5 rounded ${darkMode ? 'bg-[#24303F] text-white' : 'bg-white text-black'}`}>
                    <h2 className="text-xl">Sửa Mã Giảm Giá</h2>
                    <input
                        type="text"
                        {...register('code', { required: "Code is required" })}
                        className={`mt-2 w-full p-2 ${darkMode ? 'bg-[#3E4A58] text-white' : 'border'}`}
                        placeholder="Nhập mã giảm giá"
                    />
                    {errors.code && <span className="text-red-500">{errors.code.message}</span>}

                    <input
                        type="number"
                        {...register('value', { required: "Value is required" })}
                        className={`mt-2 w-full p-2 ${darkMode ? 'bg-[#3E4A58] text-white' : 'border'}`}
                        placeholder="Nhập giá trị (%)"
                    />
                    {errors.value && <span className="text-red-500">{errors.value.message}</span>}

                    <input
                        type="text"
                        {...register('description')}
                        className={`mt-2 w-full p-2 ${darkMode ? 'bg-[#3E4A58] text-white' : 'border'}`}
                        placeholder="Nhập mô tả"
                    />

                    <input
                        type="number"
                        {...register('maxPrice')}
                        className={`mt-2 w-full p-2 ${darkMode ? 'bg-[#3E4A58] text-white' : 'border'}`}
                        placeholder="Nhập giá áp mã cao nhất"
                    />

                    <input
                        type="date"
                        {...register('endDate', { required: "End date is required" })}
                        className={`mt-2 w-full p-2 ${darkMode ? 'bg-[#3E4A58] text-white' : 'border'}`}
                    />
                    {errors.endDate && <span className="text-red-500">{errors.endDate.message}</span>}

                    <div className="mt-4">
                        <button onClick={onClose} type="button" className="bg-gray-500 text-white px-3 py-1 mr-2">Cancel</button>
                        <button type="submit" className={`px-3 py-1 text-white ${darkMode ? 'bg-blue-600' : 'bg-blue-500'}`}>
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditPopup;
=======
    
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <form onSubmit={handleSubmit(editVoucher)}>
            <div className={`p-3 rounded ${darkMode ? 'bg-[#24303F] text-white' : 'bg-white text-black'} w-80 max-h-[500px] overflow-auto`}>
                <h2 className="text-xl">Sửa Voucher</h2>
    
                <label htmlFor="code" className="mt-4">Mã voucher</label>
                <input
                    id="code"
                    type="text"
                    {...register('code', { required: true })}
                    className={`mt-2 w-full p-2 ${darkMode ? 'bg-[#3E4A58] text-white' : 'border'}`}
                    placeholder="Mã voucher"
                />
                {errors.code && <span className="text-red-500">Mã voucher là bắt buộc.</span>}
    
                <label htmlFor="value" className="mt-4">Giá trị voucher</label>
                <input
                    id="value"
                    type="text"
                    {...register('value', { required: true })}
                    className={`mt-2 w-full p-2 ${darkMode ? 'bg-[#3E4A58] text-white' : 'border'}`}
                    placeholder="Giá trị voucher"
                />
                {errors.value && <span className="text-red-500">Giá trị là bắt buộc.</span>}
    
                <label htmlFor="description" className="mt-4">Mô tả</label>
                <textarea
                    id="description"
                    {...register('description')}
                    className={`mt-2 w-full p-2 ${darkMode ? 'bg-[#3E4A58] text-white' : 'border'}`}
                    placeholder="Mô tả"
                />
    
                <label htmlFor="maxPrice" className="mt-4">Giá tối đa</label>
                <input
                    id="maxPrice"
                    type="number"
                    {...register('maxPrice')}
                    className={`mt-2 w-full p-2 ${darkMode ? 'bg-[#3E4A58] text-white' : 'border'}`}
                    placeholder="Giá tối đa"
                />
    
                <label htmlFor="startDate" className="mt-4">Ngày bắt đầu</label>
                <input
                    id="startDate"
                    type="date"
                    {...register('startDate')}
                    className={`mt-2 w-full p-2 ${darkMode ? 'bg-[#3E4A58] text-white' : 'border'}`}
                />
    
                <label htmlFor="endDate" className="mt-4">Ngày kết thúc</label>
                <input
                    id="endDate"
                    type="date"
                    {...register('endDate')}
                    className={`mt-2 w-full p-2 ${darkMode ? 'bg-[#3E4A58] text-white' : 'border'}`}
                />
    
                <label htmlFor="quantity" className="mt-4">Số lượng</label>
                <input
                    id="quantity"
                    type="number"
                    {...register('quantity', { valueAsNumber: true })}
                    className={`mt-2 w-full p-2 ${darkMode ? 'bg-[#3E4A58] text-white' : 'border'}`}
                    placeholder="Số lượng"
                />
    
                <label htmlFor="usedQuantity" className="mt-4">Số lượng đã sử dụng</label>
                <input
                    id="usedQuantity"
                    type="number"
                    {...register('usedQuantity', { valueAsNumber: true })}
                    className={`mt-2 w-full p-2 ${darkMode ? 'bg-[#3E4A58] text-white' : 'border'}`}
                    placeholder="Số lượng đã sử dụng"
                />
    
                <div className="mt-4">
                    <button onClick={onClose} type="button" className="bg-gray-500 text-white px-3 py-1 mr-2">Cancel</button>
                    <button type="submit" className={`px-3 py-1 text-white ${darkMode ? 'bg-blue-600' : 'bg-blue-500'}`}>
                        Save
                    </button>
                </div>
            </div>
        </form>
    </div>
    
    

    );
};

export default VoucherEditPopup;
>>>>>>> f78133d14acb93caac119c2aa3ccd2d4502b33cb
