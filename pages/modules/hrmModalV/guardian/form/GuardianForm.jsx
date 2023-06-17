import { Button, Form, Input, Modal, Select } from 'antd';
import { useRouter } from 'next/router';
import { useCallback, useState, useEffect } from 'react';
import ToastMessage from '../../../../../components/Toast';
import { GUARDIAN_END_POINT, LOCATION_END_POINT, CITY_END_POINT } from '../../../../../constants/index';
import { get, post, put } from '../../../../../helpers/api_helper';
function GuardianForm(props) {
  const { isModalOpen, setIsModalOpen, isParentRender, setEditData } = props;
  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);
  const { Option } = Select;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [cityList, setAllCityList] = useState([]);
  const [locationList, setAllLocationList] = useState([]);

  /** Fetch city */
  useEffect(() => {
    const controller = new AbortController();
    const fetchTotalCities = async () => {
      let isSubscribed = true;
      try {
        const getAllList = await get(CITY_END_POINT.get());
        setAllCityList(getAllList?.data);

      } catch (error) {
        console.log("find the error");
      }

      return () => isSubscribed = false;
    }
    fetchTotalCities();
  }, [])
  /** Fetch city end */

  /** Fetch Location */
  useEffect(() => {
    const controller = new AbortController();
    const fetchTotalLocation = async () => {
      let isSubscribed = true;
      try {
        const getAllLocationList = await get(LOCATION_END_POINT.get());
        setAllLocationList(getAllLocationList?.data);

      } catch (error) {
        console.log("find the error");
      }

      return () => isSubscribed = false;
    }
    fetchTotalLocation();
  }, [])
 /** Fetch Location end */


/** from design  */
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
/** end from design  */


/** create from or edit from   */

  if (setEditData != null) {
    form.setFieldsValue({
      fullName: setEditData.fullName,
      phone: setEditData.phone,
      city: setEditData.city,
      location: setEditData.location,
      address: setEditData.address,
      email: setEditData.email,
      isPortalAccess: setEditData.isPortalAccess,
      status: setEditData.status,
    });
  } else {
    form.resetFields();
  }
/** create from or edit from end  */


/** create from or edit from submits  */
  const onFinish = async (values) => {
    setLoading(true);
    if (setEditData?._id) {
      try {
        const update = await put(GUARDIAN_END_POINT.update(setEditData._id), values);
        if (update.status == 'SUCCESS') {
          notify('success', update.message);
        }
      } catch (error) {
        notify('error', update.errorMessage);
        setLoading(false);
      }
    } else {
      const response = await post(GUARDIAN_END_POINT.create(), values,);
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
/** create from or edit from submits end  */


  const onFinishFailed = (errorInfo) => {
    notify('error', errorInfo);
  };

  
  return (
    <Modal
      title={setEditData != null ? 'Update Gaurdian' : 'Add Guardian'}
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
          name="fullName"
          label="FullName"
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
          name="phone"
          label="Phone"
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
          name="city"
          label="City"
          rules={[
            {
              required: true,
            },
          ]}

          hasFeedback
        >
          <Select placeholder="Select a City" allowClear>
            {cityList?.map((city) => (
              <Option key={city._id} value={city._id}>{city.name}</Option>
            ))}
          </Select>
        </Form.Item>



        <Form.Item
          name="location"
          label="Location"
          rules={[
            {
              required: true,
            },
          ]}
          hasFeedback

        >
          <Select placeholder="Select a option" allowClear>
            {locationList?.map((locn) => (
              <Option key={locn._id} value={locn._id}>{locn.name}</Option>
            ))}
          </Select>
        </Form.Item>


        <Form.Item
          name="address"
          label="Address"
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
          name="isPortalAccess"
          label="Portal Access"
          rules={[
            {
              required: true,
            },
          ]}
          initialValue={false}
        >
          <Select placeholder="Select a option" allowClear>
            <Option value={true}>Active</Option>
            <Option value={false}>Inactive</Option>
          </Select>
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
export default GuardianForm;