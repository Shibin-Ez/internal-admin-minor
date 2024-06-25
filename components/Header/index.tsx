import { FaChevronDown, FaPlus, FaUpload } from "react-icons/fa";
import React from "react";

interface HeaderProps {
    setShowUploadModal?: (value: boolean) => void;
    customBtn: {
        text: string;
        icon: React.ReactNode;
    }
}

export default function Header({
    setShowUploadModal,
    customBtn
}: HeaderProps) {
    return (
        <div className="w-full h-20 bg-[#1E293B] flex justify-end items-end px-2">
            <div onClick={() => 
                setShowUploadModal && setShowUploadModal(true)
            } className="rounded bg-white my-1 mx-2 h-8 justify-between px-2 w-28 items-center flex text-gray-500 cursor-pointer">
                <p className="text-sm">{customBtn.text}</p>
                {customBtn.icon}
            </div>
            <div className="w-20 rounded bg-white my-1 mx-2 h-8 justify-between px-1 items-center flex text-gray-500">
                <p className="text-sm">Filter</p>
                <FaChevronDown size={10} />
            </div>
            <input className="my-1 rounded w-[20rem] bg-white px-1 py-1 focus:ring-0 focus:ring-none focus:outline-none" placeholder="Search" />
        </div>
    )
}