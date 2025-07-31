import { ChangeEventHandler, ReactNode } from "react";

interface FormTextInputProps {
  className?: string;
  label: string;
  name?: string;
  rows?: number;
  value?: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  icon?: ReactNode;
  placeholder: string;
  required?: boolean;
}

export default function FormTextInput({
  className = "",
  label,
  name = label,
  rows = 1,
  value = "",
  onChange,
  icon,
  placeholder,
  required = false,
}: FormTextInputProps) {
  return (
    <div className={className}>
      {icon ? (
        <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          <div className="flex gap-2 items-center mr-1">
            {icon}
            {label}
            {required && <span className="text-red-500">*</span>}
          </div>
        </label>
      ) : (
        <label className="text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
      )}

      <textarea
        className="w-full p-1.5 border border-gray-300 text-gray-700 rounded-md"
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
