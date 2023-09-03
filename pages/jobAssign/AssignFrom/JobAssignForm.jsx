import { useCallback, useState } from 'react';
import { Button, Form, Input, Modal, Select } from 'antd';
import ToastMessage from '../../../components/Toast';
const JobAssignForm = (props) => {

    const { isAssignModalOpen, setIsAssignModalOpen, isParentRender, setAssignData } = props;
  
  console.log(setAssignData);
    return (
    <Modal
    title= 'Assign Job'
    style={{ top: 20 }}
    centered
    open={isAssignModalOpen}
    footer={null}
    onOk={() => setIsAssignModalOpen(false)}
    onCancel={() => setIsAssignModalOpen(false)}
  >


</Modal>
  )
}

export default JobAssignForm