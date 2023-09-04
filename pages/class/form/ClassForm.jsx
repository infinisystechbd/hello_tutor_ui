import { Button, Form, Input, Modal, Select, InputNumber, AutoComplete } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import ToastMessage from '../../../components/Toast';
import {
  CLASS_END_POINT,
  SUBJECT_END_POINT,
} from '../../../constants/index.js';
import { QUERY_KEYS } from '../../../constants/queryKeys.js';
import { post, put } from '../../../helpers/api_helper.js';
import { mapArrayToDropdown } from '../../../helpers/common_Helper.js';
import { useGetAllData } from '../../../utils/hooks/useGetAllData.js';

function ClassForm(props) {
  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);
  const { isModalOpen, setIsModalOpen, isParentRender, setEditData } = props;
  const { Option } = Select;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState([]);
  console.log("subject", subject);
  const [status, setStatus] = useState(true);
  console.log(subject);
  if (setEditData == null) {
    form.resetFields();
  } else {
    form.setFieldsValue({
      name: setEditData.name,
      subject: setEditData?.subject?.map((t) => t.subjectId)?.map((t) => t?.name),
      status: setEditData.status,
    });
  }



  /**fetch subject list */

  const {
    data: subjectList,
    isLoading,
    refetch: fetchSubjectList,
  } = useGetAllData(
    QUERY_KEYS.GET_ALL_SUBJECT_LIST,
    SUBJECT_END_POINT.get(1, -1, '', status)
  );

  /**subject dropdown */
  useEffect(() => {
    const SUBJECTDROPDOWN = mapArrayToDropdown(
      subjectList?.data,
      'name',
      '_id'
    );

    const allSubj = SUBJECTDROPDOWN?.map((item) => ({
      id: item?._id,
      value: item?.name,
    }));
    console.log("allSubj", allSubj);
    setSubject(allSubj);
    // setSubject(SUBJECTDROPDOWN);
  }, [subjectList]);





  /**fetch subject list  End */


  const [selectedValue, setSelectedValue] = useState('');
  console.log("selectedValue", selectedValue);
  const handleSelect = (value, option) => {
    setSelectedValue(option.value);
  };




  const onFinish = async (values) => {
    setLoading(true);

    const subjects = values.subject?.map((subjectId) => ({
      subjectId: subjectId,
    }));
    // setEditData.subject = subjects;
    values.subject = subjects;
    try {
      if (setEditData?._id) {
        const update = await put(CLASS_END_POINT.update(setEditData?._id), values);
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
      title={setEditData ? 'Update' : 'Add'}
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
              message: 'Class name is required',
            },
            {
              pattern: /^[A-Za-z][A-Za-z0-9\s]*$/,
              message: 'Class name should start with a letter and can only contain letters, numbers, and spaces',
            },
            {
              max: 50,
              message: 'Class name should not exceed 50 characters',
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

        {/* <Form.Item
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
   <AutoComplete
      style={{ width: 200 }}
      options={subject}
      placeholder="try to type `b`"
      filterOption={(inputValue, option) =>
        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
      onSelect={handleSelect} 
      defaultValue={selectedValue}   
    />

</Form.Item> */}


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
          <Button
            style={{
              backgroundColor: "#007bff",
              color: "#fff",

            }}

            type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
export default ClassForm;
