import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = ({ history }) => {
  const [email, setEMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) history.push("/dashboard");
  }, [history]);

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        "/api/users/login",
        {
          email,
          password,
        },
        {
          header: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        history.push("/dashboard");
      })
      .catch((e) => {
        setError(e.response.data);
        setTimeout(() => {
          setError("");
        }, 5000);
      });
  };

  return (
    <section className="flex flex-col items-center justify-center max-h-screen pt-24">
      <div className="flex items-center justify-center w-96 px-6 bg-gray-100 shadow-xl rounded-xl dark:bg-gray-700 lg:max-w-full lg:px-16 xl:px-12">
        <div className="w-96">
          <h1 className="mt-12 text-xl font-semibold text-center text-black dark:text-gray-100 tracking-ringtighter sm:text-2xl title-font">
            Log in to your account
          </h1>
          <form className="mt-6" noValidate onSubmit={onSubmit}>
            <div>
              <label className="block text-sm font-medium leading-relaxed tracking-tighter text-gray-700 dark:text-gray-100">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Your Email"
                className="block w-full px-4 py-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-lg focus:border-gray-500 focus:bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                autoComplete="email"
                required
                autoFocus
                onChange={(e) => setEMail(e.target.value.trim())}
                value={email}
              />
              <span className="text-red-500">
                {error.email}
                {error.emailnotfound}
                {error.passwordincorrect}
              </span>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium leading-relaxed tracking-tighter text-gray-700 dark:text-gray-100">
                Password
              </label>
              <input
                type="password"
                placeholder="Your Password"
                className="block w-full px-4 py-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-lg focus:border-gray-500 focus:bg-gray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                required
                onChange={(e) => setPassword(e.target.value.trim())}
                value={password}
              />
            </div>
            <div className="mt-2 text-right"></div>
            <button
              type="submit"
              className="block w-full px-4 py-3 mt-6 font-semibold text-white transition duration-500 ease-in-out transform bg-black rounded-lg hover:bg-gray-800 hover:to-black focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 "
            >
              Log In
            </button>
          </form>
          <hr className="w-full my-6 border-gray-300" />
          <div className="mt-8 mb-8 text-center dark:text-gray-100">
            <div>
              Need an account?
              <Link
                to="/register"
                className="ml-2 font-semibold text-blue-500 rounded-md dark:text-gray-100 hover:text-blue-700"
              >
                Sign Up
              </Link>
            </div>
            <div>
              Forgot Password?
              <Link
                to="/forgotpassword"
                className="ml-2 font-semibold text-blue-500 rounded-md dark:text-gray-100 hover:text-blue-700"
              >
                Forgot Password
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
