import React, { useEffect } from "react";
import Table from "@/components/Table";
import { FaDownload, FaFileCsv, FaUpload } from "react-icons/fa";
import Header from "@/components/Header";
import { saveAs } from 'file-saver';
import axios from "axios";
import { BASE_URL } from "@/constants/AppConstants";

export default function StudentWise({ maxStudents, setMaxStudents, minStudents, setMinStudents }: any) {
  const [data, setData] = React.useState([]);
  const [isDataNull, setIsDataNull] = React.useState(false);

  const columns = React.useMemo(() => [
    {
      header: 'Rank',
      accessorKey: 'RANK',
      size: 200,
      cell: (info: any) => info.getValue(),
    },
    {
      header: 'Name',
      accessorKey: 'NAME',
      size: 200,
      cell: (info: any) => info.getValue(),
    },
    {
      header: 'Reg No',
      accessorKey: 'REG_NO',
      size: 200,
      cell: (info: any) => info.getValue(),
    },
    {
      header: 'Email',
      accessorKey: 'EMAIL',
      cell: (info: any) => info.getValue(),
    },
    {
      header: 'Department',
      accessorKey: 'DEPARTMENT',
      cell: (info: any) => info.getValue(),
    },
    {
      header: 'Section',
      accessorKey: 'SECTION',
      cell: (info: any) => info.getValue(),
    },
    {
      header: 'FA Name',
      accessorKey: 'FA_NAME',
      size: 200,
      cell: (info: any) => info.getValue(),
    },
    {
      header: 'Alloted Course',
      accessorKey: 'ENROLLED',
      size: 500,
      cell: (info: any) => {
        const value = info.getValue();
        
        if(value === undefined) {
          return "Not Alloted";
        }
        return value;
      }
    },
    {
      header: 'Choice No',
      accessorKey: 'CHOICE_NO',
      size: 200,
      cell: (info: any) => info.getValue(),
    }
  ], []);

  const [loading, setLoading] = React.useState(false);

  const fetchStudentsData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/admin/allocate?max=${maxStudents}&min=${minStudents}`);
      const data = await response.data;
      console.log("StudentWise", data);
      if (response.status === 200) {
        const formattedData = data.studentWise.data.map((item: any, index: number) => {
          return {
            RANK: item.rank,
            NAME: item.student.name,
            REG_NO: item.student.regNo,
            EMAIL: item.student.email,
            DEPARTMENT: item.student.programName,
            SECTION: item.student.sectionBatchName,
            FA_NAME: item.student.faName,
            ENROLLED: item.enrolledCouse.name,
            CHOICE_NO: item.choiceNo
          }
        })
        console.log("Formatted Data", formattedData);
        setData(formattedData);
        setIsDataNull(data.studentWise.data.length === 0);
      } else {
        setIsDataNull(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchStudentsData();
  }, [maxStudents, minStudents]);

  const exportAsCSV = () => {
    
    const studentsCSV = fetch("/api/downloads/fetchStudentsCSV");
    let csvContent = '';

    studentsCSV.then((response) => {
      response.json().then((data) => {
        console.log(data);
        csvContent = data;
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'StudentsUploaded.csv');
      });
    });

  };
  


  return (
    <div className="flex bg-[#D9D9D9]">
      <div className="w-full min-h-screen">
        <Header
          maxStudents={maxStudents}
          setMaxStudents={setMaxStudents}
          minStudents={minStudents}
          setMinStudents={setMinStudents}
          customBtn={[
            {
            text: 'Download',
            icon: <FaDownload size={10} />,
            onClick: () => {
              console.log("Download");
              exportAsCSV();
            },
          }]}
        />
        {
          !isDataNull ? (
            <Table
              data={data}
              columns={columns}
              handleDeleteRow={() => { }}
              handleEditRow={() => { }}
              columnFilters={[]}
              loading={loading}
            />
          ) : (
            <div className="flex justify-center items-center min-h-screen">
              <div
                className="px-2 text-center flex items-center justify-center py-2 rounded-md">
                No Data Found
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
}
