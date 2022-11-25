import React, { useState } from "react";
import cryptoRandomString from 'crypto-random-string';
import { api } from "../helper/api";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  // useState for name and email
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  

  // method for calling registarion api and creating user
  const registerUser = async(e) => {
    e.preventDefault();
    if(!name || !email){
      alert("name or email cannot bee null")
    }else{
      const randomPassword = cryptoRandomString({length:20});
    try {
      const res = await api.post('/register', { name, email, password: randomPassword });
      const result = await res.data;
      if(result.success === true){
        alert("account is created successfully. Please check you email for password and then login.")
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
            Sign Up
          </h2>
          <div class="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
            <form action="">
              <div class="mb-5">
                <label for="name" class="block mb-2 font-bold text-gray-600">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter email."
                  class="border border-gray-300 shadow p-3 w-full rounded mb-"
                />
              </div>

              <div class="mb-5">
                <label for="name" class="block mb-2 font-bold text-gray-600">
                  Email
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email."
                  class="border border-gray-300 shadow p-3 w-full rounded mb-"
                />
              </div>

              <div className="">
                <p className="text-center">If already registered then click on login</p>
                <div className="flex justify-center">
                  <button onClick={(e) => navigate("/")} class="bg-red-500 text-white font-bold p-4 rounded-lg mt-4 mb-4">
                    login
                  </button>
                </div>
              </div>

              <div className="flex justify-center mb-4">
                <p>Random password will be generated and sent on mail</p>
              </div>
              <button onClick={(e) => registerUser(e)} class="block w-full bg-blue-500 text-white font-bold p-4 rounded-lg">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
