import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// interface PaymentPageState {
//   isTeam?: boolean;
//   event_student_id?: number;
//   event_name?: string;
//   amount?: number;
//   team_name?: string;
//   team_id?: number;
// }
interface PaymentPageState {
  event: any;
  isTeam: boolean;
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
  const getErrorMessage = (err: any) => {
    return (
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Something went wrong ❌"
    );
  };
 const handlePayment = async () => {
  setLoading(true);
  setMessage("");

  try {
    const studentId = localStorage.getItem("student_id");
    const { event, isTeam } = state;

    if (!event) {
      toast.error("Event data missing ❌");
      return;
    }

    if (!studentId) {
      toast.error("Please login first ❌");
      return;
    }

    let eventStudentId = null;

    // ✅ TEAM BOOKING
    if (isTeam) {
      try {
        const res = await axios.post("http://127.0.0.1:8000/api/team-name", {
          event_id: event.id,
          captain_id: Number(studentId),
          team_name: localStorage.getItem("school_name"),
          event_name: event.name,
        });

        eventStudentId = res.data.event_student_id;

      } catch (err: any) {
        toast.error("Team Booking Error: " + getErrorMessage(err));
        return;
      }
    } 
    
    // ✅ SOLO BOOKING
    else {
      try {
        const res = await axios.post("http://127.0.0.1:8000/api/register-event", {
          student_id: studentId,
          event_id: event.id,
          event_time: `${event.event_date} ${event.start_time}`,
          amount: event.entry_fee || 0,
        });

        eventStudentId = res.data.event_student_id;

      } catch (err: any) {
        toast.error("Booking Error: " + getErrorMessage(err));
        return;
      }
    }

    // ✅ PAYMENT
    try {
      await axios.post("http://127.0.0.1:8000/api/payments", {
        event_student_id: eventStudentId,
        payment_id: "PAY" + Date.now(),
        payment_type: paymentType,
        amount: event.entry_fee || 0,
        payment_status: "paid",
        payment_date: new Date().toISOString().slice(0, 19).replace("T", " "),
        transaction_id: "TXN" + Date.now(),
      });

      toast.success("Booking + Payment Success ✅");

      setTimeout(() => navigate("/"), 1500);

    } catch (err: any) {
      toast.error("Payment Error: " + getErrorMessage(err));
    }

  } catch (err: any) {
    toast.error(getErrorMessage(err));
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
            <strong>Event Name:</strong> {state?.event?.name}
          </p>

          {isTeam && (
            <p className="mb-2">
              <strong>Team Name:</strong> {localStorage.getItem("school_name")}
            </p>
          )}

          <p className="mb-4">
            <strong>Amount:</strong> ₹{state?.event?.entry_fee || 0}
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