
import React, { useCallback, useState, useEffect } from 'react';
import { Button, Col, Form, Input, Modal, Row, Select, InputNumber, Radio, DatePicker, TimePicker } from "antd";
import { GUARDIAN_END_POINT, TUTOR_END_POINT, LOCATION_END_POINT, CITY_END_POINT, CATEGORIE_END_POINT, CLASS_END_POINT, SUBJECT_END_POINT ,TUTOR_REQUEST_END_POINT} from '../../../../../constants/index';
import { get, post, put } from '../../../../../helpers/api_helper';
import { QUERY_KEYS } from '../../../../../constants/queryKeys.js';
import { mapArrayToDropdown } from '../../../../../helpers/common_Helper.js';
import { useGetAllData } from '../../../../../utils/hooks/useGetAllData.js';
import ToastMessage from '../../../../../components/Toast';
import moment from 'moment';
const TutorRequestFrom = (props) => {
  const { isModalOpen, setIsModalOpen, isParentRender, setEditData } = props;
  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { Option } = Select;
  const [allGuardianList, setAllGuardianList] = useState([]);
  const [allCategoryList, setAllCategoryList] = useState([]);
  const [allClassesList, setAllClassesList] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subject, setSubject] = useState([]);
  const [cityList, setAllCityList] = useState([]);
  const [locationList, setAllLocationList] = useState([]);
  // setCity
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

  const style = {
    background: "#0092ff",
    padding: "8px 0",
  };


  /** Fetch Guardian List */
  useEffect(() => {
    const controller = new AbortController();
    const fetchTotalGuardian = async () => {
      let isSubscribed = true;
      try {
        const getAllGuardianList = await get(GUARDIAN_END_POINT.get());
        setAllGuardianList(getAllGuardianList?.data);

      } catch (error) {
        console.log("find the error");
      }

      return () => isSubscribed = false;
    }
    fetchTotalGuardian();
  }, [])
  /** Fetch Guardian List End */




  /** Fetch CategoryList List */
  useEffect(() => {
    const controller = new AbortController();
    const fetchTotalCategory = async () => {
      let isSubscribed = true;
      try {
        const getAllCategoryList = await get(CATEGORIE_END_POINT.get());
        setAllCategoryList(getAllCategoryList?.data);

      } catch (error) {
        console.log("find the error");
      }

      return () => isSubscribed = false;
    }
    fetchTotalCategory();
  }, [])

  /** Fetch CategoryList List End */


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




/**fetch class list */ 
  const {
    data: classList,
    // isLoading,
    refetch: fetchClassList,
  } = useGetAllData(
    QUERY_KEYS.GET_ALL_ClASS_LIST,
    CLASS_END_POINT.get(1, -1, '')
  );
  //class dropdown
  useEffect(() => {
    const CLASSDROPDOWN = mapArrayToDropdown(
      classList?.data,
      'name',
      '_id'
    );
    setClasses(CLASSDROPDOWN);
  }, [classList]);



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






  /** create from or edit from   */

  if (setEditData != null) {
    form.setFieldsValue({
      guardian: setEditData.guardian,
      category: setEditData.category,
      subject: setEditData?.subject?.map((t) => t.subjectId)?.map((t) => t._id),
      class: setEditData?.classes?.map((t) => t.classId)?.map((t) => t._id),
      // city: setEditData?.city?.map((t) => t.subjectId)?.map((t) => t._id),
      studentGender: setEditData.studentGender,
      city: setEditData.city,
      location: setEditData.location,
      address: setEditData.address,
      teacherGender: setEditData.teacherGender,
      daysPerWeek: setEditData.daysPerWeek,
      preferenceInstitute: setEditData.preferenceInstitute,
      salary: setEditData.salary,
      requirement: setEditData.requirement,
      status: setEditData.status,
    });
  } else {
    form.resetFields();
  }
  /** create from or edit from end  */






  const onFinish = async (values) => {


    const formattedDate = moment(values.hireDate).format('DD/MM/YYYY');
    const formattedTime = moment(values.tutoringTime).format('h:mm A');
    // console.log(formattedDate);tutoringTime
    console.log(values, formattedDate, formattedTime);
    const subjects = values.subject?.map((subjectId) => ({
      subjectId: subjectId,
    }));
    values.subject = subjects;
    const classes = values.class?.map((classId) => ({
      classId: classId,
    }));
    values.class = classes;

    try {
      if (setEditData?._id) {
        const update = await put(TUTOR_REQUEST_END_POINT.update(setEditData?._id), values, formattedDate, formattedTime);
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
        const response = await post(TUTOR_REQUEST_END_POINT.create(), values, formattedDate, formattedTime);
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

  return (
    <Modal
      title={setEditData != null ? "Update Job Request" : "Add Job Request"}
      // style={{ top: 5 }}
      centered
      open={isModalOpen}
      footer={null}
      onOk={() => setIsModalOpen(false)}
      onCancel={() => setIsModalOpen(false)}
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
      <Form
        className="mt-3"
        {...layout}
        {...setEditData}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
      // style={{
      //   maxWidth: 800,
      // }}
      >
        <div className="row">
          <div className="col-12 col-md-7">
            <div className="row">
              <div className="col-12">
                <div className="card shadow">
                  <div className="card-body">
                    <h4 className="card-title border-bottom">
                      {" "}
                      Guardian Information
                    </h4>




                    <Form.Item
                      name="guardian"
                      label="Guardian"
                      rules={[
                        {
                          required: true,
                        },
                      ]}

                      hasFeedback
                    >
                      <Select placeholder="Select a Guardian" allowClear>
                        {allGuardianList?.map((guardian) => (
                          <Option key={guardian._id} value={guardian._id}>{guardian.fullName}</Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name="category"
                      label="Category"
                      rules={[
                        {
                          required: true,
                        },
                      ]}

                      hasFeedback
                    >
                      <Select placeholder="Select a Category" allowClear>
                        {allCategoryList?.map((category) => (
                          <Option key={category._id} value={category._id}>{category.name}</Option>
                        ))}
                      </Select>
                    </Form.Item>


                    <Form.Item
                      name="noOfStudent"
                      label="Number of Students"
                      rules={[
                        {
                          required: true,
                          message: 'Number of students is required',
                        },
                        {
                          type: 'number',
                          min: 1,
                          message: 'Number of students should be at least 1',
                        },
                        {
                          type: 'number',
                          max: 100,
                          message: 'Number of students cannot exceed 100',
                        },
                      ]}
                      hasFeedback
                    >
                      <InputNumber />
                    </Form.Item>


                    <Form.Item
                      name="class"
                      label="Select class"
                      rules={[
                        {
                          required: true,
                          message: 'Please select class!',
                          type: 'array',
                        },
                      ]}
                      hasFeedback
                    >
                      <Select
                        mode="multiple"
                        placeholder="Please select class"
                        options={classes}
                      />
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
                      name="studentGender"
                      label="Gender"
                      rules={[
                        {
                          required: true,
                          message: 'Please select a gender',
                        },
                      ]}
                    >
                      <Radio.Group>
                        <Radio value="male">Male</Radio>
                        <Radio value="female">Female</Radio>
                        <Radio value="other">Other</Radio>
                      </Radio.Group>
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
                      label="Address"
                      name="address"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter the full permanent address',
                        },
                      ]}
                    >
                      <Input.TextArea
                        rows={3}
                        placeholder="Enter Full Address"
                      />
                    </Form.Item>





                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-5">
            <div className="row">
              <div className="col-12">
                <div className="card shadow">
                  <div className="card-body">
                    <h4 className="card-title border-bottom">
                      {" "}
                      Tutor Information
                    </h4>
                    <Form.Item
                      name="teacherGender"
                      label="Gender"
                      rules={[
                        {
                          required: true,
                          message: 'Please select a gender',
                        },
                      ]}
                    >
                      <Radio.Group>
                        <Radio value="male">Male</Radio>
                        <Radio value="female">Female</Radio>
                        <Radio value="other">Other</Radio>
                      </Radio.Group>
                    </Form.Item>

                    <Form.Item
                      label="Days / Week"
                      name="daysPerWeek"
                      rules={[
                        {
                          required: true,
                          message: 'Days per week is required',
                        },
                        {
                          type: 'number',
                          min: 1,
                          message: 'Days per week should be at least 1',
                        },
                        {
                          type: 'number',
                          max: 7,
                          message: 'Days per week cannot exceed 7',
                        },
                      ]}
                    >
                      <InputNumber
                        placeholder="Enter days per week"
                        min={1}
                        max={7}
                        style={{ width: '100%' }}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Preference Institute Name"
                      name="preferenceInstitute"
                      rules={[
                        {
                          required: true,
                          message: 'Preference Institute Name is required',
                        },
                      ]}
                    >
                      <Input
                        placeholder="Enter preference institute name"
                      />
                    </Form.Item>

                    <Form.Item
                      label="Salary (BDT)"
                      name="salary"
                      rules={[
                        {
                          required: true,
                          message: 'Salary is required',
                        },
                      ]}
                    >
                      <InputNumber
                        placeholder="Enter expected salary per month"
                      />
                    </Form.Item>

                    <Form.Item
                      label="Hire Date"
                      name="hireDate"
                      rules={[
                        {
                          required: true,
                          message: 'Hire Date is required',
                        },
                      ]}
                    >
                      <DatePicker
                        style={{ width: '300px', height: '40px' }}
                        format="DD/MM/YYYY"
                      />
                    </Form.Item>

                    <Form.Item
                      label="Tutoring Time"
                      name="tutoringTime"
                      rules={[
                        {
                          required: true,
                          message: 'Tutoring Time is required',
                        },
                      ]}
                    >
                      <TimePicker
                        style={{ width: '300px', height: '40px' }}
                        format="h:mm A"
                      />
                    </Form.Item>

                    <Form.Item
                      label="More Requirement"
                      name="requirement"
                      rules={[
                        {
                          required: true,
                          message: 'Requirement is required',
                        },
                      ]}
                    >
                      <Input.TextArea
                        rows={2}
                        placeholder="Enter Full requirement"
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
                      hasFeedback
                      initialValue={true}
                    >
                      <Select placeholder="Select a option" allowClear>
                        <Option value={true}>Active</Option>
                        <Option value={false}>Inactive</Option>
                      </Select>
                    </Form.Item>


                    <Form.Item {...tailLayout}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                      >
                        Submit
                      </Button>
                    </Form.Item>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default TutorRequestFrom;

