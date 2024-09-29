import React from "react";
import Table from "@/components/Table";
import { FaDownload, FaUpload } from "react-icons/fa";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import { saveAs } from 'file-saver';
export default function Courses() {
  const [data, setData] = React.useState([]);
  const [showUploadModal, setShowUploadModal] = React.useState(false);

  const columns = React.useMemo(() => [
    {
      header: 'Name',
      accessorKey: 'NAME',
      cell: (info: any) => info.getValue(),
    },
    {
      header: 'Faculty Name',
      accessorKey: 'FACULTY_NAME',
      cell: (info: any) => info.getValue(),
    },
    {
      header: 'Faculty Email',
      accessorKey: 'FACULTY_EMAIL',
      cell: (info: any) => info.getValue(),
    },
    {
      header: 'Description',
      accessorKey: 'DESCRIPTION',
      size: 500,
      cell: (info: any) => info.getValue(),
    }
  ], []);

  const [loading, setLoading] = React.useState(false);

  const fetchCoursesData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/fetchCoursesData");
      const data = await response.json();
      console.log(data);
      setData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchCoursesData();
  }, []);

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
              text: "Download",
              icon: <FaDownload size={12} />,
              onClick: () => {
                const studentsCSV = fetch("/api/downloads/fetchUploadedCourseCSV");
                let csvContent = '';

                studentsCSV.then((response) => {
                  response.json().then((data) => {
                    console.log(data);
                    csvContent = data;
                    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                    saveAs(blob, 'UploadedCourses.csv');
                  });
                });
              },
            },
            {
              text: "Upload CSV",
              icon: <FaUpload size={12} />,
              onClick: () => {
                setShowUploadModal(true);
              },
            }]}
        />
        <Table
          data={data}
          columns={columns}
          handleDeleteRow={() => { }}
          handleEditRow={() => { }}
          columnFilters={[]}
          loading={loading}
        />
      </div>
      <Modal
        setShowModal={setShowUploadModal}
        showModal={showUploadModal}
        type="minors"
      />
    </div>
  );
}
