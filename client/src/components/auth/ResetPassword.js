import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ResetPassword = ({ match }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 10000);
      return setError("Passwords don't match!");
    }

    await axios
      .put(
        `/api/users/passwordreset/${match.params.resetToken}`,
        {
          password,
        },
        {
          header: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setSuccess(true);
        localStorage.setItem("token", res.data.token);
      })
      .catch((e) => {
        setError(e.response.data.password);
        setTimeout(() => {
          setError("");
        }, 10000);
      });
  };

  return (
    <section className="flex flex-col items-center justify-center max-h-screen pt-24">
      <div className="flex items-center justify-center w-96 px-6 bg-gray-100 shadow-xl rounded-xl dark:bg-gray-700 lg:max-w-full lg:px-16 xl:px-12">
        <div className="w-96">
          <h1 className="mt-12 text-xl font-semibold text-center text-black dark:text-gray-100 tracking-ringtighter sm:text-2xl title-font">
            Reset Password
          </h1>
          {success && (
            <div className="text-white px-3 py-3 border-0 rounded relative mb-4 mt-2 bg-green-500">
              <span className="inline-block align-middle mr-8">
                Password Successfully Updated <br />
                <div className="flex justify-center -mb-2">
                  <Link className="bg-indigo-400 rounded-xl p-1" to="/">
                    Click to Login
                  </Link>
                </div>
              </span>
              <button
                className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-3 mr-4 outline-none focus:outline-none"
                onClick={() => setSuccess(false)}
              >
                <span>×</span>
              </button>
            </div>
          )}
          {error && (
            <div className="text-white px-3 py-3 border-0 rounded relative mb-4 mt-2 bg-red-500">
              <span className="inline-block align-middle mr-8">{error}</span>
              <button
                className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-3 mr-4 outline-none focus:outline-none"
                onClick={() => setError("")}
              >
                <span>×</span>
              </button>
            </div>
          )}
          <form className="mt-6" noValidate onSubmit={onSubmit}>
            <div className="mt-4">
              <label className="block text-sm font-medium leading-relaxed tracking-tighter text-gray-700 dark:text-gray-100">
                Password
              </label>
              <input
                className="block w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-lg focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ext-black focus:border-gray-500"
                type="password"
                placeholder="New Password"
                onChange={(e) => setPassword(e.target.value.trim())}
                value={password}
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium leading-relaxed tracking-tighter text-gray-700 dark:text-gray-100">
                Confirm Password
              </label>
              <input
                className="block w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-lg focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ext-black focus:border-gray-500"
                type="password"
                name="confirmpassword"
                placeholder="Confirm New Password"
                onChange={(e) => setConfirmPassword(e.target.value.trim())}
                value={confirmPassword}
              />
            </div>
            <button
              type="submit"
              className="block w-full px-4 py-3 mt-6 font-semibold text-white transition duration-500 ease-in-out transform bg-black rounded-lg hover:bg-gray-800 hover:to-black focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 "
            >
              Reset Password
            </button>
          </form>
          <hr className="w-full my-6 border-gray-300" />
          <div className="mt-8 mb-8 text-center dark:text-gray-100">
            <div>
              Back to
              <Link
                to="/"
                className="ml-2 font-semibold text-blue-500 rounded-md dark:text-gray-100 hover:text-blue-700"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
