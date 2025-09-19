import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

type PaypalButtonProps = {
  amount: string;
  onSuccess: (details: any) => void;
  onError: (error: any) => void;
};

function PaypalButton({ amount, onSuccess, onError }: PaypalButtonProps) {
  return (
    <PayPalScriptProvider
      options={{
        clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: parseFloat(amount).toFixed(2)} }],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order!.capture().then((details) => {
            onSuccess(details); // ✅ send order details back
          });
        }}
        onError={(err) => {
          onError(err); // ✅ propagate error to parent
        }}
      />
    </PayPalScriptProvider>
  );
}

export default PaypalButton;
