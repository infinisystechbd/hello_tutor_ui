import { Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import { useGetAllData } from '../../../utils/hooks/useGetAllData';
import { get } from '../../../helpers/api_helper';
import { JOB_REQUEST_END_POINT } from '../../../constants';
import DataTable from 'react-data-table-component';

const AllApplied = (props) => {
  const { isAppliedModalOpen, setIsAppliedModalOpen, jobId } = props;
  const [data, setData] = useState([])


  const getAllData = async () => {
    let isSubscribed = true;
    await get(JOB_REQUEST_END_POINT.getTutorByJobId(jobId))
      .then((res) => {
        if (isSubscribed) {
          setData(res?.data);
        }
      })
      .catch((err) => {
        console.log("Server Error ~!")
      });

    return () => isSubscribed = false;
  }



  useEffect(() => {
    getAllData()
  }, [jobId]);


  const columns = [
    {
      name: <span className="fw-bold">SL</span>,
      selector: (row, index) => index + 1,
      sortable: true,
      width: '70px',
    },
    {
      name: 'Tutor Id',
      selector: (row) => row?.tutorId,
      sortable: true,
    },
    {
      name: 'Name',
      selector: (row) => row?.fullName,
      sortable: true,
    },
    {
      name: 'Phone',
      selector: (row) => row.phone,
      sortable: true,
    },


  ];

  return (
    <>
      <Modal

        centered
        open={isAppliedModalOpen}
        footer={null}
        onOk={() => setIsAppliedModalOpen(false)}
        onCancel={() => setIsAppliedModalOpen(false)}
        // style={{ marginTop: '5vh' }}
        width={1200}
        responsive={{
          // Define different widths for different screen sizes
          xs: 300,
          sm: 500,
          md: 800,
          lg: 1000,
          xl: 1200,
          xxl: 1400,
        }}
      >
        <div>

          <div className="">
            <DataTable
              columns={columns}
              data={data}
              pagination
              paginationServer
              highlightOnHover
              subHeader
              striped
            />

          </div>

        </div>
      </Modal>
    </>
  )
}

export default AllApplied