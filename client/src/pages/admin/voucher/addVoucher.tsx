import { useLoading } from '../../../contexts/loading';
import axios from 'axios';
import { TPVoucher } from '../../../types/voucher'; // Import interface IVoucher
import { useForm } from 'react-hook-form';

const AddVoucherPopup = ({ onClose, darkMode, onAdd }) => {
    const { setLoading } = useLoading(); 
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<TPVoucher>(); 

    const addVoucher = async (values: TPVoucher) => {
        try {
            setLoading(true);
            const token = window.localStorage.getItem('token'); 
            const response = await axios.post("/api/voucher", values, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            onClose(); 
            console.log(response.data); 
            window.location.reload(); 
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
    
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
            <form onSubmit={handleSubmit(addVoucher)} action="">
                <div className={`p-3 rounded ${darkMode ? 'bg-[#24303F] text-white' : 'bg-white text-black'} w-80`}> {/* Thay đổi padding và width */}
                    <h2 className="text-lg">Thêm Voucher</h2> {/* Giảm kích thước text */}
                    
                    <label htmlFor="code" className="mt-2">Mã voucher</label>
                    <input
                        id="code"
                        type="text"
                        {...register('code', { required: true })}
                        className={`mt-1 w-full p-1 ${darkMode ? 'bg-[#3E4A58] text-white' : 'border'}`}
                        placeholder="Mã voucher"
                    />
                    {errors.code && <span className="text-red-500">Mã voucher là bắt buộc.</span>}

                    <label htmlFor="value" className="mt-2">Giá trị voucher</label>
                    <input
                        id="value"
                        type="text"
                        {...register('value', { required: true })}
                        className={`mt-1 w-full p-1 ${darkMode ? 'bg-[#3E4A58] text-white' : 'border'}`}
                        placeholder="Giá trị voucher"
                    />
                    {errors.value && <span className="text-red-500">Giá trị là bắt buộc.</span>}

                    <label htmlFor="description" className="mt-2">Mô tả</label>
                    <textarea
                        id="description"
                        {...register('description')}
                        className={`mt-1 w-full p-1 ${darkMode ? 'bg-[#3E4A58] text-white' : 'border'}`}
                        placeholder="Mô tả"
                    />

                    <label htmlFor="maxPrice" className="mt-2">Giá tối đa</label>
                    <input
                        id="maxPrice"
                        type="number"
                        {...register('maxPrice')}
                        className={`mt-1 w-full p-1 ${darkMode ? 'bg-[#3E4A58] text-white' : 'border'}`}
                        placeholder="Giá tối đa"
                    />

                    <label htmlFor="startDate" className="mt-2">Ngày bắt đầu</label>
                    <input
                        id="startDate"
                        type="date"
                        {...register('startDate')}
                        className={`mt-1 w-full p-1 ${darkMode ? 'bg-[#3E4A58] text-white' : 'border'}`}
                    />

                    <label htmlFor="endDate" className="mt-2">Ngày kết thúc</label>
                    <input
                        id="endDate"
                        type="date"
                        {...register('endDate')}
                        className={`mt-1 w-full p-1 ${darkMode ? 'bg-[#3E4A58] text-white' : 'border'}`}
                    />

                    <label htmlFor="quantity" className="mt-2">Số lượng</label>
                    <input
                        id="quantity"
                        type="number"
                        {...register('quantity', { valueAsNumber: true })}
                        className={`mt-1 w-full p-1 ${darkMode ? 'bg-[#3E4A58] text-white' : 'border'}`}
                        placeholder="Số lượng"
                    />

                    <label htmlFor="usedQuantity" className="mt-2">Số lượng đã sử dụng</label>
                    <input
                        id="usedQuantity"
                        type="number"
                        {...register('usedQuantity', { valueAsNumber: true })}
                        className={`mt-1 w-full p-1 ${darkMode ? 'bg-[#3E4A58] text-white' : 'border'}`}
                        placeholder="Số lượng đã sử dụng"
                    />

                    <div className="mt-3">
                        <button onClick={onClose} className="bg-gray-500 text-white px-2 py-1 mr-2">Cancel</button>
                        <button
                            className={`px-2 py-1 text-white ${darkMode ? 'bg-blue-600' : 'bg-blue-500'}`}
                            type='submit'
                        >
                            Add
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default AddVoucherPopup;