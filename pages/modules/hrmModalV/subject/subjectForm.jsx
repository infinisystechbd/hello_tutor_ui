import { Button, Form, Input, Modal, Select } from 'antd';
import React from 'react';

 const subjectForm = ({isModalOpen , setIsModalOpen}) => {
const { Option } = Select;
const [form] = Form.useForm
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};


const onFinish = async (values) => {
    console.log('Success:', values);
    setLoading(true)
    const response = await post(SUBJECT_END_POINT.create(), values);
    if (response.status === 'SUCCESS') {
      notify('success', response.message);
      router.push(`/modules/hrm/subject`);
    } else {
      notify('error', response.errorMessage);
    }
    setLoading(false);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Modal
        title="Add Subject"
        style={{ top: 20 }}
        centered
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form
                  {...layout}
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
                      },
                    ]}
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
                  >
                    <Select placeholder="Select a option" allowClear >
                      <Option value="true" >Active</Option>
                      <Option value="false">Inactive</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                      Submit
                    </Button>
                  </Form.Item>
                </Form>

      </Modal>
  )
}
export default subjectForm;
