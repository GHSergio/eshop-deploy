import React, { useState, useEffect } from "react";
import { Box, TextField, Typography } from "@mui/material";

interface PaymentDetailsProps {
  onPaymentChange: (info: any) => void;
  onValidChange: (isValid: boolean) => void;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  onPaymentChange,
  onValidChange,
}) => {
  const [errors, setErrors] = useState({
    cardNumber: true,
    expiryDate: true,
    cvv: true,
  });

  useEffect(() => {
    const isValid = !Object.values(errors).some((error) => error);
    onValidChange(isValid);
  }, [errors]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };

    if (name === "cardNumber" && !/^\d{16}$/.test(value)) {
      newErrors.cardNumber = true;
    } else if (name === "expiryDate" && !/^\d{2}\/\d{2}$/.test(value)) {
      newErrors.expiryDate = true;
    } else if (name === "cvv" && !/^\d{3}$/.test(value)) {
      newErrors.cvv = true;
    } else {
      newErrors[name as keyof typeof errors] = value.trim() === "";
    }

    setErrors(newErrors);
    onPaymentChange((prevInfo: any) => ({ ...prevInfo, [name]: value }));
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        支付細節
      </Typography>
      <TextField
        fullWidth
        label="信用卡卡號"
        name="cardNumber"
        variant="outlined"
        margin="normal"
        required
        type="text"
        error={errors.cardNumber}
        helperText={errors.cardNumber ? "請輸入16位有效的信用卡號" : ""}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="有效期限 月/年"
        name="expiryDate"
        variant="outlined"
        margin="normal"
        required
        placeholder="MM/YY"
        error={errors.expiryDate}
        helperText={errors.expiryDate ? "請輸入有效的有效期限 (MM/YY)" : ""}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="背面末三碼"
        name="cvv"
        variant="outlined"
        margin="normal"
        required
        type="password"
        error={errors.cvv}
        helperText={errors.cvv ? "請輸入3位數的CVV" : ""}
        onChange={handleChange}
      />
    </Box>
  );
};

export default PaymentDetails;
