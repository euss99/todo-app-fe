import { type InputHTMLAttributes } from "react"

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  isFirst?: boolean
  isLast?: boolean
}

export default function FormInput({
  label,
  error,
  isFirst = false,
  isLast = false,
  className = "",
  ...props
}: FormInputProps) {
  const getRoundedClasses = () => {
    if (isFirst && isLast) return "rounded-md"
    if (isFirst) return "rounded-t-md"
    if (isLast) return "rounded-b-md"
    return ""
  }

  return (
    <div>
      <label htmlFor={props.id} className="sr-only">
        {label}
      </label>
      <input
        {...props}
        className={`appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white ${getRoundedClasses()} focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-base dark:bg-gray-800 ${className}`}
      />
      {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  )
}