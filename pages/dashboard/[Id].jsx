import { useRouter } from 'next/router';
import React from 'react';
import { DASHBOARD_END_POINT } from '../../constants';
import { QUERY_KEYS } from '../../constants/queryKeys';
import { useGetAllData } from '../../utils/hooks/useGetAllData';

const JobDetails = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const { Id } = router?.query;
 
 const {data: jobDetail } = useGetAllData(QUERY_KEYS.GET_JOB_DETAILS, DASHBOARD_END_POINT.jobDetails(Id));
  console.log(jobDetail)
  return (
    <div>jobDetails</div>
  )
}

export default JobDetails