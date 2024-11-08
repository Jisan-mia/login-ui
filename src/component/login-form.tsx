import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useCallback, useState } from "react";

interface FormErrors {
  email?: string;
  password?: string;
}

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateForm = useCallback(() => {
    const newErrors: FormErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    if (validateForm()) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // redirect to dashboard or respective page after login successful
      } catch (error) {
        console.error("Login failed", error);
        setSubmitError(
          "An error occurred while logging in. Please try again later."
        );
      }
    }

    setIsSubmitting(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex justify-center" aria-hidden="true">
          <div className="w-12 h-12 rounded-full bg-[#004E2C] flex items-center justify-center text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-center text-2xl font-semibold text-gray-900">
          Log in to your account
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email or username
            </label>
            <div className="mt-1">
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
                className={`appearance-none block w-full px-3 py-3.5 border ${
                  errors.email ? "border-red-300" : "border-slate-800"
                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-300 sm:text-sm`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1 relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                autoComplete="current-password"
                required
                className={`appearance-none block w-full px-3 py-3.5 border ${
                  errors.password ? "border-red-300" : "border-slate-800"
                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-300  sm:text-sm`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={errors.password ? "true" : "false"}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOffIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                ) : (
                  <EyeIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-600" id="password-error">
                {errors.password}
              </p>
            )}
            <div className="text-sm mt-2">
              <a
                href="#"
                className="font-medium text-[#004E2C] hover:text-[#004e2cdc]"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3.5 px-4 border border-black rounded-md shadow-sm text-sm font-medium text-white bg-[#004E2C] hover:bg-[#004e2ce5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004e2c83] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Log in"}
            </button>
          </div>

          {submitError && (
            <div>
              <h3>Error</h3>
              <p>{submitError}</p>
            </div>
          )}

          <div className="text-sm text-center">
            <span className="text-gray-600">No account?</span>{" "}
            <a
              href="#"
              className="font-medium text-[#004E2C] hover:text-[#004e2cdc]"
            >
              Create an account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
