import Header from "@/components/Header";
import Table from "@/components/Table";
import React from "react";
import { FaDownload } from "react-icons/fa";
import { saveAs } from "file-saver";

type StudentsProps = {
  renderData: any;
  maxStudents: number;
  setMaxStudents: (value: number) => void;
  minStudents: number;
  setMinStudents: (value: number) => void;
};

export default function StudentsByCourse({
  renderData,
  maxStudents,
  setMaxStudents,
  minStudents,
  setMinStudents,
}: StudentsProps) {
  const [loading, setLoading] = React.useState(false);
  console.log(renderData);

  const columns = React.useMemo(
    () => [
      {
        header: "Rank",
        accessorKey: "rank",
        cell: (info: any) => info.getValue(),
      },
      {
        header: "Name",
        accessorKey: "student",
        size: 250,
        cell: (info: any) => {
          const value = info.getValue();
          return value.name;
        },
      },
      {
        header: "Department",
        accessorKey: "student",
        cell: (info: any) => {
          const value = info.getValue();
          return value.programName;
        },
      },
      {
        header: "Roll No",
        accessorKey: "student",
        cell: (info: any) => {
          const value = info.getValue();
          return value.regNo;
        },
      },
      {
        header: "Batch",
        accessorKey: "student",
        cell: (info: any) => {
          const value = info.getValue();
          return value.sectionBatchName;
        },
      },
      {
        header: "CGPA",
        accessorKey: "student",
        cell: (info: any) => {
          const value = info.getValue();
          return value.cgpa;
        },
      },
    ],
    []
  );

  const exportAsCSV = () => {
    const headers = columns.map((column) => column.header);
    const rows = renderData.studentsList.map((row: any) => ({
      RANK: row.rank,
      NAME: row.student.name,
      DEPARTMENT: row.student.programName,
      REGNO: row.student.regNo,
      BATCH: row.student.sectionBatchName,
      CGPA: row.student.cgpa,
    }));

    let csvContent = "";
    csvContent += headers.join(",") + "\r\n";
    rows.forEach((rowArray: any) => {
      csvContent += Object.values(rowArray).join(",") + "\r\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${renderData.course}.csv`);
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
            text: "Download",
            icon: <FaDownload />,
            onClick: () => {
              exportAsCSV();
            },
          }}
        />
        <Table
          data={renderData.studentsList}
          columns={columns}
          handleDeleteRow={() => {}}
          handleEditRow={() => {}}
          columnFilters={[]}
          loading={loading}
          navigationTo={""}
          isClickable={false}
        />
      </div>
    </div>
  );
}
