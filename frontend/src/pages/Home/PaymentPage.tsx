import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CreditCard, Calendar, Users, Building2, CheckCircle2 } from "lucide-react";

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

  const isTeam = state?.isTeam === true;

  const handlePayment = async () => {
    setLoading(true);
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

      if (isTeam) {
        const res = await axios.post("http://127.0.0.1:8000/api/team-name", {
          event_id: event.id,
          captain_id: Number(studentId),
          team_name: localStorage.getItem("school_name"),
          event_name: event.name,
        });
        eventStudentId = res.data.event_student_id;
      } else {
        const res = await axios.post("http://127.0.0.1:8000/api/register-event", {
          student_id: studentId,
          event_id: event.id,
          event_time: `${event.event_date} ${event.start_time}`,
          amount: event.entry_fee || 0,
        });
        eventStudentId = res.data.event_student_id;
      }

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
      toast.error(err?.response?.data?.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-[#001F3F] tracking-tight">Checkout</h2>
          <p className="text-gray-600 mt-2 text-lg">Finalize your registration details.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* BOX 1: Booking Details */}
          <div className="flex-1 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,31,63,0.08)] border border-slate-100 p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3.5 bg-slate-100 rounded-2xl text-[#001F3F]">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-2xl font-bold text-[#001F3F]">Booking Details</h3>
            </div>

            <div className="space-y-6">
              <DetailRow icon={<Users size={18}/>} label="Registration Type" value={isTeam ? "Team Entry" : "Individual Entry"} />
              <DetailRow icon={<CreditCard size={18}/>} label="Event Name" value={state?.event?.name || "N/A"} />
              {isTeam && (
                <DetailRow icon={<Building2 size={18}/>} label="School / Organization" value={localStorage.getItem("school_name") || "N/A"} />
              )}
              <DetailRow icon={<Calendar size={18}/>} label="Event Date" value={state?.event?.event_date || "N/A"} />
            </div>

            <div className="mt-10 p-5 bg-slate-100 rounded-2xl border border-slate-200">
              <p className="text-sm text-[#001F3F] leading-relaxed">
                <strong>Important:</strong> A confirmation email will be sent shortly. Please keep your transaction ID for reference at the venue.
              </p>
            </div>
          </div>

          {/* BOX 2: Payment Summary & Action */}
          <div className="w-full lg:w-[400px] bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,31,63,0.08)] border border-slate-100 overflow-hidden">
            <div className="bg-[#001F3F] p-8 text-white">
              <p className="text-white/70 text-sm font-medium uppercase tracking-wider">Total Payable</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-light">₹</span>
                <span className="text-5xl font-bold tracking-tight text-[#fecb00]">{state?.event?.entry_fee || 0}</span>
              </div>
            </div>

            <div className="p-8">
              <label className="block text-sm font-semibold text-[#001F3F] mb-3 ml-1">Payment Method</label>
              <div className="space-y-3 mb-8">
                <PaymentOption 
                  active={paymentType === "online"} 
                  onClick={() => setPaymentType("online")}
                  title="Online Payment"
                  desc="UPI, Cards, NetBanking"
                />
                <PaymentOption 
                  active={paymentType === "cash"} 
                  onClick={() => setPaymentType("cash")}
                  title="Cash on Spot"
                  desc="Pay at the venue counter"
                />
              </div>

              <button
                onClick={handlePayment}
                disabled={loading}
                className={`w-full py-4 rounded-xl font-bold transition-all duration-300 transform active:scale-[0.98] shadow-lg ${
                  loading 
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                    : "bg-[#001F3F] text-white hover:bg-[#fecb00] hover:text-[#001F3F] hover:shadow-[#fecb00]/30"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-slate-400 border-t-white rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : `Proceed to Pay ₹${state?.event?.entry_fee || 0}`}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// --- Helper Components ---

const DetailRow = ({ icon, label, value }: { icon: any, label: string, value: any }) => (
  <div className="flex items-center justify-between group">
    <div className="flex items-center gap-3 text-slate-600">
      <div className="text-[#001F3F]/60 group-hover:text-[#001F3F] transition-colors">{icon}</div>
      <span className="font-medium">{label}</span>
    </div>
    <span className="text-gray-900 font-semibold">{value}</span>
  </div>
);

const PaymentOption = ({ active, onClick, title, desc }: any) => (
  <div 
    onClick={onClick}
    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
      active ? "border-[#001F3F] bg-slate-50" : "border-slate-100 hover:border-slate-200"
    }`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className={`font-bold ${active ? "text-[#001F3F]" : "text-gray-800"}`}>{title}</p>
        <p className={`text-xs ${active ? "text-[#001F3F]/70" : "text-gray-500"}`}>{desc}</p>
      </div>
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${active ? "border-[#001F3F]" : "border-gray-300"}`}>
        {active && <div className="w-2.5 h-2.5 bg-[#001F3F] rounded-full" />}
      </div>
    </div>
  </div>
);

export default PaymentPage;