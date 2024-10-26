import jwt from 'jsonwebtoken';

export const verifyUser = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Lấy token từ header Authorization

    if (!token) {
        return res.status(401).json({ message: 'Không có token, quyền truy cập bị từ chối' });
    }

    try {
        // Xác thực token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Gắn thông tin user đã giải mã vào req
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
    }
};
