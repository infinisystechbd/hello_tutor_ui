import React from 'react';
import { Tag } from 'antd';


const CategoryViewForm = ({ isOpen, onClose, setEditData, isParentRender }) => {
    console.log("setEditData",setEditData)
  return (
    <>
    {isOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto ">
            <div className="flex items-center justify-center min-h-screen">
                <div className="fixed inset-0 bg-black opacity-50"></div>
                <div className="relative bg-white p-8 rounded-lg  dark:border-strokedark dark:bg-boxdark w-full max-w-md max-h-full">
                    {/* Modal content */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            View Category
                        </h3>
                        <button
                            onClick={() => {
                                onClose();
                                // setSubject({});
                            }}
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-toggle="crud-modal"
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-black dark:text-white mb-1 ">


                        <div>


                            <div className="flex items-center justify-start gap-2 m-2">
                                <p className="font-semibold">CategoryId Date:</p>
                                <p>{setEditData?.categoryId}</p>
                            </div>

                            <div className="flex items-center justify-start gap-2 m-2">

                                <p className="font-semibold">Category :</p>
                                <p>{setEditData?.name}</p>
                            </div>

                            <div className="flex items-center justify-start gap-2 m-2">

                                <p className="font-semibold">Status:</p>
                                {setEditData?.status ? <Tag color='green'>ACTIVE</Tag> : <Tag color='volcano'>INACTIVE</Tag>}
                            </div>

                            <div className="flex items-center justify-start gap-2 m-2">

                                <p className="font-semibold">Created By :</p>
                                <p>{setEditData?.createdBy?.fullName}</p>
                            </div>
                            {setEditData?.updatedBy?.fullName && <div className="flex items-center justify-start gap-2 m-2">

                                <p className="font-semibold">Updated By:</p>
                                <p>{setEditData?.updatedBy?.fullName}</p>
                            </div>}

                        </div>

                        <div className="flex justify-end">

                        </div>

                    </div>

                </div>
            </div>
        </div>
    )}
</>
  )
}

export default CategoryViewForm