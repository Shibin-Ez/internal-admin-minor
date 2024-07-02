import React from 'react'
import { FaArrowCircleLeft, FaArrowCircleRight, FaBook, FaCalendarTimes, FaCog, FaDoorOpen, FaSeedling, FaTimes, FaUser } from 'react-icons/fa'
import { MdSchool } from 'react-icons/md';

interface SidebarProps {
    renderComponent: string;
    setRenderComponent: any;
}

export default function Sidebar({ renderComponent, setRenderComponent }: SidebarProps) {

    const [toggleSidebar, setToggleSidebar] = React.useState(true);
    const [toggleSubFolder, setToggleSubFolder] = React.useState(false);

    const sections = [
        {
            id: 'STUDENTS',
            name: 'Students',
            icon: <FaUser className='text-gray-400' />,
            subFolders: []
        },
        {
            id: 'COURSES',
            name: 'Courses',
            icon: <FaBook className='text-gray-400' />,
            subFolders: []
        },
        {
            id: 'TIMELINE',
            name: 'Timeline',
            icon: <FaCalendarTimes className='text-gray-400' />,
            subFolders: []
        },
        {
            id: 'ALLOTMENT_DETAILS',
            name: 'Allotment Details',
            icon: <MdSchool className='text-gray-400' />,
            subFolders: [
                {
                    id: 'STUDENT_WISE',
                    name: 'Student wise',
                    icon: <FaUser className='text-gray-400' size={10}/>
                },
                {
                    id: 'COURSE_WISE',
                    name: 'Course wise',
                    icon: <FaBook className='text-gray-400' size={10}/>
                }
            ]
        },
        {
            id: 'SETTINGS',
            name: 'Settings',
            icon: <FaCog className='text-gray-400' />,
            subFolders: []
        },
        {
            id: 'LOG_OUT',
            name: 'Log Out',
            icon: <FaDoorOpen className='text-gray-400' />,
            subFolders: []
        }
    ]

    return (
        <div className={`min-h-screen overflow-hidden bg-[#1E293B] ${toggleSidebar ? 'w-1/5' : 'w-1/12'}`}>
            <div className='mx-5 mt-10 justify-center flex items-center flex-col'>
                <div className='bg-black h-10 w-10 rounded-full' />
                <div className='mt-5'>
                    <p className='text-gray-400 text-sm'>Admin</p>
                </div>
            </div>
            <div className='mt-10'>
                <ul>
                    {
                        sections.map((section, index) => (
                            <>
                            <div key={index}>
                                <li
                                    onClick={() => {
                                        if(section.id === 'ALLOTMENT_DETAILS'){
                                            setToggleSubFolder(!toggleSubFolder);
                                            return;
                                        }
                                        setRenderComponent(section.id);
                                    }}
                                    className={`flex items-center ${toggleSidebar === true ? 'justify-between' : 'justify-center'} px-5 py-2 text-white hover:bg-[#2F3E4E] cursor-pointer ${renderComponent === section.id ? 'bg-[#2F3E4E]' : ''}`}>
                                    {
                                        toggleSidebar === true ? <span>{section.name}</span> : null
                                    }
                                    {section.icon}
                                </li>
                                {
                                    toggleSubFolder === true && section.id === 'ALLOTMENT_DETAILS' ? (
                                        <ul>
                                            {
                                                section.subFolders.map((subFolder, index) => (
                                                    <li
                                                        key={index}
                                                        onClick={() => {
                                                            setRenderComponent(subFolder.id);
                                                        }}
                                                        className={`flex items-center ${toggleSidebar === true ? 'justify-center' : 'justify-center'} px-5 py-2 gap-4   T text-white hover:bg-[#2F3E4E] cursor-pointer text-sm ${renderComponent === subFolder.id ? 'bg-[#2F3E4E]' : ''}`}>
                                                        {
                                                            toggleSidebar === true ? <span>{subFolder.name}</span> : null
                                                        }
                                                        {subFolder.icon}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    ) : null
                                }
                                </div>
                            </>
                        ))
                    }
                </ul>
            </div>
            <div>
                <button
                    onClick={() => {
                        setToggleSidebar(!toggleSidebar)
                    }}
                    className='fixed bottom-5 left-5 bg-[#2F3E4E] text-white px-2 py-2 rounded-full flex items-center'>
                    {
                        toggleSidebar === true ? <FaArrowCircleLeft /> : <FaArrowCircleRight />
                    }
                </button>
            </div>
        </div>
    )
}
