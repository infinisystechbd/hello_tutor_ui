import { JOB_REQUEST_END_POINT, TRIAL_END_POINT } from '@/constants';
import { get } from '@/helpers/api_helper';
import { mapArrayToDropdown } from '@/helpers/common_Helper';
import React, { useEffect, useState } from 'react'
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Table, Tag } from "antd";
import DebouncedSearchInput from '@/components/elements/DebouncedSearchInput';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useGetAllData } from '@/utils/hooks/useGetAllData';
import JobTrialForm from './JobTrialForm';


const JobTrial = () => {
  const [teacherDropDown, setTeacherDropDown] = useState([]);
  const [loading, setLoading] = useState(false);
  const [jobList, setJobList] = useState([]);


  /*** Storing data start */
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [perPage, setPerPage] = useState(10);
  const [editData, setEditData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteIsModalOpen] = useState(false);
  /*** Storing data end */

  /**from Add start */
  const handleAdd = () => {
    setIsModalOpen(true);
    setEditData(null);
  };
  /**from Add end */


      /**Modal close Function  Start*/
      const closeModal = () => {
        setIsModalOpen(false);
    };
    /**Modal close Function  End*/




  /**fetch Job list list */

  const {
    data: jobRequestList,
    isLoading,
    refetch: fetchJobRequestList,
  } = useGetAllData(
    QUERY_KEYS.GET_ALL_JOB_REQUEST_LIST,
    TRIAL_END_POINT.get()
  );

  /**Job list dropdown */

  const reFetchHandler = (isRender) => {
    if (isRender) fetchJobRequestList();
};


  /** Column Start */
  const columns = [
    {
      title: 'SL',
      fixed: 'left',
      render: (text, record, index) => index + 1
    },
    {
      title: 'JobId',
      dataIndex: "_id",

    },
    {
      title: 'Created By',
      dataIndex: ["createdBy", "fullName"],

    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 100,
      render: (row) => actionButton(row), // You need to define actionButton function
    },
  ];


  const actionButton = (row) => {
    return (
      <>
        <Row justify="space-between" style={{ display: 'flex', alignItems: 'center' }}>
          <a onClick={() => handleViewOpen(row)} style={{ color: 'green' }}>
            <EyeOutlined style={{ fontSize: '22px' }} />
          </a>

          <a onClick={() => handleEdit(row)} className="text-primary" >
            <EditOutlined style={{ fontSize: '22px' }} />
          </a>

          <a onClick={() => handleDelete(row)} className="text-danger" >
            <DeleteOutlined style={{ fontSize: '22px' }} />
          </a>
        </Row>
      </>
    );
  };


  return (
    <div className="flex flex-col gap-10">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between items-center border-b border-stroke dark:border-strokedark">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            All Trial Job
          </h4>
          <button
            href="#"
            className="inline-flex items-center justify-center rounded-full bg-primary py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            onClick={handleAdd}
          >
            Add
            <span className="button-icon-space ml-5">
              <FontAwesomeIcon icon={faPlusCircle} />
            </span>
          </button>
        </div>

        <div className="p-4 md:p-6 xl:p-7.5 flex justify-end">
          {/* <DebouncedSearchInput setSearch={setSearch} /> */}
        </div>

        <JobTrialForm   isOpen={isModalOpen} onClose={closeModal} setEditData={editData} isParentRender={reFetchHandler} />


        <Table
          className="border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark text-black dark:text-white"
          columns={columns}
          dataSource={jobRequestList?.data}
          scroll={{ x: "max-content" }}
          pagination
        // onChange={onChange}
        />
      </div>
    </div>
  )
}

export default JobTrial