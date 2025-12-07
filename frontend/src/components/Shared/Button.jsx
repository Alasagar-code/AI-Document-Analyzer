import React from "react";
import PropTypes from "prop-types";

export default function Button({ 
  children, 
  onClick, 
  type = "button", 
  className = "", 
  disabled = false,
  variant = "primary" // New variant prop
}) {
  // Define button styles based on variant
  const baseStyles = "inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors";
  
  const variantStyles = {
    primary: `bg-primary text-white hover:bg-primary/90 focus:ring-primary active:bg-primary/80`,
    secondary: `bg-secondary text-text border border-border hover:bg-secondary/80 focus:ring-secondary active:bg-secondary/70`,
    danger: `bg-danger text-white hover:bg-danger/90 focus:ring-danger active:bg-danger/80`,
    outline: `bg-transparent text-primary border border-primary hover:bg-primary/10 focus:ring-primary active:bg-primary/5`
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant] || variantStyles.primary} ${className}`}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'outline']),
};
