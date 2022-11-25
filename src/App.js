import NewVehicle from "./components/NewVehicle";
import VehicleDetails from "./components/VehicleDetails";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import EditVehicle from "./components/EditVehicleDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/new-vehicle" element={<NewVehicle />} />
      <Route path="/vehicle-details" element={<VehicleDetails />} />
      <Route path="/" element={<Login />} />
      <Route path="/editVehicle" element={<EditVehicle />} />
      <Route path="/register" element={<Signup />} />

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
