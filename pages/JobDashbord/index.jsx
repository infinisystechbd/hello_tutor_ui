import JobCard from "@/components/JobCard";
import { DASHBOARD_END_POINT } from "@/constants";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { get } from "@/helpers/api_helper";
import { useGetAllData } from "@/utils/hooks/useGetAllData";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const JobDashboard = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [dashboard, setDashboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [fromDate, SetFromDate] = useState();
  const [toDate, SetToDate] = useState();

  const getAllData = async (limit, page) => {
    try {
      const res = await get(DASHBOARD_END_POINT.dashbord(true, limit, page));
      setDashboard((prevData) => [...prevData, ...res?.data]);
    //   setDashboard(res?.data);

      setLoading(false);
    } catch (err) {
      console.log("Server Error ~!");
    }
  };

  const handleIntersection = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && !loading) {
        // Load more data when the target element becomes visible
        setPage((prevPage) => prevPage + 1);
      }
    },
    [loading]
  );

  useEffect(() => {
    const targetElement = document.getElementById("intersectionTarget");
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1, // Adjust as needed
    });

    if (targetElement) {
      observer.observe(targetElement);
    }

    return () => {
      if (targetElement) {
        observer.unobserve(targetElement);
      }
    };
  }, [handleIntersection]);

  useEffect(() => {
    // Load initial data
    getAllData(limit, page);
  }, [limit, page]);

  return (
    <>
      <div className="flex justify-center items-end">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {dashboard.map((jobDetail, index) => (
            <JobCard key={jobDetail.jobId} data={jobDetail}></JobCard>
          ))}
          <div id="intersectionTarget"></div>
        </div>
      </div>
    </>
  );
};

export default JobDashboard;
