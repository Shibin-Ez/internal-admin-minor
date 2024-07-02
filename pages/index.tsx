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
import Timeline from "@/screen/Timeline";
import { render } from "react-dom";
import StudentWise from "@/screen/AllotmentDetails/StudentWise";
import CourseWise from "@/screen/AllotmentDetails/CourseWise";
import StudentsByCourse from "@/screen/AllotmentDetails/CourseWise/StudentsByCourse";


export default function Home() {

  const [renderComponent, setRenderComponent] = React.useState('students');
  const [renderData, setRenderData] = React.useState([]);

  const renderItemFunction = (item: string) => {
    switch (item) {
      case 'STUDENTS':
        return <Students />;
      case 'COURSES':
        return <Courses />;
      case 'TIMELINE':
        return <Timeline />;
      case 'STUDENT_WISE':
        return <StudentWise />;
      case 'COURSE_WISE':
        return (
          <CourseWise 
            setRenderComponent={(item: string) => setRenderComponent(item)}
            setRenderData={(data: any) => setRenderData(data)}
          />
        );
      case 'STUDENTS_LIST_BY_COURSE':
        return (
          <StudentsByCourse
            renderData={renderData}
          />
        )
      case 'SETTINGS':
        return <Settings />;
      default:
        return <LoadingSpinner />;
    }
  }

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
