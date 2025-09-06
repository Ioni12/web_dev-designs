import React, { useState } from "react";

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  required = false,
  error = "",
  options = null, // For select dropdown
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.toString().length > 0;
  const isSelect = type === "select" && options;

  return (
    <div className="relative mb-4">
      {isSelect ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border-2 border-zinc-300 rounded-2xl text-base focus:outline-none focus:border-blue-400 focus:bg-white/80 transition-all duration-300"
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          required={required}
          className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border-2 border-zinc-300 rounded-2xl text-base focus:outline-none focus:border-blue-400 focus:bg-white/80 transition-all duration-300"
          {...props}
        />
      )}

      {label && (
        <label
          className={`absolute left-4 transition-all duration-300 pointer-events-none ${
            isFocused || hasValue
              ? "text-xs text-blue-600 -top-2 bg-white px-2 rounded-full"
              : "text-gray-500 top-3"
          }`}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {error && <div className="mt-1 text-sm text-red-600">{error}</div>}
    </div>
  );
};

export default Input;
