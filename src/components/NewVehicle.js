import React, { useState } from "react";
import { api } from "../helper/api";
import { toast, ToastContainer } from "react-toastify"
import { useNavigate } from "react-router-dom";

function NewVehicle() {

  const navigate = useNavigate();

  // useState for saving vehicle record
  const [vehicleDetails, setVehicleDetails] = useState({
    type: "",
    color: "",
    model: "",
    make: "",
    registration_no: Number
  })

  // onChange method to save data in state
  const vehicleInfo = (e) => {
    setVehicleDetails({...vehicleDetails, [e.target.name]: e.target.value});
  }

  // method to save data into database.
  const submitData = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/postVehicle', vehicleDetails);
      const result = await res.data;
      console.log(result);
      if(result.success === true){
        toast(result.message)
        navigate('/vehicle-details')
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="mt-16 ml-32 mr-32">
      <h1 className="font-bold text-lg text-center">Add vehicle record</h1>
      <ToastContainer autoClose={100} />
      <form onSubmit={submitData}>
        <div className="relative z-0 mb-6 w-full group">
          <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
            <select id="type" defaultValue={'DEFAULT'} name="type" onChange={vehicleInfo} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option defaultValue={''} selected>Choose a vehicle category</option>
            <option value="sedan">sedan</option>
            <option value="bus">Bus</option>
            <option value="hatchback">Hatchback</option>
            <option value="Suv">Suv</option>
            </select>
          </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Color
          </label>
          <input
            type="text"
            id="color"
            name="color"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter color"
            onChange={vehicleInfo}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Model
          </label>
          <input
            type="text"
            id="model"
            name="model"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter model"
            onChange={vehicleInfo}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="make"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Make
          </label>
          <input
            type="make"
            id="make"
            name="make"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter make"
            onChange={vehicleInfo}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="registration_num"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Registration Number
          </label>
          <input
            type="registration_no"
            id="registration_no"
            name="registration_no"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter registration number"
            onChange={vehicleInfo}
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
        <div className="flex justify-end">
        <button
          onClick={() => {navigate("/vehicle-details")}}
          className="text-white bg-gray-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Back
        </button>
        </div>
      </form>
    </div>
  );
}

export default NewVehicle;


