import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "danger";
  fullWidth?: boolean;
}

const variants: Record<string, string> = {
  primary: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white",
  secondary: "bg-gray-500 hover:bg-gray-700 focus:ring-gray-500 text-white",
  danger: "bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white"
};

const spinner = (
  <>
    <svg
      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  </>
);

export default function Button({
  label,
  isLoading = false,
  variant = "primary",
  fullWidth = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={`
        relative flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {isLoading ? spinner : label}
    </button>
  );
}