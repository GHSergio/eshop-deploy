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
// import { useProductContext } from "../contexts/ProductContext";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
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
  const [shippingInfo, setShippingInfo] = useState({});
  const [paymentInfo, setPaymentInfo] = useState({});
  // 驗證
  const [isCartValid, setIsCartValid] = useState(false);
  const [isShippingValid, setIsShippingValid] = useState(false);
  const [isPaymentValid, setIsPaymentValid] = useState(false);

  // 使用 useDispatch 來發送 action
  const dispatch = useDispatch();

  // 驗證表單是否填寫　才能進入Next Step
  const handleNext = () => {
    if (
      (activeStep === 0 && !isCartValid) ||
      (activeStep === 1 && !isShippingValid) ||
      (activeStep === 2 && !isPaymentValid)
    ) {
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  //回到上個Step
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  //儲存 運送資訊
  const handleShippingInfoChange = (info: any) => {
    setShippingInfo(info);
  };
  //儲存 支付資訊
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
            onValidChange={setIsShippingValid}
          />
        );
      case 2:
        return (
          <PaymentDetails
            onPaymentChange={handlePaymentInfoChange}
            onValidChange={setIsPaymentValid}
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
              onClick={() => dispatch(clearCart())} // 使用 dispatch 來清空購物車
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
            disabled={
              (activeStep === 0 && !isCartValid) ||
              (activeStep === 1 && !isShippingValid) ||
              (activeStep === 2 && !isPaymentValid)
            }
          >
            {activeStep === steps.length - 1 ? "下訂單" : "下一步"}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CartPage;
