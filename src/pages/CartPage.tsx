import React, { useState } from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import CartSummary from "../components/cartStep/CartSummary";
import ShippingInformation from "../components/cartStep/ShippingInformation";
import PaymentDetails from "../components/cartStep/PaymentDetails";
import ReviewOrder from "../components/cartStep/ReviewOrder";
import { useDispatch } from "react-redux";
import { clearCart } from "../slice/productSlice";

const steps = ["確認購物車", "運送資訊", "付費方式", "確認訂單"];

interface SelectedItem {
  id: string;
  color: string;
  size: string;
}

const CartPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    area: "",
    address: "",
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  // 驗證
  const [isCartValid, setIsCartValid] = useState(false);
  const [isShippingValid, setIsShippingValid] = useState(false);
  const [isPaymentValid, setIsPaymentValid] = useState(false);
  // 驗證狀態提升至 CartPage
  const [errors, setErrors] = useState({
    shipping: {
      fullName: true,
      phone: true,
      email: true,
      city: true,
      area: true,
      address: true,
    },
    payment: {
      cardNumber: true,
      expiryDate: true,
      cvv: true,
    },
  });
  const [submitted, setSubmitted] = useState(false);

  console.log("submitted:", submitted);
  console.log("運送資訊:", shippingInfo);
  // console.log("支付方式:", paymentInfo);

  // 使用 useDispatch 來發送 action
  const dispatch = useDispatch();

  // 處理 Shipping 的表單驗證
  const validateShippingInfo = (): boolean => {
    const newErrors = {
      fullName: shippingInfo.fullName.trim() === "",
      phone: !/^\d{10}$/.test(shippingInfo.phone),
      email: !/^\S+@\S+\.\S+$/.test(shippingInfo.email),
      city: shippingInfo.city.trim() === "",
      area: shippingInfo.area.trim() === "",
      address: shippingInfo.address.trim() === "",
    };
    setErrors((prev) => ({ ...prev, shipping: newErrors }));
    return !Object.values(newErrors).some((error) => error);
  };

  // 處理 Payment 的表單驗證
  const validatePaymentInfo = (): boolean => {
    const newErrors = {
      cardNumber: !/^\d{16}$/.test(paymentInfo.cardNumber),
      expiryDate: paymentInfo.expiryDate.trim() === "",
      cvv: !/^\d{3}$/.test(paymentInfo.cvv),
    };
    setErrors((prev) => ({ ...prev, payment: newErrors }));
    return !Object.values(newErrors).some((error) => error);
  };

  // 驗證表單是否填寫正確 才能進入Next Step
  const handleNext = () => {
    //透過 submit && error -> 顯示 textHelper
    setSubmitted(true);

    let valid = true;
    if (activeStep === 1) {
      // 執行 shippingInfo 的表單驗證
      valid = validateShippingInfo();
    } else if (activeStep === 2) {
      // 執行 PaymentInfo 的表單驗證
      valid = validatePaymentInfo();
    }
    if (valid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSubmitted(false);
    }
  };

  // 回到上個Step
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // 儲存運送資訊，並在輸入變更時驗證該字段
  const handleShippingInfoChange = (info: any) => {
    setShippingInfo(info);
  };

  // 儲存支付資訊，並在輸入變更時驗證該字段
  const handlePaymentInfoChange = (info: any) => {
    setPaymentInfo(info);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <CartSummary
            selectAll={selectAll}
            setSelectAll={setSelectAll}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            onValidChange={setIsCartValid}
          />
        );
      case 1:
        return (
          <ShippingInformation
            onInfoChange={handleShippingInfoChange}
            // 立即顯示errors狀態
            // onValidChange={setIsShippingValid}
            shippingInfo={shippingInfo}
            submitted={submitted}
            errors={errors.shipping}
            setErrors={(newErrors) =>
              setErrors((prev) => ({ ...prev, shipping: newErrors }))
            }
          />
        );
      case 2:
        return (
          <PaymentDetails
            onPaymentChange={handlePaymentInfoChange}
            // onValidChange={setIsPaymentValid}
            paymentInfo={paymentInfo}
            submitted={submitted}
            errors={errors.payment}
            setErrors={(newErrors) =>
              setErrors((prev) => ({ ...prev, payment: newErrors }))
            }
          />
        );
      case 3:
        return (
          <ReviewOrder paymentInfo={paymentInfo} shippingInfo={shippingInfo} />
        );
      default:
        return (
          <Box textAlign="center" mt={4}>
            <Typography variant="h6" gutterBottom>
              成功完成訂單流程！
            </Typography>
            <Button
              component={Link}
              to="/"
              variant="contained"
              color="primary"
              onClick={() => dispatch(clearCart())}
            >
              返回主頁面
            </Button>
          </Box>
        );
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        maxWidth: "1000px",
        margin: "20px auto",
        padding: "1rem",
      }}
    >
      <Stepper activeStep={activeStep} sx={{ marginBottom: "1rem" }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              StepIconProps={{
                sx: {
                  fontSize: "1.5rem",
                  "@media (max-width: 600px)": {
                    fontSize: "0.85rem",
                  },
                },
              }}
              sx={{
                "& .MuiStepLabel-label": {
                  fontSize: "0.875rem",
                  fontWeight: "bold",
                  "@media (max-width: 600px)": {
                    fontSize: "0.38rem",
                  },
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      {/* Step Content */}
      <Box
        sx={{
          maxWidth: "1000px",
          border: "1px solid grey",
          borderRadius: "5px",
          padding: "0.5rem",
        }}
      >
        {renderStepContent(activeStep)}
      </Box>

      {/* Button */}
      {activeStep < steps.length && (
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="contained"
            color="secondary"
          >
            上一步
          </Button>
          <Button
            onClick={handleNext}
            variant="contained"
            color="primary"
            // disabled={
            //   (activeStep === 0 && !isCartValid) ||
            //   (activeStep === 1 && !isShippingValid) ||
            //   (activeStep === 2 && !isPaymentValid)
            // }
            disabled={activeStep === 0 && !selectedItems.length}
          >
            {activeStep === steps.length - 1 ? "下訂單" : "下一步"}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CartPage;
