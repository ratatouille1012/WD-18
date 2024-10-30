import { useLoading } from '../../../contexts/loading';
import axios from 'axios';
import { TPVoucher } from '../../../types/voucher'; // Import interface IVoucher
import { useForm } from 'react-hook-form';

const AddVoucherPopup = ({ onClose, darkMode, onAdd }) => {
    const { setLoading } = useLoading(); // Sử dụng context loading để cập nhật trạng thái khi đang gửi dữ liệu
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<TPVoucher>(); // Sử dụng interface IVoucher với react-hook-form

    const addVoucher = async (values: TPVoucher) => {
        try {
            setLoading(true);
            const token = window.localStorage.getItem('token'); // Lấy token từ localStorage
            const response = await axios.post("/api/voucher", values, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            onClose(); // Đóng popup sau khi thêm thành công
            console.log(response.data); // In ra kết quả API response
            window.location.reload(); // Tải lại trang
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error response:', error.response?.data); // Xử lý lỗi nếu axios trả về lỗi
            } else {
                console.error('Error:', error.message); // Xử lý các lỗi khác
            }
        } finally {
            setLoading(false); // Kết thúc trạng thái loading
        }
    };
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <form onSubmit={handleSubmit(addVoucher)} action="">
            <div className={`p-5 rounded ${darkMode ? 'bg-[#24303F] text-white' : 'bg-white text-black'} w-96`}> {/* Thay đổi chiều rộng tại đây */}
                <h2 className="text-xl">Thêm Voucher</h2>
                <input
                    type="text"
                    {...register('code', {
                        required: "Code is required",
                    })}
                    className={`mt-2 w-full p-2 ${darkMode ? 'bg-[#3E4A58] text-white' : 'border'}`}
                    placeholder="Nhập mã voucher"
                />
                {errors.code && <span className="text-red-500">{errors.code.message}</span>}
                <input
                    type="text"
                    {...register('value', {
                        required: "Value is required",
                    })}
                    className={`mt-2 w-full p-2 ${darkMode ? 'bg-[#3E4A58] text-white' : 'border'}`}
                    placeholder="Nhập giá trị voucher"
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
                    placeholder="Giá trị tối đa"
                />
                <input
                    type="date"
                    {...register('startDate')}
                    className={`mt-2 w-full p-2 ${darkMode ? 'bg-[#3E4A58] text-white' : 'border'}`}
                />
                <input
                    type="date"
                    {...register('endDate')}
                    className={`mt-2 w-full p-2 ${darkMode ? 'bg-[#3E4A58] text-white' : 'border'}`}
                />
        
                <div className="mt-4">
                    <button onClick={onClose} className="bg-gray-500 text-white px-3 py-1 mr-2">Cancel</button>
                    <button
                        className={`px-3 py-1 text-white ${darkMode ? 'bg-blue-600' : 'bg-blue-500'}`}
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
export default AddVoucherPopup