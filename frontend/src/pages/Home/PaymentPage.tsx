import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

interface RegistrationItem {
  event_student_id: number;
  student_id: number;
  event_id: number;
  event_name: string;
  payment_status?: string;
}

interface PaymentPageState {
  isTeam?: boolean;
  event_student_id?: number;
  event_name?: string;
  amount?: number;
  registrations?: RegistrationItem[];
}

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = (location.state || {}) as PaymentPageState;

  const [paymentType, setPaymentType] = useState<string>("online");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const isTeam = state?.isTeam === true;

  const handlePayment = async () => {
    setLoading(true);
    setMessage("");

    try {
      // SOLO PAYMENT
      if (!isTeam) {
        if (!state?.event_student_id) {
          setMessage("event_student_id missing");
          setLoading(false);
          return;
        }

        await axios.post(
          "http://127.0.0.1:8000/api/payments",
          {
            event_student_id: state.event_student_id,
            payment_id: "PAY" + Date.now(),
            payment_type: paymentType,
            amount: state.amount || 0,
            payment_status: "paid",
            payment_date: new Date().toISOString().slice(0, 19).replace("T", " "),
            transaction_id: "TXN" + Date.now(),
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        setMessage("Booking Successfully ✅");

        setTimeout(() => {
          navigate("/success");
        }, 1200);

        return;
      }

      // TEAM PAYMENT
      if (!state?.registrations || state.registrations.length === 0) {
        setMessage("Team registration details missing");
        setLoading(false);
        return;
      }

      for (const item of state.registrations) {
        await axios.post(
          "http://127.0.0.1:8000/api/payments",
          {
            event_student_id: item.event_student_id,
            payment_id: "PAY" + Date.now() + item.event_student_id,
            payment_type: paymentType,
            amount: state.amount || 0,
            payment_status: "paid",
            payment_date: new Date().toISOString().slice(0, 19).replace("T", " "),
            transaction_id: "TXN" + Date.now() + item.event_student_id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
      }

      setMessage("Team Booking Successfully ✅");

      setTimeout(() => {
        navigate("/success");
      }, 1200);

    } catch (err: any) {
      setMessage(err.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  const totalMembers = state?.registrations?.length || 0;

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
              <strong>Total Members:</strong> {totalMembers}
            </p>
          )}

          {!isTeam && (
            <p className="mb-2">
              <strong>Event Student ID:</strong> {state?.event_student_id}
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