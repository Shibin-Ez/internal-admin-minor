import React from "react";
import Sidebar from "@/components/Sidebar";
import Table from "@/components/Table";
import { FaChevronDown } from "react-icons/fa";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Students from "@/screen/Students";
import Courses from "@/screen/Courses";
import LoadingSpinner from "@/components/LoadingSpinner";
import Settings from "@/screen/Settings";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const [renderComponent, setRenderComponent] = React.useState('students');

  return (
    <main className="flex bg-[#D9D9D9]">
      <Sidebar
        renderComponent={renderComponent}
        setRenderComponent={setRenderComponent}
      />
      <div className="w-full min-h-screen">
        {
          renderComponent === 'students' ?
            <Students /> :
            renderComponent === 'courses' ?
              <Courses /> :
              renderComponent === 'settings' ?
                <Settings /> :
                <LoadingSpinner />
        }
      </div>
    </main>
  );
}
