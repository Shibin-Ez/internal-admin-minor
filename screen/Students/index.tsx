import React from "react";
import Table from "@/components/Table";
import { FaDownload, FaUpload } from "react-icons/fa";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import { saveAs } from 'file-saver';
export default function Students() {
  const [data, setData] = React.useState([]);
  const [showUploadModal, setShowUploadModal] = React.useState(false);
  const [isDataNull, setIsDataNull] = React.useState(false);
  const columns = React.useMemo(() => [
    {
      header: 'Name',
      accessorKey: 'NAME',
      size: 1000,
      cell: (info: any) => info.getValue(),
    },
    {
      header: 'Reg No',
      accessorKey: 'REGNO',
      size: 500,
      cell: (info: any) => info.getValue(),
    },
    {
      header: 'Date of Birth',
      accessorKey: 'DOB',
      size: 500,
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
      header: 'Semester',
      accessorKey: 'SEMESTER',
      cell: (info: any) => info.getValue(),
    },
    {
      header: 'Section',
      accessorKey: 'SECTION',
      cell: (info: any) => info.getValue(),
    },
    {
      header: 'FA Name',
      accessorKey: 'FANAME',
      size: 1000,
      cell: (info: any) => info.getValue(),
    },
    {
      header: 'FA Email',
      accessorKey: 'FAEMAIL',
      size: 200,
      cell: (info: any) => info.getValue(),
    },
    {
      header: 'Enrolled',
      accessorKey: 'ENROLLED',
      size: 200,
      cell: (info: any) => {
        const value = info.getValue();
        console.log(value === "-1");
        return (
          <div className={`rounded-full px-2 py-1`}>
            <p className="text-xs">{value === "-1" ? 'Not Enrolled' : 'Enrolled'}</p>
          </div>
        );

      },
    },
    {
      header: 'CGPA',
      accessorKey: 'CGPA',
      size: 200,
      cell: (info: any) => info.getValue(),
    },
    {
      header: 'SGPA S1',
      accessorKey: 'SGPAS1',
      size: 200,
      cell: (info: any) => info.getValue(),
    },
    {
      header: 'SGPA S2',
      accessorKey: 'SGPAS2',
      size: 200,
      cell: (info: any) => info.getValue(),
    }
  ], []);

  const [loading, setLoading] = React.useState(false);

  const fetchStudentsData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/fetchStudentsData");
      const data = await response.json();
      console.log(data);
      setData(data);
      setIsDataNull(data.length === 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchStudentsData();
  }, []);

  console.log(data);

  return (
    <div className="flex bg-[#D9D9D9]">
      <div className="w-full min-h-screen">
        <Header
          maxStudents={50}
          setMaxStudents={() => { }}
          minStudents={10}
          setMinStudents={() => { }}
          customBtn={[
            {
              text: 'Download',
              icon: <FaDownload size={12} />,
              onClick: () => {
                const studentsCSV = fetch("/api/downloads/fetchUploadedStudentsCSV");
                let csvContent = '';

                studentsCSV.then((response) => {
                  response.json().then((data) => {
                    console.log(data);
                    csvContent = data;
                    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                    saveAs(blob, 'EnrolledStudents.csv');
                  });
                });
              }
            },
            {
              text: "Upload CSV",
              icon: <FaUpload size={12} />,
              onClick: () => {
                setShowUploadModal(true);
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
                onClick={() => setShowUploadModal(true)}
                className="px-2 text-center flex items-center justify-center py-2 rounded-md">
                No Data Found
              </div>
            </div>
          )
        }

      </div>
      <Modal
        setShowModal={setShowUploadModal}
        showModal={showUploadModal}
        type="students"
      />
    </div>
  );
}
