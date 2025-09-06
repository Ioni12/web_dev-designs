import React, { useState } from "react";

const CoolInput = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  required = false,
  error = "",
  options = null,
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
          placeholder={isFocused ? placeholder : ""}
          required={required}
          className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border-2 border-zinc-300 rounded-2xl text-base focus:outline-none focus:border-blue-400 focus:bg-white/80 transition-all duration-300"
          {...props}
        />
      )}

      {label && (
        <label
          className={`absolute left-4 transition-all duration-300 pointer-events-none ${
            isFocused || hasValue
              ? "text-xs text-blue-600 -top-3 bg-white px-2 rounded-full shadow-sm"
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

const CoolForm = ({
  title,
  fields,
  onSubmit,
  submitText = "Submit",
  loading = false,
  className = "",
  children,
}) => {
  const [formData, setFormData] = useState(() => {
    const initial = {};
    fields.forEach((field) => {
      initial[field.name] = field.defaultValue || "";
    });
    return initial;
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] =
          field.errorMessage || `${field.label} is required`;
      }

      // Custom validation
      if (field.validate && formData[field.name]) {
        const customError = field.validate(formData[field.name]);
        if (customError) {
          newErrors[field.name] = customError;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className={`flex items-center justify-center p-4 ${className} mt-22`}>
      <div className="w-full max-w-2xl">
        <div className="rounded-[40px] shadow-lg border border-zinc-400 bg-white/80 backdrop-blur-sm p-8">
          {title && (
            <div className="text-center mb-8">
              <h2 className="text-3xl font-mono tracking-wider mb-2">
                {title}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full"></div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {fields.map((field) => (
              <CoolInput
                key={field.name}
                {...field}
                value={formData[field.name]}
                onChange={handleChange}
                error={errors[field.name]}
              />
            ))}

            {children}

            <button
              type="submit"
              disabled={loading}
              className={`w-full px-6 py-4 rounded-2xl font-mono text-lg shadow-lg transition-colors duration-200 tracking-wide ${
                loading
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-purple-100 text-gray-900 hover:bg-amber-500 cursor-pointer"
              }`}
            >
              {loading ? "Loading..." : submitText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Demo showing how to use the form
const FormDemo = () => {
  const [loading, setLoading] = useState(false);

  const exerciseFields = [
    {
      name: "name",
      label: "Exercise Name",
      type: "text",
      placeholder: "Enter exercise name",
      required: true,
      errorMessage: "Exercise name is required",
    },
    {
      name: "type",
      label: "",
      type: "select",
      placeholder: "Select exercise type",
      required: true,
      options: [
        { value: "reps", label: "Reps" },
        { value: "time", label: "Time" },
        { value: "distance", label: "Distance" },
        { value: "weight", label: "Weight" },
      ],
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      placeholder: "Optional description",
    },
  ];

  const contactFields = [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      placeholder: "Enter your name",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      required: true,
      validate: (value) => {
        if (!/\S+@\S+\.\S+/.test(value)) {
          return "Please enter a valid email";
        }
        return null;
      },
    },
    {
      name: "message",
      label: "Message",
      type: "text",
      placeholder: "Enter your message",
      required: true,
    },
  ];

  const handleExerciseSubmit = async (data) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      alert(`Exercise created: ${data.name} (${data.type})`);
      setLoading(false);
    }, 1000);
  };

  const handleContactSubmit = async (data) => {
    alert(`Contact form submitted for ${data.name}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="space-y-8 py-8">
        <CoolForm
          title="CREATE EXERCISE"
          fields={exerciseFields}
          onSubmit={handleExerciseSubmit}
          submitText="Create Exercise"
          loading={loading}
        />

        <CoolForm
          title="CONTACT US"
          fields={contactFields}
          onSubmit={handleContactSubmit}
          submitText="Send Message"
        >
          <div className="text-sm text-gray-600 text-center">
            We'll get back to you within 24 hours
          </div>
        </CoolForm>
      </div>
    </div>
  );
};

export default FormDemo;
export { CoolForm, CoolInput };
