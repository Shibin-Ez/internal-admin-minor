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
      accessorKey: 'rank',
      size: 200,
      cell: (info: any) => info.getValue(),
    },
    {
      header: 'Name',
      accessorKey: 'student',
      size: 1000,
      cell: (info: any) => {
        const value = info.getValue();
        return value.name;
      },
    },
    {
      header: 'Reg No',
      accessorKey: 'student',
      size: 500,
      cell: (info: any) => {
        const value = info.getValue();
        return value.regNo;
      },
    },
    {
      header: 'Email',
      accessorKey: 'student',
      cell: (info: any) => {
        const value = info.getValue();
        return value.email;
      },
    },
    {
      header: 'Department',
      accessorKey: 'student',
      cell: (info: any) => {
        const value = info.getValue();
        return value.programName;
      },
    },
    {
      header: 'Section',
      accessorKey: 'student',
      cell: (info: any) => {
        const value = info.getValue();
        return value.sectionBatchName;
      },
    },
    {
      header: 'FA Name',
      accessorKey: 'student',
      size: 1000,
      cell: (info: any) => {
        const value = info.getValue();
        return value.faName;
      },
    },
    {
      header: 'Enrolled',
      accessorKey: 'enrolledCouse',
      size: 200,
      cell: (info: any) => {
        const value = info.getValue();
        return value.code;
      },
    },
  ], []);

  const [loading, setLoading] = React.useState(false);

  const fetchStudentsData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/admin/allocate?max=${maxStudents}&min=${minStudents}`);
      const data = await response.data;
      console.log(data);
      if (response.status === 200) {
        setData(data.studentWise.data);
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
    const headers = columns.map((column) => column.header);
    const rows = data.map((row: any) => ({
      rank: row.rank,
      name: row.student.name,
      regNo: row.student.regNo,
      email: row.student.email,
      department: row.student.programName,
      section: row.student.sectionBatchName,
      faName: row.student.faName,
      enrolled: row.enrolledCouse.code,
    }));
  
    let csvContent = '';
    csvContent += headers.join(',') + '\r\n';
    rows.forEach((rowArray) => {
      csvContent += Object.values(rowArray).join(',') + '\r\n';
    });
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'enrolledStudents.csv');
  };
  


  return (
    <div className="flex bg-[#D9D9D9]">
      <div className="w-full min-h-screen">
        <Header
          maxStudents={maxStudents}
          setMaxStudents={setMaxStudents}
          minStudents={minStudents}
          setMinStudents={setMinStudents}
          customBtn={{
            text: 'Download',
            icon: <FaDownload size={10} />,
            onClick: () => {
              console.log("Download");
              exportAsCSV();
            },
          }}
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
