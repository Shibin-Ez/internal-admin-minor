import { BASE_URL } from "@/constants/AppConstants";
import axios from "axios";

export default function Settings() {

  const handleRandomAllocate = async () => {
    const confirmResult = confirm("Are you sure you want to allocate randomly?");
    if (!confirmResult) {
      return;
    }
    const response = await axios.patch(`${BASE_URL}/admin/allocate/random`);
    console.log(response.data);
    if (response.status === 200) {
      alert("Random Allocation Successful");
    } else {
      alert("Error in Random Allocation");
    }
  };

  return (
    <div className="min-h-screen bg-white p-5">
      <h1>Testing functions</h1>
      <button
        className="bg-red-700 text-white rounded-md p-1 mt-2 px-3"
        onClick={handleRandomAllocate}
      >
        Random Allocate
      </button>
    </div>
  );
}