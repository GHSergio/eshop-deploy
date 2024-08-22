import React, { useCallback } from "react";
import {
  Box,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";

interface ShippingInformationProps {
  onInfoChange: (info: any) => void;
  shippingInfo: {
    fullName: string;
    phone: string;
    email: string;
    city: string;
    area: string;
    address: string;
  };
  submitted: boolean;
  errors: {
    fullName: boolean;
    phone: boolean;
    email: boolean;
    city: boolean;
    area: boolean;
    address: boolean;
  };
  setErrors: (errors: any) => void;
}

const ShippingInformation: React.FC<ShippingInformationProps> = ({
  onInfoChange,
  shippingInfo,
  submitted,
  errors,
  setErrors,
}) => {
  // console.log("運送資訊errors:", errors);

  //處理TextField
  const handleTextFieldChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const newErrors = { ...errors };

      //表單立即驗證 -> 不符合則error : true
      if (name === "phone" && !/^\d{10}$/.test(value)) {
        newErrors.phone = true;
      } else if (name === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
        newErrors.email = true;
      } else {
        newErrors[name as keyof typeof errors] = value.trim() === "";
      }

      setErrors(newErrors);
      onInfoChange((prevInfo: any) => ({ ...prevInfo, [name]: value }));
    },
    [errors, onInfoChange, setErrors]
  );

  //處理select
  const handleSelectChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      const { name, value } = event.target;
      const newErrors = { ...errors };

      newErrors[name as keyof typeof errors] = value.trim() === "";

      setErrors(newErrors);
      onInfoChange((prevInfo: any) => ({ ...prevInfo, [name]: value }));
    },
    [errors, onInfoChange, setErrors]
  );

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
        error={submitted && errors.fullName}
        helperText={submitted && errors.fullName ? "姓名為必填項" : ""}
        onChange={handleTextFieldChange}
        value={shippingInfo.fullName}
      />
      <TextField
        fullWidth
        label="手機"
        name="phone"
        variant="outlined"
        margin="normal"
        required
        type="tel"
        error={submitted && errors.phone}
        helperText={submitted && errors.phone ? "請輸入有效的手機號碼" : ""}
        onChange={handleTextFieldChange}
        value={shippingInfo.phone}
      />
      <TextField
        fullWidth
        label="信箱"
        name="email"
        variant="outlined"
        margin="normal"
        required
        type="email"
        error={submitted && errors.email}
        helperText={submitted && errors.email ? "請輸入有效的電子郵件地址" : ""}
        onChange={handleTextFieldChange}
        value={shippingInfo.email}
      />
      <FormControl
        fullWidth
        margin="normal"
        required
        error={submitted && errors.city}
      >
        <InputLabel>縣市</InputLabel>
        <Select
          name="city"
          value={shippingInfo.city}
          onChange={handleSelectChange}
        >
          <MenuItem value="台北市">台北市</MenuItem>
          <MenuItem value="台中市">台中市</MenuItem>
          <MenuItem value="高雄市">高雄市</MenuItem>
        </Select>
        {submitted && errors.city && (
          <Typography
            color="error"
            sx={{ fontSize: "0.8rem", paddingLeft: "0.8rem" }}
          >
            縣市為必填項
          </Typography>
        )}
      </FormControl>
      <FormControl
        fullWidth
        margin="normal"
        required
        error={submitted && errors.area}
      >
        <InputLabel>地區</InputLabel>
        <Select
          name="area"
          value={shippingInfo.area}
          onChange={handleSelectChange}
          error={submitted && errors.area}
        >
          <MenuItem value="大安區">大安區</MenuItem>
          <MenuItem value="中山區">中山區</MenuItem>
          <MenuItem value="信義區">信義區</MenuItem>
        </Select>
        {submitted && errors.area && (
          <Typography
            color="error"
            sx={{ fontSize: "0.8rem", paddingLeft: "0.8rem" }}
          >
            地區為必填項
          </Typography>
        )}
      </FormControl>
      <TextField
        fullWidth
        label="地址"
        name="address"
        variant="outlined"
        margin="normal"
        required
        error={submitted && errors.address}
        helperText={submitted && errors.address ? "地址為必填項" : ""}
        onChange={handleTextFieldChange}
        value={shippingInfo.address}
      />
    </Box>
  );
};

export default ShippingInformation;
