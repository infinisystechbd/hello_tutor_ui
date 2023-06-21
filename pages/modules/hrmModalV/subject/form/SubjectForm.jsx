import { Button, Form, Input, Modal, Select } from 'antd';
import { useCallback, useState } from 'react';
import ToastMessage from '../../../../../components/Toast';
import { SUBJECT_END_POINT } from '../../../../../constants/index';
import { post, put } from '../../../../../helpers/api_helper';
function SubjectForm(props) {
  const { isModalOpen, setIsModalOpen, isParentRender, setEditData } = props;

  console.log(setEditData);
  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);
  const { Option } = Select;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 6,
      span: 16,
    },
  };


  const onFinish = async (values) => {
    setLoading(true);
    setEditData.name = values.name;
    setEditData.status = values.status;
    if (setEditData?._id) {
      try {
        const update = await put(SUBJECT_END_POINT.update(setEditData._id),values);
        if (update.status == 'SUCCESS') {
          notify('success', update.message);
        }
      } catch (error) {
        notify('error', update.errorMessage);
        setLoading(false);
      }
    } else {
      const response = await post(SUBJECT_END_POINT.create(), values);
      if (response.status === 'SUCCESS') {
        notify('success', response.message);
        if (isParentRender) {
          isParentRender(true);
        }
      } else {
        notify('error', response.errorMessage);
        setLoading(false);
      }
    }

    setIsModalOpen(!isModalOpen);
    setLoading(false);
  };
  const onFinishFailed = (errorInfo) => {
    notify('error', errorInfo);
    // console.log('Failed:', errorInfo);
  };
  if (setEditData != null) {
    console.log({setEditData})
    form.setFieldsValue({
      name: setEditData.name,
      status: setEditData.status,
    });
  } else {
    form.resetFields();
  }
  return (
    <Modal
      title={setEditData != null ? 'Update Subject' : 'Add Subject'}
      style={{ top: 20 }}
      centered
      open={isModalOpen}
      footer={null}
      onOk={() => setIsModalOpen(false)}
      onCancel={() => setIsModalOpen(false)}
    >
      <Form
        className='mt-3'
        {...layout}
        {...setEditData}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item
          name="name"
          label="Subject Name"
          rules={[
            {
              required: true,
              message: 'Subject name is required',
            },
            {
              pattern: /^[A-Za-z\s]+$/,
              message: 'Subject name should only contain letters and spaces',
            },
            {
              max: 50,
              message: 'Subject name should not exceed 50 characters',
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[
            {
              required: true,
            },
          ]}
          initialValue={true}
          hasFeedback
        >
          <Select placeholder="Select a option" allowClear>
            <Option value={true}>Active</Option>
            <Option value={false}>Inactive</Option>
          </Select>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
export default SubjectForm;