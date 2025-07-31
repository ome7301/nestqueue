import { ChangeEventHandler, ReactNode } from "react";

interface FormSelectInputProps {
  className?: string;
  label: string;
  name?: string;
  value?: string | number;
  options: Readonly<string[] | number[]>;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  icon?: ReactNode;
}

export default function FormSelectInput({
  className = "",
  label,
  name = label,
  value,
  options,
  onChange,
  icon,
}: FormSelectInputProps) {
  return (
    <div className={className}>
      {icon ? (
        <label className="flex items-center text-sm text-gray-700 mb-1">
          <div className="flex gap-2 items-center mr-1">
            {icon}
            <span>{label}</span>
          </div>
        </label>
      ) : (
        <label className="block text-sm text-gray-700 mb-1">{label}</label>
      )}

      <select
        name={name}
        value={value || ""}
        onChange={onChange}
        className="w-full p-1.5 border border-gray-300 text-gray-700 rounded-md"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
