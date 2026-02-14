import React from "react";

import { cn } from "@/lib/utils";

type BrandLoaderProps = {
  className?: string;
};

const BrandLoader: React.FC<BrandLoaderProps> = ({ className }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center", className)}>
      <img
        src="/uploads/logo.png"
        alt="Primewrap Logo"
        className="h-12 w-12 object-contain opacity-60 grayscale"
      />
      <p className="mt-3 px-6 text-sm text-muted-foreground">
        Never run out of garbage bags again
      </p>
    </div>
  );
};

export default BrandLoader;
