import { FaChevronDown, FaPlus, FaUpload } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/constants/AppConstants";

interface HeaderProps {
  customBtn: {
    text: string;
    icon: React.ReactNode;
    onClick: () => void;
  };
  maxStudents: number;
  setMaxStudents: (value: number) => void;
  minStudents: number;
  setMinStudents: (value: number) => void;
}

export default function Header({
  customBtn,
  maxStudents,
  setMaxStudents,
  minStudents,
  setMinStudents,
}: HeaderProps) {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  // const [maxStudents, setMaxStudents] = useState(() => {
  //   const savedMax = localStorage.getItem('maxStudents');
  //   return savedMax !== null ? Number(savedMax) : 50;
  // });

  // const [minStudents, setMinStudents] = useState(() => {
  //   const savedMin = localStorage.getItem('minStudents');
  //   return savedMin !== null ? Number(savedMin) : 10;
  // });

  const handleApply = async () => {
    const response = await axios.patch(`${BASE_URL}/admin/allocate/confirm?max=${maxStudents}&min=${minStudents}`);
    console.log(response.data);

    setIsFilterOpen(false);
    if (response.status === 200) {
      alert("Result Published Successfully");
    } else {
      alert("Error in Publishing Result");
    }
  };

  useEffect(() => {
    localStorage.setItem("maxStudents", maxStudents.toString());
  }, [maxStudents]);

  useEffect(() => {
    localStorage.setItem("minStudents", minStudents.toString());
  }, [minStudents]);

  return (
    <div className="w-full h-20 bg-[#1E293B] flex justify-end items-end px-2">
      <div
        onClick={() => customBtn.onClick()}
        className="rounded bg-white my-1 mx-2 h-8 justify-between px-2 w-28 items-center flex text-gray-500 cursor-pointer"
      >
        <p className="text-sm">{customBtn.text}</p>
        {customBtn.icon}
      </div>
      <div
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="w-20 rounded bg-white my-1 mx-2 h-8 justify-between px-1 items-center flex text-gray-500"
      >
        <p className="text-sm">Filter</p>
        <FaChevronDown size={10} />
      </div>
      {isFilterOpen && (
        <div className="absolute bg-white top-20 right-4 p-5 mt-2 z-10 border border-black rounded-md flex flex-col justify-center items-center">
          <div>
            <label>Maximum Students per Course &nbsp;</label>
            <input
              type="number"
              value={maxStudents}
              onChange={(e) => setMaxStudents(parseInt(e.target.value))}
              className="border border-gray-300 rounded-md p-1 w-12 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label>Minimum Students per Course &nbsp;</label>
            <input
              type="number"
              value={minStudents}
              onChange={(e) => setMinStudents(parseInt(e.target.value))}
              className="border border-gray-300 rounded-md p-1 w-12 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <button
              className="bg-red-700 text-white rounded-md p-1 mt-2 px-3"
              onClick={handleApply}
            >
              Publish Result
            </button>
          </div>
        </div>
      )}
      {/* <input
        className="my-1 rounded w-[20rem] bg-white px-1 py-1 focus:ring-0 focus:ring-none focus:outline-none"
        placeholder="Search"
      /> */}
    </div>
  );
}
