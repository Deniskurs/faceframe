import React from "react";

interface ServiceIndicatorsProps {
  totalCount: number;
  activeIndex: number;
  onClick: (index: number) => void;
}

export function ServiceIndicators({
  totalCount,
  activeIndex,
  onClick,
}: ServiceIndicatorsProps) {
  return (
    <div className="flex justify-center space-x-4 sm:space-x-5">
      {Array.from({ length: totalCount }).map((_, i) => (
        <button
          key={i}
          onClick={() => onClick(i)}
          className="group p-3 focus:outline-none"
          aria-label={`Go to slide ${i + 1}`}
        >
          <div
            className={`transition-all duration-700 ease-out ${
              activeIndex === i
                ? "w-10 h-[2px] bg-elegant-mocha opacity-100 transform scale-x-100"
                : "w-5 h-[1px] bg-elegant-mocha/30 group-hover:bg-elegant-mocha/50 group-hover:w-7"
            }`}
            style={{
              transformOrigin: "center",
              transition: "all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
            }}
          />
        </button>
      ))}
    </div>
  );
}
