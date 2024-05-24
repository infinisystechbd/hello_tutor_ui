import ToastMessage from "@/components/Toast";
import { JOB_REQUEST_END_POINT, TRIAL_END_POINT } from "@/constants";
import { get, post } from "@/helpers/api_helper";
import { CheckOutlined } from "@ant-design/icons";
import { Row, Table, Tag } from "antd";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const JobTrialFromV2 = ({ isOpen, onClose, trialData }) => {
  console.log("trialData",trialData)
  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);
  const [shortList, setShortList] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [jobRequestList, setJobRequestList] = useState({});

  const fetchJobList = async () => {
    if (trialData?._id) {
      const fetchData = await get(
        JOB_REQUEST_END_POINT.getTutorByJobId(trialData?._id)
      );
      setJobRequestList(fetchData);
    }
  };
  useEffect(() => {
    fetchJobList();
  }, [trialData?._id]);

  const handleSubmit = async () => {
    // setLoading(true);
    // console.log("shortList",shortList);
    // return;

    const response = await post(
      TRIAL_END_POINT.create(trialData?._id),
      {shortListedTutorForTrail:shortList}
    );
    if (response.status === "SUCCESS") {
      notify("success", response.message);

      onClose();
    } else {
      notify("error", response.errorMessage);
    }
  };
  const SelectedForTrial = (row) => {
    if (dataList.length == 0) {
      setDataList([...dataList, row]);
      setShortList([...shortList, { tutorId: row?._id }]);
    }
    let isExist = dataList?.find((t) => t._id == row?._id);
    if (!isExist) {
      setDataList([...dataList, row]);
      setShortList([...shortList, { tutorId: row?._id }]);
    }
  };
  console.log(trialData);
  console.log(jobRequestList);
  const columns = [
    {
      title: "FullName",
    dataIndex: "fullName",
    key: "fullName",
    render: (text, record) => (
      <Link href={`/teacher/${record._id}`} legacyBehavior>
        <a target="_blank">{text}</a>
      </Link>
    ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 100,
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
          <a onClick={() => SelectedForTrial(row)} className="text-primary">
            <CheckOutlined style={{ fontSize: "22px" }} />
          </a>
        </Row>
      </>
    );
  };
  const handleClose = (removedTag) => {
    console.log(shortList);
    setDataList(dataList?.filter((t) => t._id != removedTag));
    setShortList(shortList?.filter((t) => t.tutorId != removedTag));
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
                  Trail List
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
              <h6>Trial List</h6>
              {dataList?.map((t) => (
                <Tag
                  closable
                  onClose={() => {
                    handleClose(t._id);
                  }}
                  key={t._id}
                >
                  {t.fullName}
                </Tag>
              ))}
              <hr />
              {/* Your modal content goes here */}
              <Table
                className="border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark text-black dark:text-white"
                columns={columns}
                dataSource={jobRequestList?.data}
                scroll={{ x: "max-content" }}
              />
              <div className="ml-auto">
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => handleSubmit()}
                >
                  Ready For Trial
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobTrialFromV2;
