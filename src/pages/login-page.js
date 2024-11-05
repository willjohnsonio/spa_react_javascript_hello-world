import React from 'react';
import UniversalLoginContext from "@/context-providers/UniversalLoginContext";
import submitForm from "@/utils/submit-form";


const LoginScreen = () => {

  const { state } = useContext(
    UniversalLoginContext,
  );


  const formSubmitHandler = (event) => {
    event.preventDefault();

    // disable the submit button
    const submitBtn = event?.target.querySelector(
      "button#login-password-submit",
    );
    if (submitBtn) submitBtn.setAttribute("disabled", "true");

    submitForm({
      state: state,
      username: event.target.querySelector("input#username")?.value,
      password: event.target.querySelector("input#password")?.value,
    });
  };


  return (
    <div className="flex h-screen">
      {/* Login Form Side */}
      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-lg">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h2>
          <form noValidate onSubmit={formSubmitHandler} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign In
            </button>
          </form>
          {message && (
            <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
          )}
        </div>
      </div>

      {/* Abstract Art Side */}
      <div className="w-1/2 bg-blue-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Welcome Back</h1>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;