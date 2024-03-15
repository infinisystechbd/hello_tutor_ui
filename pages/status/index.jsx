import React, { useEffect, useState } from 'react'
import { Button, Card, Drawer } from "@material-tailwind/react";
import { STATUS_END_POINT } from '@/constants';
import { get } from '@/helpers/api_helper';
import Axios from '@/utils/axios';
import JobCard from '@/components/JobCard';
import withAuth from '@/components/withAuth';

const JobStauts = () => {
  const { token } = Axios();
  const [activeJob, setActiveJob] = useState([]);
  const [pendingJob, setPendingJob] = useState([]);
  console.log("pendingJob", pendingJob)
  const [cancelJob, setCancelJob] = useState([]);
  const [confirmJob, setConfirmJob] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
  const [pendingStatus, setPendingStatus] = useState(false);
  const [cancelStatus, setCancelStatus] = useState(false);
  const [confirmedStatus, setConfirmedStatus] = useState(false);
  const [appliedStatus, setAppliedStatus] = useState(true);
  const [appliedJob, setAppliedJob] = useState([]);

  const handleActive = () => {

    setActiveStatus(true)
    setPendingStatus(false)
    setCancelStatus(false)
    setConfirmedStatus(false)
    setAppliedStatus(false)
  }


  const handlePending = () => {

    setPendingStatus(true)
    setActiveStatus(true)

    setCancelStatus(false)
    setConfirmedStatus(false)
    setAppliedStatus(false)
  }


  const handleCancel = () => {

    setCancelStatus(true)
    setActiveStatus(true)
    setPendingStatus(false)

    setConfirmedStatus(false)
    setAppliedStatus(false)
  }


  const handleConfirmed = () => {

    setConfirmedStatus(true)
    setActiveStatus(true)
    setPendingStatus(false)
    setCancelStatus(false)
    setConfirmedStatus(false)
    setAppliedStatus(false)
  }

  const getAllData = async () => {
    let isSubscribed = true;
    try {
      const response = await get(STATUS_END_POINT.get());
      const data = response?.data;

      if (data) {
        setAppliedJob(data);
        const activeJobs = data.filter(job => job.jobStatus === "ACTIVE");
        const pendingJobs = data.filter(job => job.jobStatus === "PENDING");
        const cancelJobs = data.filter(job => job.jobStatus === "CANCELED");
        const confirmJobs = data.filter(job => job.jobStatus === "CONFIRMED");
        setActiveJob(activeJobs);
        setPendingJob(pendingJobs);
        setCancelJob(cancelJobs);
        setConfirmJob(confirmJobs);
        setLoading(false);
      }
    } catch (error) {
      console.log("Server Error:", error);
    }

    return () => isSubscribed = false;
  }



  useEffect(() => {
    getAllData()
  }, [token]);
  return (
    <>
      <Card className="mb-4  md:h-auto w-full bg-white lg:p-8 rounded-lg  dark:border-strokedark dark:bg-boxdark   lg:max-h-full">
        <div className="justify-center items-end">
          <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-4 gap-5">

            <Button
              className="w-full h-full uppercase"
              variant="outlined"
              onClick={handleActive}
            >
              {" "}
              Active
            </Button>
            <Button
              className="w-full h-full uppercase"
              variant="outlined"
              onClick={handlePending}
            >
              {" "}
              Pending
            </Button>
            <Button
              className="w-full h-full uppercase"
              variant="outlined"
              onClick={handleCancel}
            >
              {" "}
              Canceled
            </Button>
            <Button
              className="w-full h-full uppercase"
              variant="outlined"
              onClick={handleConfirmed}
            >
              Confirmed
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex justify-center items-end">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {activeStatus && activeJob.map((jobDetail, index) => (
            <JobCard key={jobDetail.jobId} data={jobDetail}></JobCard>
          ))}

          {pendingStatus && pendingJob.map((jobDetail, index) => (
            <JobCard key={jobDetail.jobId} data={jobDetail}></JobCard>
          ))}


          {cancelStatus && cancelJob.map((jobDetail, index) => (
            <JobCard key={jobDetail.jobId} data={jobDetail}></JobCard>
          ))}

          {confirmedStatus && confirmJob.map((jobDetail, index) => (
            <JobCard key={jobDetail.jobId} data={jobDetail}></JobCard>
          ))}



          <div id="intersectionTarget"></div>
        </div>
      </div>

    </>
  )
}

export default withAuth(JobStauts)