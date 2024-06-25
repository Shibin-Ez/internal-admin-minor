import React from "react";
import Table from "@/components/Table";
import { FaChevronDown, FaPlus } from "react-icons/fa";
import Header from "@/components/Header";

export default function Courses() {
  const [data, setData] = React.useState([]);
  const columns = React.useMemo(() => [
    {
      header: 'Name',
      accessorKey: 'NAME',
      size: 1000,
      cell: (info: any) => info.getValue(),
    },
    {
      header: 'Course Code',
      accessorKey: 'CODE',
      size: 500,
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
      header: 'Faculty Email',
      accessorKey: 'FACULTY_EMAIL',
      cell: (info: any) => info.getValue(),
    },
    {
      header: 'Faculty Phone',
      accessorKey: 'FACULTY_PHONE',
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
      header: 'Edit',
      accessorKey: 'EDIT',
      size: 200,
    },
    {
      header: 'Delete',
      accessorKey: 'DELETE',
      size: 200,
    },
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
          customBtn={{
            text: "Add Course",
            icon: <FaPlus size={10} />,
          }}
        />
        <Table
          data={data}
          columns={columns}
          handleDeleteRow={() => {}}
          handleEditRow={() => {}}
          columnFilters={[]}
          loading={loading}
        />
      </div>
    </div>
  );
}
