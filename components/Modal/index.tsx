import axios from 'axios';
import React, { useRef } from 'react';
import { FaUpload } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';
import LoadingSpinner from '../LoadingSpinner';

interface ModalProps {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
}

export default function Modal({
    showModal,
    setShowModal,
}: ModalProps) {

    const [isUploadSuccess, setIsUploadSuccess] = React.useState<boolean | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isUploading, setIsUploading] = React.useState(false);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            setIsUploading(true);
            try {
                const response = await fetch("https://minor-nitc-server.onrender.com/admin/upload/csv",
                    {
                        method: "POST",
                        body: formData,
                    }
                );
                const result = await response.json();
                console.log(result);
                if (response.status === 201) {
                    setIsUploadSuccess(true);
                } else {
                    setIsUploadSuccess(false);
                }
            } catch (error) {
                console.error('Error:', error);
                setIsUploadSuccess(false);
            } finally {
                setIsUploading(false);
            }
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <>
            <div
                className={`${showModal ? 'opacity-50' : 'opacity-0 pointer-events-none'} transition-opacity duration-300 fixed inset-0 bg-black z-40`}
                onClick={() => setShowModal(false)}
            ></div>
            <div id="popup-modal" tabIndex={-1} className={`${showModal ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative p-4 w-full max-w-md max-h-full z-50">
                    <div className="relative bg-[#1E293B] rounded-lg shadow">
                        <button
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                            onClick={() => setShowModal(false)}
                        >
                            <FaX size={15} />
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-4 md:p-5 text-center h-64 items-center flex flex-col gap-4 justify-center">
                            <button
                                onClick={handleUploadClick}
                                className='bg-white text-black rounded-md px-4 py-2 flex flex-row justify-between w-2/5 items-center'
                            >
                                Upload CSV
                                <FaUpload size={15} />
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                accept=".csv"
                                onChange={handleFileChange}
                            />
                            {
                                isUploading && (
                                    <LoadingSpinner />
                                )
                            }
                            {isUploadSuccess !== null && (
                                isUploadSuccess ?
                                    <p className='text-green-500'>Upload Success</p> :
                                    <p className='text-red-500'>Upload Failed</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
