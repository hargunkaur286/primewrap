import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader2, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { API_BASE } from '@/lib/apiBase';

type PlanType = 'one_time' | 'sub_6m_10' | 'sub_6m_15';

const catalog: Record<
  string,
  {
    name: string;
    plans: Record<
      PlanType,
      {
        label: string;
        price: number;
        isSubscription: boolean;
        image: string;
      }
    >;
  }
> = {
  pinewrap: {
    name: 'Pinewrap',
    plans: {
      one_time: {
        label: 'One Time Purchase',
        price: 6.49,
        isSubscription: false,
        image: '/uploads/9a4802e7-c0b1-4503-ada5-a1ee29b8504b.png',
      },
      sub_6m_10: {
        label: '6-Month 10-Bags',
        price: 5.99,
        isSubscription: true,
        image: '/uploads/e2e7eb2e-d8a9-4c28-9248-a226799224b2.png',
      },
      sub_6m_15: {
        label: '6-Month 15-Bags',
        price: 7.39,
        isSubscription: true,
        image: '/uploads/e2e7eb2e-d8a9-4c28-9248-a226799224b2.png',
      },
    },
  },
};

const Checkout = () => {
  const [searchParams] = useSearchParams();

  const productSlug = searchParams.get('product') || 'pinewrap';
  const plan = (searchParams.get('plan') || 'one_time') as PlanType;
  const initialQty = Number(searchParams.get('qty') || '1');

  const selected = useMemo(() => {
    const product = catalog[productSlug];
    if (!product) return null;
    const planData = product.plans[plan];
    if (!planData) return null;
    return { product, planData };
  }, [productSlug, plan]);

  const [quantity, setQuantity] = useState(initialQty);
  const [form, setForm] = useState({
    email: '',
    name: '',
    phone: '',
    addressLine1: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'CA',
  });
  const [loading, setLoading] = useState(false);

  if (!selected) {
    return <div className="p-8 text-center text-red-600">Invalid checkout selection.</div>;
  }

  const { product, planData } = selected;
  const finalQty = planData.isSubscription ? 1 : Math.max(1, Math.min(quantity, 10));
  const subtotal = Number((planData.price * finalQty).toFixed(2));

  const onChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheckout = async () => {
    if (!form.email || !form.name || !form.addressLine1 || !form.city || !form.state || !form.postalCode) {
      toast({
        title: 'Missing details',
        description: 'Please fill in all required checkout fields.',
      });
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/api/payments/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          productSlug,
          planType: plan,
          quantity: finalQty,
          email: form.email,
          shipping: {
            name: form.name,
            phone: form.phone,
            addressLine1: form.addressLine1,
            city: form.city,
            state: form.state,
            postalCode: form.postalCode,
            country: form.country,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Unable to create checkout session');
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error: any) {
      toast({
        title: 'Checkout failed',
        description: error.message || 'Something went wrong while starting checkout.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8">
          <h1 className="text-3xl font-bold mb-6">Checkout</h1>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                className="w-full mt-1 border rounded-xl px-4 py-3"
                value={form.email}
                onChange={(e) => onChange('email', e.target.value)}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Full Name</label>
              <input
                className="w-full mt-1 border rounded-xl px-4 py-3"
                value={form.name}
                onChange={(e) => onChange('name', e.target.value)}
                placeholder="Charles.."
              />
            </div>

            <div>
              <label className="text-sm font-medium">Phone</label>
              <input
                className="w-full mt-1 border rounded-xl px-4 py-3"
                value={form.phone}
                onChange={(e) => onChange('phone', e.target.value)}
                placeholder="647.."
              />
            </div>

            <div>
              <label className="text-sm font-medium">Address</label>
              <input
                className="w-full mt-1 border rounded-xl px-4 py-3"
                value={form.addressLine1}
                onChange={(e) => onChange('addressLine1', e.target.value)}
                placeholder="123 Main Street"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">City</label>
                <input
                  className="w-full mt-1 border rounded-xl px-4 py-3"
                  value={form.city}
                  onChange={(e) => onChange('city', e.target.value)}
                  placeholder="Toronto"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Province</label>
                <input
                  className="w-full mt-1 border rounded-xl px-4 py-3"
                  value={form.state}
                  onChange={(e) => onChange('state', e.target.value)}
                  placeholder="ON"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Postal Code</label>
                <input
                  className="w-full mt-1 border rounded-xl px-4 py-3"
                  value={form.postalCode}
                  onChange={(e) => onChange('postalCode', e.target.value)}
                  placeholder="M3X..."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8 h-fit">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

          <div className="flex gap-4 mb-6">
            <img
              src={planData.image}
              alt={planData.label}
              className="w-24 h-24 object-cover rounded-2xl border"
            />
            <div>
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">{planData.label}</p>
              <p className="text-sm text-gray-500">
                {planData.isSubscription ? 'Subscription' : 'One-time payment'}
              </p>
            </div>
          </div>

          {!planData.isSubscription && (
            <div className="mb-6">
              <label className="text-sm font-medium">Quantity</label>
              <input
                type="number"
                min={1}
                max={10}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full mt-1 border rounded-xl px-4 py-3"
              />
            </div>
          )}

          <div className="space-y-3 border-t border-b py-4 mb-6">
            <div className="flex justify-between text-sm">
              <span>Unit price</span>
              <span>${planData.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Quantity</span>
              <span>{finalQty}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm rounded-xl px-4 py-3 mb-6">
            <ShieldCheck className="w-4 h-4" />
            <span>Secure checkout powered by Stripe</span>
          </div>

          <Button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full rounded-2xl py-6 text-base font-semibold"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Redirecting...
              </span>
            ) : (
              'Continue to Payment'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;