import React from "react";
import PropTypes from "prop-types";

export default function Spinner({ size = 6 }) {
  // size is in rem units (approx); convert to px for inline style: 1rem ≈ 16px
  const px = size * 4; // simplified scale
  return (
    <svg
      style={{ width: `${px}px`, height: `${px}px` }}
      className="animate-spin"
      viewBox="0 0 24 24"
      aria-hidden="true"
      role="img"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

Spinner.propTypes = {
  size: PropTypes.number,
};
