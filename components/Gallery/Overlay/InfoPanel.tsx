import React from "react";
import { ProductConfig } from "@/lib/products-data";

interface InfoPanelProps {
  product: ProductConfig;
  index: number;
}

export function InfoPanel({ product, index }: InfoPanelProps) {
  const isOdd = index % 2 !== 0;

  return (
    <div
      className="info-panel pointer-events-auto w-full max-w-md p-8 md:p-12 opacity-0"
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-white mb-2">
            {product.name}
          </h2>
          <div
            className="h-1 w-12 mb-4"
            style={{ backgroundColor: product.color }}
          />
          <p className="text-xl md:text-2xl text-white/80 font-light leading-snug">
            {product.tagline}
          </p>
        </div>

        <ul className="space-y-4 py-4 border-y border-white/10">
          {product.specs.map((spec, i) => (
            <li key={i} className="flex items-center text-white/90">
              <span
                className="w-1.5 h-1.5 rounded-full mr-3"
                style={{ backgroundColor: product.color }}
              />
              <span className="text-sm md:text-base tracking-wide uppercase font-medium">
                {spec}
              </span>
            </li>
          ))}
        </ul>

        <button
          className="group relative inline-flex items-center justify-center px-8 py-3 text-sm font-semibold text-white transition-all duration-300 ease-in-out overflow-hidden"
          style={{ backgroundColor: "transparent", border: `1px solid ${product.color}` }}
        >
          <span
            className="absolute inset-0 w-0 transition-all duration-300 ease-out group-hover:w-full"
            style={{ backgroundColor: product.color }}
          />
          <span className="relative group-hover:text-black transition-colors duration-300">
            Learn More
          </span>
        </button>
      </div>
    </div>
  );
}
