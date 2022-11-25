import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../helper/api";

function Login() {

  //navigate method for routing from one component to another
  const navigate = useNavigate();

  // useState for saving email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // login method 
  const login = async (e) => {
    e.preventDefault();
    if(!email || !password){
      alert("email or password cannot be null!")
    }else{
      try {
        const res = await api.post('/login', { email, password });
        const result = await res.data;
        if(result.success === true){
          navigate("/vehicle-details")
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  return (
    <div>
      <div class="min-h-screen flex items-center">
        <div class="w-full">
          <h2 class="text-center font-bold text-2xl uppercase mb-10">
            Login
          </h2>
          <div class="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
            <form action="">
              <div class="mb-5">
                <label for="name" class="block mb-2 font-bold text-gray-600">
                  Email
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email."
                  class="border border-gray-300 shadow p-3 w-full rounded mb-"
                />
              </div>

              <div class="mb-5">
                <label for="password" class="block mb-2 font-bold text-gray-600">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="enter password."
                  class="border border-red-300 shadow p-3 w-full rounded mb-"
                />
              </div>

              <div className="">
                <p className="text-center">If no account registered then click on register button</p>
                <div className="flex justify-center">
                  <button onClick={(e) => navigate("/register")} class="bg-red-500 text-white font-bold p-4 rounded-lg mt-4 mb-4">
                    register
                  </button>
                </div>
              </div>

              <button onClick={(e) => login(e)} class="block w-full bg-blue-500 text-white font-bold p-4 rounded-lg">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
