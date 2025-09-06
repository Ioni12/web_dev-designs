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

const AuthComponent = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePassword = (password) => {
    if (isSignUp) {
      if (password.length < 8) return "Password must be at least 8 characters";
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        return "Password must contain uppercase, lowercase, and number";
      }
    } else {
      if (password.length < 6) return "Password must be at least 6 characters";
    }
    return null;
  };

  const validate = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else {
      const passwordError = validatePassword(formData.password);
      if (passwordError) newErrors.password = passwordError;
    }

    // Sign up specific validations
    if (isSignUp) {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords don't match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setLoading(true);

      setTimeout(() => {
        if (isSignUp) {
          alert(
            `Account created for ${formData.firstName} ${formData.lastName}!`
          );
        } else {
          alert(`Welcome back! Signed in as ${formData.email}`);
        }
        setLoading(false);
      }, 1500);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      rememberMe: false,
    });
    setErrors({});
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="py-8">
        {/* Toggle Buttons */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-2 border-2 border-zinc-300 shadow-lg mt-22">
            <div className="flex">
              <button
                onClick={() => {
                  if (isSignUp) toggleMode();
                }}
                className={`px-8 py-3 rounded-2xl font-mono text-lg transition-all duration-300 ${
                  !isSignUp
                    ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                SIGN IN
              </button>
              <button
                onClick={() => {
                  if (!isSignUp) toggleMode();
                }}
                className={`px-8 py-3 rounded-2xl font-mono text-lg transition-all duration-300 ${
                  isSignUp
                    ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                SIGN UP
              </button>
            </div>
          </div>
        </div>

        {/* Auth Form */}
        <div className="flex items-center justify-center p-4 mt-22">
          <div className="w-full max-w-2xl">
            <div className="rounded-[40px] shadow-lg border border-zinc-400 bg-white/80 backdrop-blur-sm p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-mono tracking-wider mb-2">
                  {isSignUp ? "CREATE ACCOUNT" : "WELCOME BACK"}
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full"></div>
              </div>

              <div className="space-y-6">
                {/* Sign Up Fields */}
                {isSignUp && (
                  <>
                    <CoolInput
                      name="firstName"
                      label="First Name"
                      type="text"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required={true}
                      error={errors.firstName}
                    />
                    <CoolInput
                      name="lastName"
                      label="Last Name"
                      type="text"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required={true}
                      error={errors.lastName}
                    />
                  </>
                )}

                {/* Common Fields */}
                <CoolInput
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required={true}
                  error={errors.email}
                />

                <CoolInput
                  name="password"
                  label="Password"
                  type="password"
                  placeholder={
                    isSignUp ? "Create a password" : "Enter your password"
                  }
                  value={formData.password}
                  onChange={handleChange}
                  required={true}
                  error={errors.password}
                />

                {/* Sign Up Confirm Password */}
                {isSignUp && (
                  <CoolInput
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required={true}
                    error={errors.confirmPassword}
                  />
                )}

                {/* Sign In Options */}
                {!isSignUp && (
                  <div className="flex justify-between items-center text-sm">
                    <label className="flex items-center text-gray-600">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        className="mr-2 rounded"
                      />
                      Remember me
                    </label>
                    <button
                      type="button"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                {/* Sign Up Terms */}
                {isSignUp && (
                  <div className="text-sm text-gray-600 text-center">
                    By signing up, you agree to our Terms of Service and Privacy
                    Policy
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`w-full px-6 py-4 rounded-2xl font-mono text-lg shadow-lg transition-colors duration-200 tracking-wide ${
                    loading
                      ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                      : "bg-purple-100 text-gray-900 hover:bg-amber-500 cursor-pointer"
                  }`}
                >
                  {loading
                    ? "Loading..."
                    : isSignUp
                    ? "Create Account"
                    : "Sign In"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Social Sign In Options */}
        <div className="max-w-2xl mx-auto px-4 mt-6">
          <div className="text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-500 font-mono">
                  OR CONTINUE WITH
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-center space-x-4">
              <button className="px-6 py-3 bg-white/80 backdrop-blur-sm border-2 border-zinc-300 rounded-2xl hover:bg-white transition-all duration-300 shadow-md">
                <span className="font-mono text-sm">GOOGLE</span>
              </button>
              <button className="px-6 py-3 bg-white/80 backdrop-blur-sm border-2 border-zinc-300 rounded-2xl hover:bg-white transition-all duration-300 shadow-md">
                <span className="font-mono text-sm">GITHUB</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;
