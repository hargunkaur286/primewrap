import React from "react";

import { cn } from "@/lib/utils";

type BrandLoaderProps = {
  className?: string;
};

const BrandLoader: React.FC<BrandLoaderProps> = ({ className }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center", className)}>
      <img
        src="/uploads/logo-48.webp"
        srcSet="/uploads/logo-36.webp 36w, /uploads/logo-48.webp 48w, /uploads/logo-64.webp 64w, /uploads/logo-96.webp 96w, /uploads/logo-128.webp 128w"
        sizes="48px"
        width={48}
        height={48}
        alt="Primewrap Logo"
        className="h-12 w-12 object-contain opacity-60 grayscale"
        decoding="async"
      />
      <p className="mt-3 px-6 text-sm text-muted-foreground">
        Never run out of garbage bags again
      </p>
    </div>
  );
};

export default BrandLoader;
