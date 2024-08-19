import React, { useState, useEffect } from "react";
import { Box, TextField, Typography } from "@mui/material";

interface ShippingInformationProps {
  onInfoChange: (info: any) => void;
  onValidChange: (isValid: boolean) => void;
}

const ShippingInformation: React.FC<ShippingInformationProps> = ({
  onInfoChange,
  onValidChange,
}) => {
  const [errors, setErrors] = useState({
    fullName: true,
    phone: true,
    email: true,
    city: true,
    area: true,
    address: true,
  });

  useEffect(() => {
    const isValid = !Object.values(errors).some((error) => error);
    onValidChange(isValid);
  }, [errors]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };

    if (name === "phone" && !/^\d{10}$/.test(value)) {
      newErrors.phone = true;
    } else if (name === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
      newErrors.email = true;
    } else {
      newErrors[name as keyof typeof errors] = value.trim() === "";
    }

    setErrors(newErrors);
    onInfoChange((prevInfo: any) => ({ ...prevInfo, [name]: value }));
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        收件人資訊
      </Typography>
      <TextField
        fullWidth
        label="姓名"
        name="fullName"
        variant="outlined"
        margin="normal"
        required
        error={errors.fullName}
        helperText={errors.fullName ? "姓名為必填項" : ""}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="手機"
        name="phone"
        variant="outlined"
        margin="normal"
        required
        type="tel"
        error={errors.phone}
        helperText={errors.phone ? "請輸入有效的手機號碼" : ""}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="信箱"
        name="email"
        variant="outlined"
        margin="normal"
        required
        type="email"
        error={errors.email}
        helperText={errors.email ? "請輸入有效的電子郵件地址" : ""}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="縣市"
        name="city"
        variant="outlined"
        margin="normal"
        required
        error={errors.city}
        helperText={errors.city ? "縣市為必填項" : ""}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="地區"
        name="area"
        variant="outlined"
        margin="normal"
        required
        error={errors.area}
        helperText={errors.area ? "地區為必填項" : ""}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="地址"
        name="address"
        variant="outlined"
        margin="normal"
        required
        error={errors.address}
        helperText={errors.address ? "地址為必填項" : ""}
        onChange={handleChange}
      />
    </Box>
  );
};

export default ShippingInformation;
