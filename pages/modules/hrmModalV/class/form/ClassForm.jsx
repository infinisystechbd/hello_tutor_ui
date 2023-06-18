import { Button, Form, Input, Modal, Select } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import ToastMessage from '../../../../../components/Toast';
import {
  CLASS_END_POINT,
  SUBJECT_END_POINT,
} from '../../../../../constants/index.js';
import { QUERY_KEYS } from '../../../../../constants/queryKeys.js';
import { post, put } from '../../../../../helpers/api_helper.js';
import { mapArrayToDropdown } from '../../../../../helpers/common_Helper.js';
import { useGetAllData } from '../../../../../utils/hooks/useGetAllData.js';

function ClassForm(props) {
  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);
  const { isModalOpen, setIsModalOpen, isParentRender, edit } = props;
  console.log({ edit });
  const { Option } = Select;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState([]);
  // const [initialValue, setInitialValue]= useState({})
  console.log(edit);

  //  let initialValue = {};
  //  console.log({initialValue})
  if (edit == null) {
    form.resetFields();
  } else {
    form.setFieldsValue({
      name: edit.name,
      subject: edit?.subject?.map((t) => t.subjectId)?.map((t) => t._id),
      status: edit.status,
    });
  }

  // fetch subject list
  const {
    data: subjectList,
    isLoading,
    refetch: fetchSubjectList,
  } = useGetAllData(
    QUERY_KEYS.GET_ALL_SUBJECT_LIST,
    SUBJECT_END_POINT.get(1, -1, '')
  );
  //subject dropdown
  useEffect(() => {
    const SUBJECTDROPDOWN = mapArrayToDropdown(
      subjectList?.data,
      'name',
      '_id'
    );
    setSubject(SUBJECTDROPDOWN);
  }, [subjectList]);
  const onFinish = async (values) => {
    setLoading(true);
   
    const subjects = values.subject?.map((subjectId) => ({
      subjectId: subjectId,
    }));
   // edit.subject = subjects;
    values.subject = subjects;
    try {
      if (edit?._id) {
        const update = await put(CLASS_END_POINT.update(edit?._id), values);
        console.log(update)
        if (update.status === 'SUCCESS') {
          notify('success', update.message);
          if (isParentRender) {
            isParentRender(true);
          }
          setIsModalOpen(false);
        } else {
          notify('error', update.errorMessage);
          setLoading(false);
        }
      } else {
        const response = await post(CLASS_END_POINT.create(), values);
        if (response.status === 'SUCCESS') {
          notify('success', response.message);
          if (isParentRender) {
            isParentRender(true);
          }
          setIsModalOpen(false);
        } else {
          notify('error', response.errorMessage);
          setLoading(false);
        }
      }
      setLoading(false);
    } catch (error) {
      notify('error', error.message);
      setLoading(false);
    }
  };

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

  return (
    <Modal
      title={edit ? 'Update' : 'Add'}
      style={{ top: 20 }}
      centered
      open={isModalOpen}
      footer={null}
      onOk={() => setIsModalOpen(false)}
      onCancel={() => setIsModalOpen(false)}
    >
      <Form
        className="mt-3"
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
          label="Class"
          rules={[
            {
              required: true,
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="subject"
          label="Select Subject"
          rules={[
            {
              required: true,
              message: 'Please select subject!',
              type: 'array',
            },
          ]}
          hasFeedback
        >
          <Select
            mode="multiple"
            placeholder="Please select subject"
            options={subject}
          />
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
export default ClassForm;
