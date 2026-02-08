import React from 'react';

export default function PromoBar() {
  return (
    <div className="fixed top-0 left-0 right-0 w-full bg-yellow-400 overflow-hidden z-50">
      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        .promo-text {
          animation: scroll-left 20s linear infinite;
          white-space: nowrap;
          font-weight: 600;
          letter-spacing: 0.05em;
          display: inline-block;
          padding-right: 2rem;
        }
      `}</style>
      
      <div className="py-1 px-4 text-sm md:text-base text-black flex">
        <div className="promo-text">
          🎉 GET 15% OFF ON YOUR FIRST ORDER! Use Code: FIRST15 at Checkout 🎉 ♻️ Stop buying garbage bags every month, let them show up automatically! ♻️
        </div>
        <div className="promo-text">
          🎉 GET 15% OFF ON YOUR FIRST ORDER! Use Code: FIRST15 at Checkout 🎉 ♻️ Stop buying garbage bags every month, let them show up automatically! ♻️
        </div>
      </div>
    </div>
  );
}
