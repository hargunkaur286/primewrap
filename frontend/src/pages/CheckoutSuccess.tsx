import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const CheckoutSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchSession = async () => {
      if (!sessionId) return;

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/payments/session/${sessionId}`,
        {
          credentials: 'include',
        }
      );
      const json = await res.json();
      setData(json);
    };

    fetchSession();
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white rounded-3xl shadow-sm p-8 max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold mb-4">Payment Successful</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your order. Your payment has been received.
        </p>

        {data && (
          <div className="text-left bg-slate-50 rounded-2xl p-4 space-y-2">
            <div className="flex justify-between">
              <span>Email</span>
              <span>{data.customerEmail}</span>
            </div>
            <div className="flex justify-between">
              <span>Amount</span>
              <span>
                ${((data.amountTotal || 0) / 100).toFixed(2)} {String(data.currency || '').toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Type</span>
              <span>{data.mode}</span>
            </div>
            <div className="flex justify-between">
              <span>Payment Status</span>
              <span>{data.paymentStatus}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutSuccess;