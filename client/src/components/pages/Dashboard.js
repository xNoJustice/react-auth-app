import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = ({ history }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("/api/users", {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((data) => {
          setUser(data.data.data);
        })
        .catch(() => localStorage.removeItem("token"));
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/");
    }
  }, [history]);

  const logout = () => {
    localStorage.removeItem("token");
    history.push("/");
    history.go(0);
  };

  return (
    <div className="flex justify-center items-center">
      <h1 className="dark:text-white text-2xl">Welcome {user && user.name}</h1>
      <Link
        className="rounded-md px-3.5 py-2 ml-3 overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600 dark:text-indigo-300 hover:text-white"
        to="/test"
      >
        Go to Test Page
      </Link>
      <button
        onClick={() => logout()}
        className="rounded-md px-3.5 py-2 ml-3 overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600"
      >
        <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-indigo-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
        <span className="relative text-indigo-600 dark:text-indigo-300 transition duration-300 group-hover:text-white ease">
          Logout
        </span>
      </button>
    </div>
  );
};

export default Dashboard;
