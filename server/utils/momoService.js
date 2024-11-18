export const createMomoPayment = async (orderId, amount, orderInfo) => {
    try {
      const requestId = `${orderId}-${Date.now()}`;
      const rawSignature = `accessKey=${MOMO_ACCESS_KEY}&amount=${amount}&extraData=&ipnUrl=${MOMO_NOTIFY_URL}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${MOMO_PARTNER_CODE}&redirectUrl=${MOMO_RETURN_URL}&requestId=${requestId}&requestType=captureWallet`;
  
      const signature = crypto.createHmac('sha256', MOMO_SECRET_KEY).update(rawSignature).digest('hex');
  
      const requestBody = {
        partnerCode: MOMO_PARTNER_CODE,
        requestId,
        amount,
        orderId,
        orderInfo,
        redirectUrl: MOMO_RETURN_URL,
        ipnUrl: MOMO_NOTIFY_URL,
        extraData: '',
        requestType: 'captureWallet',
        signature,
        lang: 'en',
      };
  
      console.log("Request Body gửi đến MoMo:", requestBody);
  
      const response = await axios.post(MOMO_ENDPOINT, requestBody);
  
      console.log("Response từ MoMo:", response.data);
  
      // Lưu giao dịch vào DB
      await MomoTransaction.create({
        orderId,
        requestId,
        amount,
        orderInfo,
        resultCode: response.data.resultCode,
        message: response.data.message,
      });
  
      return response.data;
    } catch (error) {
      console.error("Lỗi gọi API MoMo:", error.message);
      throw new Error("Không thể tạo thanh toán.");
    }
  };
  