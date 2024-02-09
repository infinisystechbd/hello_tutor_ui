import { DASHBOARD_END_POINT } from '@/constants';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { post } from '@/helpers/api_helper';
import Axios from '@/utils/axios';
import { useGetAllData } from '@/utils/hooks/useGetAllData';
import { useRouter } from 'next/router';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import toast from "../../components/Toast"
import Link from "next/link"
import { parseJwt } from '@/helpers/common_Helper';
const JobDetails = () => {
    const router = useRouter();
    const { id } = router?.query;
    const { data, isError, isLoading } = useGetAllData(QUERY_KEYS.GET_JOB_DETAILS, DASHBOARD_END_POINT.jobDetails(id));
    const { http, setToken, token } = Axios();
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(false);
    console.log("profile", profile);
    const notify = React.useCallback((type, message) => {
        toast({ type, message });
    }, []);


    useEffect(() => {
        const decode = parseJwt(token);
        setProfile(decode);
    }, [token]);

    const handleApply = async () => {

        setLoading(true);
        try {
            const response = await post(DASHBOARD_END_POINT.jobApply(id));
            if (response.status === 'SUCCESS') {
                notify('success', response.message);
            } else {
                notify('error', response.errorMessage);
                setLoading(false);
            }
            setLoading(false);
        } catch (error) {
            notify('error', error.message);
            setLoading(false);
        }
    }
    return (
        <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700  dark:bg-black dark:text-white">
            <div className="grid  mb-4">
                <div className="lg:flex justify-start items-start">
                    <span className='font-bold'>Job ID:</span>{data?.data?.jobId}
                </div>
                <div className="lg:flex justify-end items-start">
                    <span className='font-bold'>Posted Date:</span>{data?.data?.postedDate}
                </div>
            </div>


            <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 border-0 border-b-2">
                {data?.data.title}
            </h5>


            <div class="grid gap-x-8 gap-y-4 lg:grid-cols-3 sm:grid-cols-1">
                <div> <span className='font-bold'>Tuition Type:</span>{data?.data?.tuitionType} </div>
                <div> <span className='font-bold'> Student Gender: </span> {data?.data?.studentGender}</div>

                <div> <span className='font-bold'>Preferred Tutor:</span>{data?.data?.preferredGender}</div>
                <div> <span className='font-bold'>Tutoring Time: </span> {new Date(data?.data?.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                <div> <span className='font-bold'>Tutoring Days: </span>{data?.data?.daysPerWeek} </div>
                <div> <span className='font-bold'>Number of Students: </span>{data?.data?.noOfStudent}</div>
                <div> <span className='font-bold'>Salary: </span>{data?.data?.salary}</div>
                <div> <span className='font-bold'>Subjects: </span>{data?.data?.subjects}</div>
                <div> <span className='font-bold'>Location: </span>{data?.data?.address}</div>
            </div>
            <div className="flex justify-end">

                {token !== null ? (
                    <button onClick={handleApply}
                        className="inline-flex mt-5 items-center px-6 py-3 text-lg font-medium text-center text-white bg-blue-500 rounded-lg"
                    >
                        Apply
                    </button>

                ) : (
                    <>

                        <Link href="/login">
                            <button
                                className="inline-flex mt-5 items-center px-6 py-3 text-lg font-medium text-center text-white bg-blue-500 rounded-lg"
                            >
                                Apply
                            </button>
                        </Link>
                    </>
                )}
            </div>


        </div>

    )
}

export default JobDetails