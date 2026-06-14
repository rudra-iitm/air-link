import React from "react";
import { productsData } from "@/lib/products-data";

interface NavigationProps {
  activeIndex: number;
  onNavigate: (index: number) => void;
}

export function Navigation({ activeIndex, onNavigate }: NavigationProps) {
  return (
    <div className="fixed right-6 md:right-12 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center space-y-4 mix-blend-difference">
      {productsData.map((product, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={product.id}
            onClick={() => onNavigate(index)}
            className="group relative flex items-center justify-center w-8 h-8 focus:outline-none"
            aria-label={`Navigate to ${product.name}`}
          >
            <span
              className={`absolute transition-all duration-500 ease-out rounded-full ${
                isActive ? "w-3 h-3" : "w-1.5 h-1.5 group-hover:w-2 group-hover:h-2"
              }`}
              style={{
                backgroundColor: isActive ? product.color : "rgba(255, 255, 255, 0.4)",
              }}
            />
          </button>
        );
      })}
    </div>
  );
}
