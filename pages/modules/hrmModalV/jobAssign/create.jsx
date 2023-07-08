import React from 'react'
import { useEffect, useState, useCallback, Fragment } from 'react';
import Button from "../../../../components/elements/Button";
import Form from "../../../../components/elements/Form";
import Label from "../../../../components/elements/Label";
import Select from "../../../../components/elements/Select";
import Select2 from "../../../../components/elements/Select2";
import TextInput from "../../../../components/elements/TextInput";
import HeadSection from "../../../../components/HeadSection";
import { GUARDIAN_END_POINT, LOCATION_END_POINT, CITY_END_POINT,JOB_REQUEST_END_POINT,JOB_ASSIGN_END_POINT } from '../../../../constants/index';
import { get, post, put } from '../../../../helpers/api_helper';
import ToastMessage from '../../../../components/Toast';
import { useRouter } from "next/router";
import { Layout, Breadcrumb, theme } from 'antd';
import { QUERY_KEYS } from '../../../../constants/queryKeys.js';
import { useGetAllData } from '../../../../utils/hooks/useGetAllData.js';
const JobAssign = () => {
    const { Content } = Layout;
    const notify = useCallback((type, message) => {
        ToastMessage({ type, message });
    }, []);
    const [tutor, setTutor] = useState([]);
console.log("tutor",tutor);
    const [jobAssignDetails, setJobAssignDetails] = useState({
        jobId: "",
        tutorId: "",
        comment: "" ,
    });

console.log("jobAssignDetails",jobAssignDetails);

    const handleChange = (e) => {
        setJobAssignDetails(prev => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }


    /** Fetch Job Id Request */
    const {
        data: jobRequestList,
        isLoading,
        refetch: fetchJobRequestList,
    } = useGetAllData(
        QUERY_KEYS.GET_ALL_JOB_REQUEST_LIST,
        JOB_REQUEST_END_POINT.get(1, -1, '')
    );




        /** Fetch TUTOR dropdown */
        useEffect(() => {
    
            setTutor(jobRequestList?.data);
        }, [jobRequestList]);

    console.log(jobRequestList?.data);


  return (
     <>
            <HeadSection title="Add Location" />

            <div className="container-fluid ">
                <div className="w-75 m-auto">
                    <div className="row">
                        <div className="col-md-10">
                            <div className="card">
                                <div className="card-body border-bottom">
                                    <h4 className="card-title">Add Location</h4>
                                </div>

                                <Form  >

                                    <div className="card-body">

                                        <TextInput name="name" label="Location Name" placeholder="Location Name"  />
                                        <div className="mb-3 row">
                                            <Label text="Job" />
                                            <div className="col-sm-6">
                                                <Select name="jobId" value={jobRequestList?.jobId} onChange={handleChange}>
                                                {/* <Select name="jobId"> */}
                                                    {
                                                        jobRequestList?.data.map((job, index) => (
                                                            <Fragment key={index}>
                                                                <option value={job._id} selected>{job.jobId}</option>
                                                            </Fragment>
                                                        ))
                                                    }
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <Label text="Job" />
                                            <div className="col-sm-6">
                                                <Select name="tutorId" value={jobRequestList?.jobId} onChange={handleChange}>
                                                {/* <Select name="jobId"> */}
                                                    {
                                                        jobRequestList?.data?.requestedTutor?.tutorId?.map((job, index) => (
                                                            <Fragment key={index}>
                                                                <option value={job._id} selected>{job.fullName}</option>
                                                            </Fragment>
                                                        ))
                                                    }
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <Label text="Status" />
                                            <div className="col-sm-6">
                                                {/* <Select name="status" value={locationDetails.status} onChange={handleChange}> */}
                                                <Select name="status" >
                                                    <option value="" disabled>select activation type</option>
                                                    <option value="true" selected>Active</option>
                                                    <option value="false">Inactive</option>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-3 border-top">
                                        <div className="text-end">
                                            <Button className="btn-info">
                                                Save
                                            </Button>

                                        </div>
                                    </div>

                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
  )
}

export default JobAssign