import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import Axios from '../../../';
import ToastMessage from '../../../../components/Toast';
import DeleteIcon from '../../../../components/elements/DeleteIcon';
import EditIcon from '../../../../components/elements/EditIcon';
import ViewIcon from '../../../../components/elements/ViewIcon';
import { GUARDIAN_END_POINT } from '../../../../constants/api_endpoints/guardianEndPoints';
import { QUERY_KEYS } from "../../../../constants/queryKeys";
import { del, get } from '../../../../helpers/api_helper';
import { useGetAllData } from "../../../../utils/hooks/useGetAllData";

const ManageGuardian = () => {

  

  const { http } = Axios;
  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);

  const [pending, setPending] = useState(false);
const { data: guardianList, isLoading, refetch: fetchGuardianList } = useGetAllData(QUERY_KEYS.GET_ALL_GUARDIAN_LIST, GUARDIAN_END_POINT.get());
const data = subjectList?.data;
console.log("call from subject list",data);
  return (
    <div>ManageGuardian</div>
  )
}

export default ManageGuardian