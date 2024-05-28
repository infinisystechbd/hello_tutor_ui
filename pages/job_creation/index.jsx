import DebouncedSearchInput from "@/components/elements/DebouncedSearchInput";
import withAuth from "@/components/withAuth";
import { JOB_REQUEST_END_POINT } from "@/constants";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { useGetAllData } from "@/utils/hooks/useGetAllData";
import {
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Table, Tag } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import JobTrialFromV2 from "../job_trial/JobTrialFromV2";
import JobAssignFormV2 from "../jobAssign/JobAssignFormV2";

const JobManagent = () => {
  /*** Storing data start */
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [perPage, setPerPage] = useState(10);
  const [editData, setEditData] = useState({});
  const [trialData, setTrialData] = useState({});
  const [assignData, setAssignData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteIsModalOpen] = useState(false);
  const [isTrialModal, setIsTrialModal] = useState(false);
  const [isAssignModal, setIsAssignModal] = useState(false);
  /*** Storing data end */
  const router = useRouter();

  /**Function start */

  /**Job Add start */
  const handleAdd = () => {
    setIsModalOpen(true);
    setEditData(null);

    router.push({
      pathname: "../job_creation/JobCreationForm",
      query: { data: null },
    });
  };

  /**Job Add end */

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const onClose = () => {
    setIsTrialModal(!isTrialModal);
  };

  /**Function end */

  /**Job edit start */
  const handleEdit = (data) => {
    setEditData(data);
    setIsModalOpen(true);
    router.push({
      pathname: "../job_creation/JobCreationForm",
      // query: { data: data },
      query: { data: JSON.stringify(data) },
    });
  };
  /**Job edit end */

  /**Job Delete start */
  const handleDelete = (data) => {
    setEditData(data);
    setDeleteIsModalOpen(true);
  };
  const closeDeleteModal = () => {
    setDeleteIsModalOpen(false);
  };
  /**Job Delete end */

  /*** Fetch All Job List Start  */

  const {
    data: jobRequestList,
    isLoading,
    refetch: fetchJobRequestList,
  } = useGetAllData(
    QUERY_KEYS.GET_ALL_JOB_REQUEST_LIST,
    JOB_REQUEST_END_POINT.get(page, limit, search, "")
  );

  console.log("jobRequestList", jobRequestList?.data);
  //Render Function
  const reFetchHandler = (isRender) => {
    if (isRender) fetchJobRequestList();
  };

  /*** Fetch All Job List end  */

  /*** Pagination Start  */
  const pagination = {
    total: jobRequestList?.total,
    current: page,
    pageSize: perPage,
    defaultPageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ["2", "5", "10", "20", "30"],
  };

  const onChange = (pagination, filters, sorter, extra) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
  };
  const handleTrailOpen = (row) => {
    setIsTrialModal(!isTrialModal);
    setTrialData(row);
  };

  /*** Pagination End  */

  /*** Assign Start  */
  const handleAssignOpen = (row) => {
    setIsAssignModal(!isAssignModal);
    setAssignData(row);
  };

  const onAssignClose = () => {
    setIsAssignModal(!isAssignModal);
  };
  /*** Assign End  */

  const columns = [
    {
      title: "SL",
      fixed: "left",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Guardian",
      dataIndex: ["guardian", "fullName"],
      render: (text, record) => (text ? text : record.phone),
      // fixed: 'left',
    },

    {
      title: "Guardian Phone",
      dataIndex: "phone",
      // fixed: 'left',
    },
    // {
    //   title: "Tutor Address",
    //   dataIndex: "address",
    // },
    {
      title: "Trialed",
      dataIndex: "shortListedTutorForTrail",
      render: (shortListedTutorForTrail) =>
        shortListedTutorForTrail && shortListedTutorForTrail.length > 0 ? (
          <Tag color="green">Yes</Tag>
        ) : (
          <Tag color="volcano">No</Tag>
        ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) =>
        status ? (
          <Tag color="green">ACTIVE</Tag>
        ) : (
          <Tag color="volcano">INACTIVE</Tag>
        ),
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 150,
      render: (row) => actionButton(row), // You need to define actionButton function
    },
  ];

  const actionButton = (row) => {
    return (
      <>
        <Row
          justify="space-between"
          style={{ display: "flex", alignItems: "center" }}
        >
          <a onClick={() => handleTrailOpen(row)} style={{ color: "green" }}>
            <UsergroupAddOutlined style={{ fontSize: "22px" }} />
          </a>

          <a onClick={() => handleAssignOpen(row)}>
            <UserAddOutlined style={{ fontSize: "22px" }} />
            {/* <DeleteOutlined style={{ fontSize: "22px" }} /> */}
          </a>

          <a onClick={() => handleEdit(row)} className="text-primary">
            <EditOutlined style={{ fontSize: "22px" }} />
          </a>

          <a onClick={() => handleDelete(row)} className="text-danger">
            <DeleteOutlined style={{ fontSize: "22px" }} />
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
            All Job
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
          <DebouncedSearchInput setSearch={setSearch} />
        </div>

        {/* <TeacherForm isOpen={isModalOpen} onClose={closeModal} setEditData={editData} isParentRender={reFetchHandler} /> */}
        {/* <DeleteModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} data={editData} isParentRender={reFetchHandler} /> */}

        <Table
          className="border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark text-black dark:text-white"
          columns={columns}
          dataSource={jobRequestList?.data?.map((t) => ({ ...t, key: t._id }))}
          scroll={{ x: "max-content" }}
          pagination={pagination}
          onChange={onChange}
        />

        <JobTrialFromV2
          isOpen={isTrialModal}
          trialData={trialData}
          onClose={onClose}
        />
        <JobAssignFormV2
          isOpen={isAssignModal}
          assignData={assignData}
          onClose={onAssignClose}
        />
      </div>
    </div>
  );
};

export default withAuth(JobManagent);
