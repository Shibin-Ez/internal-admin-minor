import React, { use, useEffect } from "react";
import Table from "@/components/Table";
import { FaDownload, FaPlus } from "react-icons/fa";
import Header from "@/components/Header";
import { BASE_URL } from "@/constants/AppConstants";
import axios from "axios";
import { saveAs } from 'file-saver';
interface CourseWiseProps {
  setRenderComponent: any;
  setRenderData: any;
  maxStudents: number;
  setMaxStudents: (value: number) => void;
  minStudents: number;
  setMinStudents: (value: number) => void;
}

export default function CourseWise({
  setRenderComponent,
  setRenderData,
  maxStudents,
  setMaxStudents,
  minStudents,
  setMinStudents,
}: CourseWiseProps) {
  const [data, setData] = React.useState<any>([]);

  // // load from  local strorage
  // const [maxStudents, setMaxStudents] = React.useState(() => {
  //   const savedMax = localStorage.getItem('maxStudents');
  //   return savedMax !== null ? Number(savedMax) : 50;
  // });

  // const [minStudents, setMinStudents] = React.useState(() => {
  //   const savedMax = localStorage.getItem('minStudents');
  //   return savedMax !== null ? Number(savedMax) : 50;
  // });

  useEffect(() => {
    console.log("Max Students", maxStudents);
  }, [maxStudents, minStudents]);

  
  const columns = React.useMemo(() => [
    {
      header: 'Course Code',
      accessorKey: 'CODE',
      size: 500,
      cell: (info: any) => info.getValue(),
    },
    {
      header: 'Name',
      accessorKey: 'NAME',
      size: 1000,
      cell: (info: any) => info.getValue(),
    },
    {
      header: 'Department',
      accessorKey: 'DEPARTMENT',
      cell: (info: any) => info.getValue(),
    },
    {
      header: 'Faculty Name',
      accessorKey: 'FACULTY_NAME',
      cell: (info: any) => info.getValue(),
    },
    {
      header: 'Credits',
      accessorKey: 'CREDIT',
      cell: (info: any) => info.getValue(),
    },
    {
      header: 'Schedule',
      accessorKey: 'SCHEDULE',
      size: 500,
      cell: (info: any) => info.getValue(),
    },
    {
      header: 'Total Students',
      accessorKey: 'TOTAL_STUDENTS',
      cell: (info: any) => info.getValue(),
    }
  ], []);

  const [loading, setLoading] = React.useState(false);

  const fetchData = async () => {
    setLoading(true);
    try{
      const response = await axios.get(`${BASE_URL}/admin/allocate?max=${maxStudents}&min=${minStudents}`);
      const data = response.data;
      if(response.status === 200){
        console.log("Data", data);
        console.log("CourseWiseData", data.courseWise.data);
        const courseData: any = [];
        data.courseWise.data.map((data: any) => {
          courseData.push({
            ID: data.course._id,
            ISDROPPED: 0,
            NAME: data.course.name,
            CODE: data.course.code,
            DEPARTMENT: data.course.department,
            FACULTY_NAME: data.course.faculty,
            CREDIT: data.course.credit,
            SCHEDULE: data.course.schedule,
            STUDENTS: data.students,
            TOTAL_STUDENTS: data.enrolled,
          });
        });

        data.courseWise.droppedCourses.map((data: any) => {
          courseData.push({
            ID: data._id,
            ISDROPPED: 1,
            NAME: data.name,
            CODE: data.code,
            DEPARTMENT: data.department,
            FACULTY_NAME: data.faculty,
            CREDIT: data.credit,
            SCHEDULE: data.schedule,
            STUDENTS: [],
            TOTAL_STUDENTS: 0,
          });
        });

        setData(courseData);
      } 
    }catch(error){
      console.error(error);
    }finally{
      setLoading(false);
    }
  }

  React.useEffect(() => {  
    fetchData();
  }, [maxStudents, minStudents]);

  const exportAsCSV = () => {
    let headers = columns.map((column) => column.header);
    headers.push('Is Dropped');
    const rows = data.map((row: any) => ({
      CODE: row.CODE,
      NAME: row.NAME,
      DEPARTMENT: row.DEPARTMENT,
      FACULTY_NAME: row.FACULTY_NAME,
      CREDIT: row.CREDIT,
      SCHEDULE: row.SCHEDULE,
      TOTAL_STUDENTS: row.TOTAL_STUDENTS,
      ISDROPPED: row.ISDROPPED === 1 ? 'Yes' : 'No',
    }));

    let csvContent = '';
    csvContent += headers.join(',') + '\r\n'; 
    rows.forEach((rowArray: any) => {
      csvContent += Object.values(rowArray).join(',') + '\r\n';
    });
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'courses.csv');
    
  }

  return (
    <div className="flex bg-[#D9D9D9]">
      <div className="w-full min-h-screen">
        <Header
          maxStudents = {maxStudents}
          setMaxStudents = {setMaxStudents}
          minStudents = {minStudents}
          setMinStudents = {setMinStudents}
          customBtn={{
            text: "Download",
            icon: <FaDownload />,
            onClick: () => {
              exportAsCSV();
            }
          }}
        />
        <Table
          data={data}
          columns={columns}
          handleDeleteRow={() => {}}
          handleEditRow={() => {}}
          columnFilters={[]}
          loading={loading}
          navigationTo={"STUDENTS_LIST_BY_COURSE"}
          isClickable={true}
          setRenderComponent={setRenderComponent}
          setRenderData={setRenderData}
        />
      </div>
    </div>
  );
}
