import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

interface PaymentPageState {
  isTeam?: boolean;
  event_student_id?: number;
  event_name?: string;
  amount?: number;
  team_name?: string;
  team_id?: number;
}

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = (location.state || {}) as PaymentPageState;

  const [paymentType, setPaymentType] = useState<string>("online");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const isTeam = state?.isTeam === true;

  useEffect(() => {
    console.log("payment page state =", state);
  }, [state]);

  const handlePayment = async () => {
    setLoading(true);
    setMessage("");

    try {
      if (!state?.event_student_id) {
        setMessage("event_student_id missing");
        setLoading(false);
        return;
      }

      const payload = {
        event_student_id: Number(state.event_student_id),
        payment_id: "PAY" + Date.now(),
        payment_type: paymentType,
        amount: Number(state.amount || 0),
        payment_status: "paid",
        payment_date: new Date().toISOString().slice(0, 19).replace("T", " "),
        transaction_id: "TXN" + Date.now(),
      };

      console.log("payment payload =", payload);

      const res = await axios.post(
        "http://127.0.0.1:8000/api/payments",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log("payment response =", res.data);

      setMessage(isTeam ? "Team Booking Successfully ✅" : "Booking Successfully ✅");

      setTimeout(() => {
        navigate("/success");
      }, 1200);
    } catch (err: any) {
      console.log("payment error =", err?.response?.data || err.message);
      setMessage(err.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Payment Page</h2>

        {message && (
          <p className="mb-4 text-center text-green-600 font-medium">
            {message}
          </p>
        )}

        <div className="mb-4">
          <p className="mb-2">
            <strong>Booking Type:</strong> {isTeam ? "Team" : "Solo"}
          </p>

          <p className="mb-2">
            <strong>Event Name:</strong> {state?.event_name || "N/A"}
          </p>

          {isTeam && (
            <p className="mb-2">
              <strong>Team Name:</strong> {state?.team_name || "N/A"}
            </p>
          )}

          <p className="mb-4">
            <strong>Amount:</strong> ₹{state?.amount || 0}
          </p>
        </div>

        <select
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
          className="mb-4 w-full p-2 border rounded"
        >
          <option value="online">Online</option>
          <option value="cash">Cash</option>
        </select>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;