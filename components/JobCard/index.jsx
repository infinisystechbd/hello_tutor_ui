import Link from "next/link";
import React from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { RiGraduationCapFill } from "react-icons/ri";
import { FaDollarSign } from "react-icons/fa";
import { IoIosPerson } from "react-icons/io";
import { FaBook } from "react-icons/fa";

const JobCard = ({data}) => {
  return (

    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-black dark:text-white ">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 border-0 border-b-2">
        {data.title}
      </h5>

      <div>
        <div className="flex items-center justify-start gap-2 dark:text-white">
          <p className="font-semibold">Job Id:</p>
          <p>{data.jobId}</p>
        </div>

        <div className="flex items-center justify-start gap-2">
          <MdOutlineDateRange className="text-xl text-blue-500" />
          <p className="font-semibold">Posted Date:</p>
          <p>{data.postedDate}</p>
        </div>

        <div className="flex items-center justify-start gap-2">
          <FaBook className="text-xl text-blue-500" />
          <p className="font-semibold">Subject :</p>
          <p>{data.subjects}</p>
        </div>

        <div className="flex items-center justify-start gap-2">
          <IoLocationSharp className="text-xl text-blue-500" />
          <p></p>
          <p className="font-semibold">Location:</p>
          <p>{data.address}</p>
        </div>

        <div className="flex items-center justify-start gap-2">
          <RiGraduationCapFill className="text-xl text-blue-500" />
          <p className="font-semibold">Tuition Type:</p>
          <p>{data.tuitionType}</p>
        </div>
        <div className="flex items-center justify-start gap-2">
          <FaDollarSign className="text-xl text-blue-500" />
          <p className="font-semibold">Salary:</p>
          <p>{data.salary}</p>
        </div>
        <div className="flex items-center justify-start gap-2">
          <IoIosPerson className="text-xl text-blue-500" />
          <p className="font-semibold">Tutor prefer:</p>
          {/* <p>{data.}</p> */}
        </div>
      </div>

    <div className="flex justify-end">
    <Link
        href={`/JobDashbord/${data.jobId}`}
        className="inline-flex  justify-end mt-5 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg   "
      >
        View Detail
        <svg
          class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </Link>
    </div>
      
    </div>

  );
};

export default JobCard;