import { Modal } from 'antd';
import React from 'react'

const AllApplied = (props) => {
    const { isAppliedModalOpen, setIsAppliedModalOpen,jobId } = props;
    console.log(props);
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