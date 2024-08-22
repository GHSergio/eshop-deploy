import React, { useCallback } from "react";
import { Box, TextField, Typography } from "@mui/material";

interface PaymentDetailsProps {
  onPaymentChange: (info: any) => void;
  paymentInfo: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  };
  submitted: boolean;
  errors: {
    cardNumber: boolean;
    expiryDate: boolean;
    cvv: boolean;
  };
  setErrors: (errors: any) => void;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  onPaymentChange,
  paymentInfo,
  submitted,
  errors,
  setErrors,
}) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const newErrors = { ...errors };

      //及時驗證 -> submit時會統一驗證
      if (name === "cardNumber" && !/^\d{16}$/.test(value)) {
        newErrors.cardNumber = true;
      } else if (name === "expiryDate") {
        newErrors.expiryDate = value.trim() === "";
      } else if (name === "cvv" && !/^\d{3}$/.test(value)) {
        newErrors.cvv = true;
      } else {
        newErrors[name as keyof typeof errors] = value.trim() === "";
      }

      setErrors(newErrors);
      onPaymentChange((prevInfo: any) => ({ ...prevInfo, [name]: value }));
    },
    [errors, onPaymentChange, setErrors]
  );

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
        error={submitted && errors.cardNumber}
        helperText={
          submitted && errors.cardNumber ? "請輸入16位有效的信用卡號" : ""
        }
        onChange={handleChange}
        value={paymentInfo.cardNumber}
      />
      <TextField
        fullWidth
        label="有效期限 月/年"
        name="expiryDate"
        variant="outlined"
        margin="normal"
        required
        type="month"
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="MM/YY"
        error={submitted && errors.expiryDate}
        helperText={
          submitted && errors.expiryDate ? "請輸入有效的有效期限 (MM/YY)" : ""
        }
        onChange={handleChange}
        value={paymentInfo.expiryDate}
      />
      <TextField
        fullWidth
        label="背面末三碼"
        name="cvv"
        variant="outlined"
        margin="normal"
        required
        type="password"
        error={submitted && errors.cvv}
        helperText={submitted && errors.cvv ? "請輸入3位數的CVV" : ""}
        onChange={handleChange}
        value={paymentInfo.cvv}
      />
    </Box>
  );
};

export default PaymentDetails;
