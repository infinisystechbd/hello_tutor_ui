import { Button, Card, Form, Input, Select } from 'antd';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import ToastMessage from '../../../../../components/Toast/index';
import { SUBJECT_END_POINT } from '../../../../../constants/index';
import { post } from '../../../../../helpers/api_helper';
const { Option } = Select;
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
const Subject = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);
 /*  const [subjectDetails, setSubjectDetails] = useState({
    name: '',
    status: '' || 'true',
  });
  console.log(subjectDetails);

  const handleChange = (e) => {
    setSubjectDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }; */

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

 /*  async function submitForm(e) {
    e.preventDefault();
    console.log(subjectDetails);
    const response = await post(SUBJECT_END_POINT.create(), subjectDetails);
    if (response.status === 'SUCCESS') {
      notify('success', response.message);
      router.push(`/modules/hrm/subject`);
    } else {
      notify('error', response.errorMessage);
    }
    // try{

    // }catch(error){
    //   let message;
    //   const errorStatus = error?.response?.status;
    //   notify("error", message);

    // }
  } */

  return (
    <>
      <div className="container-fluid ">
        <div className="w-75 m-auto">
          <div className="row">
            <div className="col-md-10">
              <Card title="Add Subject" bordered={false}>

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
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subject;
