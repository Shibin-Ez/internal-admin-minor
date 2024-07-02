import React from 'react';
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    ColumnDef,
} from '@tanstack/react-table';
import { FaChevronCircleLeft, FaChevronCircleRight, FaChevronLeft, FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';
import LoadingSpinner from '../LoadingSpinner';

interface TableProps {
    data: any[];
    columns: ColumnDef<any, any>[];
    columnFilters: any;
    handleDeleteRow: any;
    handleEditRow: any;
    loading: boolean;
    isClickable?: boolean;
    setRenderComponent?: any;
    setRenderData?: any;
    navigationTo?: string;
}

export default function Table({
    data,
    columns,
    columnFilters,
    handleDeleteRow,
    handleEditRow,
    loading,
    isClickable,
    setRenderComponent,
    setRenderData,
    navigationTo,
}: TableProps) {

    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 15, // Default page size
    });

    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters,
            pagination,
        },
        columnResizeMode: "onChange",
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
    });

    return (
        <div className="relative overflow-x-auto bg-white shadow-xl m-5 max-h-screen border border-black">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 border-b border-black min-h-[27rem]">                
                <thead className="text-xs text-white uppercase bg-[#1E293B] ">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className='p-1 flex-row justify-center text-center items-center border border-gray-300'>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    scope="col"
                                    onMouseDown={header.getResizeHandler()}
                                    onTouchStart={header.getResizeHandler()}
                                    className={`p-1`}>
                                    <div className='flex flex-row justify-between'>
                                        {String(header.column.columnDef.header)}
                                        {header.column.getCanSort() && (
                                            <div
                                                className='flex flex-row justify-between items-center flex'
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                {!header.column.getIsSorted() && <FaSort size={10} />}
                                                <div className='ml-1 justify-self-end items-center flex'>
                                                    {{
                                                        asc: <FaSortUp size={10} />,
                                                        desc: <FaSortDown size={10} />,
                                                    }[header.column.getIsSorted() as keyof { asc: string; desc: string; }]}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                {
                    loading ? (
                        <div className='absolute top-0 left-0 w-full h-full bg-white bg-opacity-90 flex items-center justify-center z-10'>
                        <LoadingSpinner />
                        </div>
                    ) : (
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className={`p-1 ${row.original.ISDROPPED && 'bg-red-200'} ${!row.original.ISDROPPED && 'hover:bg-gray-100'}`} 
                            onClick={() => {
                                console.log('row', row.original.ISDROPPED);
                                    if (isClickable && !row.original.ISDROPPED) {
                                        console.log('row', row.original.STUDENTS);
                                        setRenderComponent(navigationTo);
                                        setRenderData({
                                            studentsList: row.original.STUDENTS,
                                            course: row.original.CODE
                                        });
                                    }
                            }}
                            style={
                                { 
                                    cursor: isClickable && !row.original.ISDROPPED ? 'pointer' : 'default',
                                }
                            }
                        >
                            {row.getVisibleCells().map((cell: any) => (
                                <td 
                                key={cell.id} 
                                width={cell.column.getSize()} 
                                className={`flex-col justify-center text-center border border-gray-300`}>
                                    {cell.column.columnDef.accessorKey === 'EDIT' ? (
                                        <div className='flex flex-row justify-between'>
                                            <span className='text-blue-500 cursor-pointer' onClick={() => handleEditRow(cell.row.original)}>
                                                EDIT
                                            </span>
                                        </div>
                                    ) : cell.column.columnDef.accessorKey === 'DELETE' ? (
                                        <div className='flex flex-row justify-between'>
                                            <span className='text-red-500 cursor-pointer' onClick={() => handleDeleteRow(cell.row.original.ID)}>
                                                DELETE
                                            </span>
                                        </div>
                                    ) : (
                                        flexRender(cell.column.columnDef.cell, cell.getContext())
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                )}
            </table>
            <div className="flex items-center justify-between py-2">
                {
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className={`px-2 py-2 h-8 w-8 items-center ml-2 justify-center flex rounded-full items-center ${table.getCanPreviousPage() && 'bg-[#2F3E4E]'
                            }`}
                    >
                        {
                            table.getCanPreviousPage() && <FaChevronCircleLeft size={20} color='white' />
                        }
                    </button>
                }
                <div className='flex items-center justify-center flex-col gap-2'>
                    <div>
                        {table.getPageOptions().length < 5 && table.getPageOptions().map((page) => {
                            return (
                                <button
                                    key={page}
                                    onClick={() => {
                                        table.setPageIndex(page);
                                    }}
                                    disabled={table.getState().pagination.pageIndex === page}
                                    className={`text-[12px] h-5 w-5 rounded-full ${table.getState().pagination.pageIndex === page && 'bg-[#2F3E4E] text-white'
                                        } items-center`}
                                >
                                    {page + 1}
                                </button>
                            )
                        })}
                        {
                            table.getPageOptions().length >= 5 && (
                                <>                
                                    <select
                                        value={table.getState().pagination.pageIndex}
                                        onChange={(e) => {
                                            table.setPageIndex(Number(e.target.value));
                                        }}
                                        className='px-2 py-1 rounded-md border-2 bg-[#2F3E4E] text-white/80 focus:outline-none focus:ring-0 focus:ring-none'
                                    >
                                        {table.getPageOptions().map((page) => (
                                            <option key={page} value={page}>
                                                {page + 1}
                                            </option>
                                        ))}
                                    </select>
                                </>
                            )
                        }
                    </div>
                    <p className='text-sm text-[#808080]'>
                        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </p>
                </div>
                {
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className={`px-2 py-2 border mr-2 rounded-full ${table.getCanNextPage() && 'bg-[#2F3E4E]'
                            } items-center`}
                    >
                        <FaChevronCircleRight size={15} color='white' />
                    </button>
                }
            </div>
        </div>
    );
}
