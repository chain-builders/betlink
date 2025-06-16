import React from "react";

interface ScrollProps {
  direction: "left" | "right";
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const scrollCarousel = (
  ref: React.RefObject<HTMLDivElement | null>,
  direction: "left" | "right"
) => {
  if (!ref.current) return;

  const { scrollLeft, clientWidth, scrollWidth } = ref.current;
  const scrollTo =
    direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;

  ref.current.scrollTo({
    left: scrollTo,
    behavior: "smooth",
  });

  // Handle infinite scroll
  if (direction === "right" && scrollTo >= scrollWidth / 2) {
    setTimeout(() => {
      if (ref.current) {
        ref.current.scrollTo({
          left: scrollTo - scrollWidth / 2,
          behavior: "auto",
        });
      }
    }, 500);
  } else if (direction === "left" && scrollTo <= 0) {
    setTimeout(() => {
      if (ref.current) {
        ref.current.scrollTo({
          left: scrollWidth / 2 - clientWidth,
          behavior: "auto",
        });
      }
    }, 500);
  }
};

const Scroll: React.FC<ScrollProps> = ({ direction, containerRef }) => {
  return (
    <button
      onClick={() => scrollCarousel(containerRef, direction)}
      className="absolute z-10 w-12 h-full rounded-md flex items-center justify-center hover:scale-110 transition-transform opacity-0 group-hover:opacity-100"
      style={{ [direction]: 0, backdropFilter: "blur(1px)" }}
      aria-label={`Scroll carousel ${direction}`}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={direction === "left" ? "M15 18L9 12L15 6" : "M9 18L15 12L9 6"}
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default Scroll;
