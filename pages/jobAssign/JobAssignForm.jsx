import ToastMessage from '@/components/Toast';
import withAuth from '@/components/withAuth';
import { JOB_ASSIGN_END_POINT, JOB_REQUEST_END_POINT } from '@/constants';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { get } from '@/helpers/api_helper';
import { mapArrayToDropdown } from '@/helpers/common_Helper';
import { useGetAllData } from '@/utils/hooks/useGetAllData';
import { useCallback, useEffect, useState } from 'react';

const JobAssignForm = ({ isOpen, onClose, setEditData, isParentRender }) => {

    const [loading, setLoading] = useState(false);
    const [jobList, setJobList] = useState([]);
    const [tutorList, setTutorList] = useState([]);
    const [jobAssign, setJobAssign] = useState({
        jobId: "",
        tutorId: "",
        comment: "",
    });

    console.log("jobAssign", jobAssign);
    useEffect(() => {
        if (setEditData === null) {
            setJobAssign({ jobId: '', tutorId: '', comment: '' });
        } else {
            setJobAssign({
                jobId: setEditData.jobId || '',
                tutorId: setEditData.tutorId || '',
                comment: setEditData.comment || '',
            });

        }
    }, [setEditData?._id, setEditData]);

    const notify = useCallback((type, message) => {
        ToastMessage({ type, message });
    }, []);




    /**fetch Job Request list */

    const {
        data: jobRequestList,
        isLoading,
        refetch: fetchJobRequestList,
    } = useGetAllData(
        QUERY_KEYS.GET_ALL_JOB_REQUEST_LIST,
        JOB_REQUEST_END_POINT.get(1, -1, '', true)
    );



    useEffect(() => {
        const JOBROPDOWN = mapArrayToDropdown(
            jobRequestList?.data,
            'jobId',
            '_id'
        );
        setJobList(JOBROPDOWN);
    }, [jobRequestList]);


    console.log("tutorList", tutorList);
    /**Job Request dropdown */



    /**fetch tutor list */

    const handleTutor = async (value) => {

        const fetchTutor = await get(JOB_REQUEST_END_POINT.getTutorByJobId(value));
        const TUTORDROPDOWN = mapArrayToDropdown(
            fetchTutor.data,
            'fullName',
            '_id'
        );
        setTutorList(TUTORDROPDOWN)
    }

    /**fetch tutor list  End */


    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobAssign((prev) => ({
            ...prev,
            [name]: value,
        }));
    }




    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formattedAssignInfo = {
                jobId: jobAssign.jobId,
                tutorId: jobAssign.tutorId,
                comment: jobAssign.comment,
            };

            if (setEditData?._id) {
                const update = await put(JOB_ASSIGN_END_POINT.update(setEditData._id), formattedAssignInfo);
                if (update.status === 'SUCCESS') {
                    notify('success', update.message);
                    if (isParentRender) {
                        isParentRender(true);
                    }
                    onClose();
                } else {
                    notify('error', update.errorMessage);
                }
            } else {
                const response = await post(JOB_ASSIGN_END_POINT.create(), formattedAssignInfo);
                if (response.status === 'SUCCESS') {
                    notify('success', response.message);
                    if (isParentRender) {
                        isParentRender(true);
                    }
                    onClose();
                } else {
                    notify('error', response.errorMessage);
                }
            }
        } catch (error) {
            console.error(error);
            notify('error', error.message);
        } finally {
            setLoading(false);
        }
    };






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
                                    {setEditData?._id ? "Update Class" : "Assign New Job"}
                                </h3>
                                <button
                                    onClick={() => {
                                        onClose();
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
                            {/* Your modal content goes here */}
                            <form onSubmit={handleSubmit} className="p-4 md:p-5">
                                <div className="grid gap-4 mb-4 grid-cols-2">



                                    <div className="col-span-2">
                                        <label
                                            htmlFor="subject"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Select Job
                                        </label>
                                        <div className="relative">
                                            <select
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    handleTutor(e.target.value);
                                                }}
                                                value={jobAssign?.jobId}

                                                name='jobId'
                                                id="status"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                            >
                                                <option value="" disabled>
                                                    Choose a Job
                                                </option>
                                                {jobList &&
                                                    jobList.map((job) => (
                                                        <option key={job._id} value={job._id}>
                                                            {job.jobId}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                    </div>


                                    <div className="col-span-2">
                                        <label
                                            htmlFor="subject"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Select Tutor
                                        </label>
                                        <div className="relative">
                                            <select
                                                onChange={(e) => handleChange(e)}  // <-- Pass the event to handleChange
                                                name='tutorId'
                                                id="status"
                                                value={jobAssign.tutorId} // <-- Ensure you set the selected value
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                            >
                                                <option value="" disabled>
                                                    Choose a Tutor
                                                </option>
                                                {tutorList &&
                                                    tutorList.map((tutor) => (
                                                        <option key={tutor._id} value={tutor._id}>
                                                            {tutor.fullName}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                    </div>


                                    <div className="col-span-2">
                                        <label
                                            htmlFor="status"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Comment
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4.5 top-4">
                                                <svg
                                                    className="fill-current"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                                                            fill=""
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                                                            fill=""
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_88_10224">
                                                            <rect width="20" height="20" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </span>

                                            <textarea
                                                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                name="comment"
                                                id="bio"
                                                rows={3}
                                                placeholder="Write your comment here"
                                                onChange={handleChange}
                                            // defaultValue={jobCreation?.comment}

                                            ></textarea>
                                        </div>
                                    </div>



                                </div>
                                <div className="ml-auto">
                                    <button
                                        type="submit"
                                        className="text-white inline-flex items-center bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        <svg
                                            className="me-1 -ms-1 w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {setEditData?._id ? "Update Class" : "Assign New Job"}

                                        {/* Add new Subject */}
                                    </button>
                                </div>


                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default withAuth(JobAssignForm)