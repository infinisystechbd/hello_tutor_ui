import DebouncedSearchInput from "@/components/elements/DebouncedSearchInput";
import { TUTOR_END_POINT } from "@/constants";
import { get } from "@/helpers/api_helper";
import { Table, Tag } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const TeacherDeatils = () => {
  const router = useRouter();
  const { id } = router.query;
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [perPage, setPerPage] = useState(10);
  const [jobRequestList, setJobRequestList] = useState([]);
  const fetchTutor = async () => {
    if (id) {
      const fetchData = await get(TUTOR_END_POINT.tutorJobDetails(id));
      setJobRequestList(fetchData);
      console.log("data", fetchData);
    }
  };
  useEffect(() => {
    fetchTutor();
  }, [id]);
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
      title: "Classes",
      dataIndex: "class",
      render: (classes) => {
        if (!classes || !Array.isArray(classes)) return null; // Handle null or undefined classes
        return classes
          .filter((cls) => cls.classId && cls.classId.name) // Filter out null classId or name
          .map((cls) => cls.classId.name) // Map class names
          .join(", ");
      },
    },
    
    {
      title: "Subjects",
      dataIndex: "subject",
      render: (subjects) => subjects.map((sub) => sub.subjectId.name).join(", "),
    },
    {
      title: "City",
      dataIndex: ["city", "name"],
    },
    {
      title: "Location",
      dataIndex: ["location", "name"],
    },
    {
      title: "Salary",
      dataIndex: "salary",
    },
    {
      title: "Tutoring Time",
      dataIndex: "tutoringTime",
    },
  ];
  


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
  return (
    <div className="flex flex-col gap-10">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between items-center border-b border-stroke dark:border-strokedark">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            All Job
          </h4>
        </div>

        <div className="p-4 md:p-6 xl:p-7.5 flex justify-end">
          <DebouncedSearchInput setSearch={setSearch} />
        </div>

        {/* <TeacherForm isOpen={isModalOpen} onClose={closeModal} setEditData={editData} isParentRender={reFetchHandler} /> */}
        {/* <DeleteModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} data={editData} isParentRender={reFetchHandler} /> */}

        <Table
          className="border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark text-black dark:text-white"
          columns={columns}
          dataSource={jobRequestList?.data?.data?.map((t) => ({ ...t, key: t._id }))}
          scroll={{ x: "max-content" }}
          pagination={pagination}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default TeacherDeatils;
