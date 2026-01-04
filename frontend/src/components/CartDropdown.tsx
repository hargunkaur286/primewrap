
// import { useCart } from '@/contexts/CartContext';
// import { X, Plus, Minus } from 'lucide-react';
// import { Button } from '@/components/ui/button';

// interface CartDropdownProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const CartDropdown = ({ isOpen, onClose }: CartDropdownProps) => {
//   const { items, updateQuantity, removeItem, getTotalPrice } = useCart();

//   if (!isOpen) return null;

//   return (
//     <>
//       {/* Backdrop */}
//       <div
//         className="fixed inset-0 bg-black/20 z-40"
//         onClick={onClose}
//       />
      
//       {/* Cart Dropdown */}
//       <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border border-sage/20 z-50">
//         <div className="p-4">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="font-semibold text-lg text-charcoal">Shopping Cart</h3>
//             <button
//               onClick={onClose}
//               className="p-1 hover:bg-sage/20 rounded-full transition-colors"
//             >
//               <X size={20} />
//             </button>
//           </div>

//           {items.length === 0 ? (
//             <p className="text-gray-500 text-center py-8">Your cart is empty</p>
//           ) : (
//             <>
//               <div className="space-y-3 max-h-64 overflow-y-auto">
//                 {items.map((item) => (
//                   <div key={item.id} className="flex items-center space-x-3 py-2">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-12 h-12 object-cover rounded-md bg-kraft"
//                     />
//                     <div className="flex-1 min-w-0">
//                       <h4 className="text-sm font-medium text-charcoal truncate">
//                         {item.name}
//                       </h4>
//                       <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <button
//                         onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                         className="p-1 hover:bg-sage/20 rounded transition-colors"
//                       >
//                         <Minus size={12} />
//                       </button>
//                       <span className="text-sm font-medium w-6 text-center">
//                         {item.quantity}
//                       </span>
//                       <button
//                         onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                         className="p-1 hover:bg-sage/20 rounded transition-colors"
//                       >
//                         <Plus size={12} />
//                       </button>
//                       <button
//                         onClick={() => removeItem(item.id)}
//                         className="p-1 hover:bg-red-100 text-red-500 rounded transition-colors ml-2"
//                       >
//                         <X size={12} />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
              
//               <div className="border-t border-sage/20 pt-4 mt-4">
//                 <div className="flex items-center justify-between mb-4">
//                   <span className="font-semibold text-charcoal">Total:</span>
//                   <span className="font-bold text-lg text-charcoal">
//                     ${getTotalPrice().toFixed(2)}
//                   </span>
//                 </div>
//                 <Button className="w-full bg-prime-blue hover:bg-prime-blue/90 text-white">
//                   CHECKOUT
//                 </Button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default CartDropdown;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { X, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MAX_ITEM_QTY = 10;

interface CartDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDropdown = ({ isOpen, onClose }: CartDropdownProps) => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, getTotalPrice } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />

      {/* Cart Dropdown */}
      <div className="absolute right-2 sm:right-0 top-full mt-2 w-[calc(100vw-2rem)] max-w-sm bg-white rounded-lg shadow-xl border border-sage/20 z-50">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg text-charcoal">Shopping Cart</h3>
            <button
              onClick={onClose}
              className="p-1 hover:bg-sage/20 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {items.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {items.map(item => (
                  <div key={item.id} className="flex items-center space-x-3 py-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-md bg-kraft"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-charcoal truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-sage/20 rounded transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= MAX_ITEM_QTY}
                        className={`p-1 rounded transition-colors ${
                          item.quantity >= MAX_ITEM_QTY
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-sage/20'
                        }`}
                      >
                        <Plus size={12} />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 hover:bg-red-100 text-red-500 rounded transition-colors ml-2"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-sage/20 pt-4 mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-charcoal">Total:</span>
                  <span className="font-bold text-lg text-charcoal">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>

                {/* Proceed to Cart button */}
                <Button
                  variant="outline"
                  className="w-full py-2"
                  onClick={() => {
                    navigate('/cart');
                    onClose();
                  }}
                >
                  Proceed to Cart
                </Button>

                {/* Checkout button */}
                <Button
                  className="w-full bg-prime-blue hover:bg-prime-blue/90 text-white"
                  onClick={() => {
                    navigate('/checkout'); // or your checkout route
                    onClose();
                  }}
                >
                  Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDropdown;
