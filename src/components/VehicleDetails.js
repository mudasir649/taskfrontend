import React, { useEffect, useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../helper/api";
import { toast } from "react-toastify"
import getApi from "../helper/getApi";
import ReactPaginate from "react-paginate"

function VehicleDetails() {
    const navigate = useNavigate();

    // useStates for fetching data and paginations
    const [vehicleDetails, setVehicleDetails] = useState("");
    const [page, setPage] = useState("");
    const [count, setCount] = useState("");

    // useFFect hook for fetching data
    useEffect(() => {
      onPaginate(1)
      setPage(1)
        getApi().then(data => {
          console.log(data);
          if(data.success === true){
            setVehicleDetails(data.data)
          }})
    }, [setVehicleDetails])

    // delete method to delete specific record using id
    const deleteVehicle = async(e, id) => {
      e.preventDefault();
      try {
        const res = await api.delete(`/deleteVehicle/${id}`);
        const result = await res.data;
        if(result.success === true){
          toast(result.message)
          await getApi().then(data => {
            if(data.success === true){
              setVehicleDetails(data.data)
            }
          })
        }
      } catch (error) {
        console.log(error);
      }
    }

    // paginate method for page navigation
    const onPaginate = async(page) => {
      const res = await api.get(`/getPaginatedData?page=${page}`)
      const result = await res.data;
      setVehicleDetails(result.data)
      setCount(result.count)
      setPage(page)
    }

    return (
    <div className="mt-16 ml-32 mr-32">
      <h1 className="font-bold text-lg text-center">Vehicle Records</h1>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <button onClick={() => {navigate("/new-vehicle")}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mb-4 ml-16">
          Add new vehicle
        </button>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
            <th scope="col" className="py-3 px-6">
                #
              </th>
              <th scope="col" className="py-3 px-6">
                Vehicle Type
              </th>
              <th scope="col" className="py-3 px-6">
                Color
              </th>
              <th scope="col" className="py-3 px-6">
                Model
              </th>
              <th scope="col" className="py-3 px-6">
                Make
              </th>
              <th scope="col" className="py-3 px-6">
                Registration number
              </th>
              <th scope="col" className="py-3 px-6">
                Edit

                
                Delete
              </th>
            </tr>
          </thead>
          <tbody>

          {vehicleDetails === "" ? ("") : (
          <>
          {vehicleDetails?.map((vehicle, i) =>(
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {page * 10 - 9 + i}
              </th>
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {vehicle.type}
              </th>
              <td className="py-4 px-6">{vehicle.color}</td>
              <td className="py-4 px-6">{vehicle.model}</td>
              <td className="py-4 px-6">{vehicle.make}</td>
              <td className="py-4 px-6">{vehicle.registration_no}</td>
              <td className="py-4 px-6">
                <button onClick={() => {navigate('/editVehicle', {state:{id: vehicle._id}})}} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  Edit
                </button>
                <button onClick={(e) => {deleteVehicle(e, vehicle._id)}} className="font-medium text-red-600 ml-4 dark:text-blue-500 hover:underline">
                  Delete
                </button>
              </td>
            </tr>
            ))}
          </>)}
          </tbody>
        </table>
      </div>
      
      <div className="md:w-2/5 w-full Helveticaneue md:my-0  md:order-none order-3  flex justify-center  my-4 md:text-left text-center ">
          <nav aria-label="Page navigation ">
            <div className="paginate text-[#333333]">
              <ReactPaginate
                breakLabel="..."
                nextLabel="Next "
                onPageChange={({ selected }) => onPaginate(selected + 1)}
                pageRangeDisplayed={5}
                pageCount={count / 10}
                previousLabel=" previous"
                renderOnZeroPageCount={null}
              />
            </div>
          </nav>
        </div>
    </div>
  );
}

export default memo(VehicleDetails);
