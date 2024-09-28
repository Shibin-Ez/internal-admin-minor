import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Table from "@/components/Table";
import { FaChevronDown } from "react-icons/fa";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Students from "@/screen/Students";
import Courses from "@/screen/Courses";
import LoadingSpinner from "@/components/LoadingSpinner";
import Settings from "@/screen/Settings";
import Timeline from "@/screen/Timeline";
import { render } from "react-dom";
import StudentWise from "@/screen/AllotmentDetails/StudentWise";
import CourseWise from "@/screen/AllotmentDetails/CourseWise";
import StudentsByCourse from "@/screen/AllotmentDetails/CourseWise/StudentsByCourse";

export default function Home() {
  const [renderComponent, setRenderComponent] = useState("students");
  const [renderData, setRenderData] = useState([]);
  const [toggleChange, setToggleChange] = useState(false);

  const [maxStudents, setMaxStudents] = useState(50);
  const [minStudents, setMinStudents] = useState(10);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedMax = localStorage.getItem("maxStudents");
      const savedMin = localStorage.getItem("minStudents");

      if (savedMax !== null) setMaxStudents(Number(savedMax));
      if (savedMin !== null) setMinStudents(Number(savedMin));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("maxStudents", maxStudents.toString());
    }
  }, [maxStudents]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("minStudents", minStudents.toString());
    }
  }, [minStudents]);

  const renderItemFunction = (item: string) => {
    switch (item) {
      case "STUDENTS":
        return <Students />;
      case "COURSES":
        return <Courses />;
      case "TIMELINE":
        return <Timeline />;
      case "STUDENT_WISE":
        return (
          <StudentWise
            maxStudents={maxStudents}
            setMaxStudents={setMaxStudents}
            minStudents={minStudents}
            setMinStudents={setMinStudents}
          />
        );
      case "COURSE_WISE":
        return (
          <CourseWise
            setRenderComponent={(item: string) => setRenderComponent(item)}
            setRenderData={(data: any) => setRenderData(data)}
            maxStudents={maxStudents}
            setMaxStudents={setMaxStudents}
            minStudents={minStudents}
            setMinStudents={setMinStudents}
          />
        );
      case "STUDENTS_LIST_BY_COURSE":
        return (
          <StudentsByCourse
            renderData={renderData}
            maxStudents={maxStudents}
            setMaxStudents={setMaxStudents}
            minStudents={minStudents}
            setMinStudents={setMinStudents}
          />
        );
      case "SETTINGS":
        return <Settings />;
      default:
        return <LoadingSpinner />;
    }
  };

  return (
    <main className="flex bg-[#D9D9D9]">
      <Sidebar
        renderComponent={renderComponent}
        setRenderComponent={setRenderComponent}
      />
      <div className="w-full min-h-screen">
        {renderItemFunction(renderComponent)}
      </div>
    </main>
  );
}
