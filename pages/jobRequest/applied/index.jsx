import { Modal } from 'antd';
import React, { useEffect } from 'react'
import { useGetAllData } from '../../../utils/hooks/useGetAllData';
import { get} from '../../../helpers/api_helper';
import { JOB_REQUEST_END_POINT } from '../../../constants';
const AllApplied = (props) => {
    const { isAppliedModalOpen, setIsAppliedModalOpen,jobId } = props;
    console.log(props);



    const getAllData = async () =>{

      let isSubscribed = true;
      await get(JOB_REQUEST_END_POINT.getTutorByJobId(jobId))
        .then((res) => {
          if (isSubscribed) {
            console.log(res?.data);
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
    <div>AllApplied</div>
    </Modal>
    </>
  )
}

export default AllApplied