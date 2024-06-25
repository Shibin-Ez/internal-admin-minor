import React from 'react'
import { FaArrowCircleLeft, FaArrowCircleRight, FaBook, FaCog, FaDoorOpen, FaUser } from 'react-icons/fa'

interface SidebarProps {
    renderComponent: string;
    setRenderComponent: any;
}

export default function Sidebar({ renderComponent, setRenderComponent }: SidebarProps) {

    const [toggleSidebar, setToggleSidebar] = React.useState(false);

    const sections = [
        {
            name: 'Students',
            icon: <FaUser className='text-gray-400' />
        },
        {
            name: 'Courses',
            icon: <FaBook className='text-gray-400' />
        },
        {
            name: 'Settings',
            icon: <FaCog className='text-gray-400' />
        },
        {
            name: 'Log Out',
            icon: <FaDoorOpen className='text-gray-400' />
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
                            <li
                                key={index}
                                onClick={() => {
                                    setRenderComponent(section.name.toLowerCase())
                                }}
                                className={`flex items-center ${toggleSidebar === true ? 'justify-between' : 'justify-center'} px-5 py-2 text-white hover:bg-[#2F3E4E] cursor-pointer ${renderComponent === section.name.toLowerCase() ? 'bg-[#2F3E4E]' : ''}`}>
                                {
                                    toggleSidebar === true ? <span>{section.name}</span> : null
                                }
                                {section.icon}
                            </li>
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
