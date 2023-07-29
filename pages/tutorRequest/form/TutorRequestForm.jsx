import { Button, Layout, DatePicker, Form, Input, InputNumber, Modal, Radio, Select, TimePicker } from "antd";
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { CATEGORIE_END_POINT, CITY_END_POINT, CLASS_END_POINT, GUARDIAN_END_POINT, JOB_REQUEST_END_POINT, LOCATION_END_POINT, SUBJECT_END_POINT } from '../../../constants/index';
import moment from 'moment';
import { QUERY_KEYS } from '../../../constants/queryKeys.js';
import { get, post, put } from '../../../helpers/api_helper';
import { mapArrayToDropdown } from '../../../helpers/common_Helper.js';
import { useGetAllData } from '../../../utils/hooks/useGetAllData.js';
import ToastMessage from '../../../components/Toast';
import Axios from "../../../utils/axios";
const jwt = require('jsonwebtoken');
const TutorRequest = () => {

  const { http, setToken, token } = Axios();
  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);
  const [form] = Form.useForm();
  const [visited, setIsVisited] = useState(false);
  const [loading, setLoading] = useState(false);
  const { Option } = Select;
  const [numOfStudent, setNumOfStudent] = useState(null);
  const [category, setCategory] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subject, setSubject] = useState([]);
  const [city, setCity] = useState([]);
  const [location, setLocation] = useState([]);
  const [tokenValue,setTokenValue]= useState({});
  const userId = tokenValue?.userId;
  
  const phoneNumberPattern = /^(?:01[3-9])\d{8}$/;
  const handleStudetNumber = async (value) => {
    setNumOfStudent(value);
  }
  useEffect(()=>{
    if (token) {
      try {
        const decodedToken = jwt.decode(token);
        setTokenValue(decodedToken);
      } catch (error) {
        console.error('Failed to decode token:', error.message);
      }
    } else {
      console.error('Token not found.');
    }
  },[token])


  const { Content } = Layout;
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


  /** Fetch category List */

  const {
    data: categoryList,
    refetch: fetchTotalCategory,
  } = useGetAllData(
    QUERY_KEYS.GET_ALL_CATEGORY_LIST,
    CATEGORIE_END_POINT.get(1, -1, '', true)
  );

  /**category dropdown */
  useEffect(() => {
    const CATEGORYDROPDOWN = mapArrayToDropdown(
      categoryList?.data,
      'name',
      '_id'
    );
    setCategory(CATEGORYDROPDOWN);
  }, [categoryList]);



  /** Fetch CategoryList List End */



  /**fetch class list */
  const {
    data: classList,
    // isLoading,
    refetch: fetchClassList,
  } = useGetAllData(
    QUERY_KEYS.GET_ALL_ClASS_LIST,
    CLASS_END_POINT.get(1, -1, '', true)
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

  /**fetch class list end */


  /**fetch subject list*/

  const {
    data: subjectList,
    refetch: fetchSubjectList,
  } = useGetAllData(
    QUERY_KEYS.GET_ALL_SUBJECT_LIST,
    SUBJECT_END_POINT.get(1, -1, '', true)
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

  /**fetch subject list end */



  /** Fetch city */
  const {
    data: cityList,
    refetch: fetchCityList,
  } = useGetAllData(
    QUERY_KEYS.GET_ALL_CITY_LIST,
    CITY_END_POINT.get(1, -1, '', true)
  );

  /**city dropdown */
  useEffect(() => {
    const CITYDROPDOWN = mapArrayToDropdown(
      cityList?.data,
      'name',
      '_id'
    );
    setCity(CITYDROPDOWN);
  }, [cityList]);

  /** end city dropdown */


  /**fetch location list */

  const handleCity = async (value) => {
    setIsVisited(true);
    const fetchLocation = await get(LOCATION_END_POINT.getLocationByCityId(value));
    const LOCATIONDROPDOWN = mapArrayToDropdown(
      fetchLocation.data,
      'name',
      '_id'
    );
    setLocation(LOCATIONDROPDOWN)
  }


  /**fetch location list  End */




  const handleDateChange = (date, dateString) => {
    const formattedDate = moment(dateString).format('MM/DD/YYYY');
    console.log(formattedDate);  // Output: 07/04/2023
    // You can update the form value or do any other necessary operations here
  };

  const onFinish = async (values) => {
    const formattedDate = moment(values.hireDate).format('DD/MM/YYYY');
    const formattedTime = moment(values.tutoringTime).format('h:mm A');
    const subjects = values.subject?.map((subjectId) => ({
      subjectId: subjectId,
    }));
    values.subject = subjects;
    const classes = values.class?.map((classId) => ({
      classId: classId,
    }));
    values.class = classes;
    let body = {...values, guardian:userId,isApproval:false};
    console.log(body);
    const response = await post(JOB_REQUEST_END_POINT.create(),body);
    if (response.status === 'SUCCESS') {
      notify('success', response.message);
   
    } else {
      notify('error', response.errorMessage);
      setLoading(false);
    }

  }

  return (
    <>
      <Content
        style={{
          margin: '60px 16px',
        }}
      >

        <div className="card">
          <div className="card-body">
            <Form
              className="mt-3"
              {...layout}
              onFinish={onFinish}
              form={form}
              name="control-hooks"

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
                            name="category"
                            label="Category"
                            rules={[
                              {
                                required: true,
                              },
                            ]}

                            hasFeedback
                          >
                            <Select
                              // mode="multiple"
                              placeholder="Please select Category"
                              options={category}
                            />
                          </Form.Item>


                          <Form.Item
                            name="noOfStudent"
                            label="Number of Students"
                            rules={[
                              {
                                required: true,
                                message: 'Number of students is required',
                              },
                              // {
                              //   type: 'number',
                              //   min: 1,
                              //   message: 'Number of students should be at least 1',
                              // },
                              // {
                              //   type: 'number',
                              //   max: 100,
                              //   message: 'Number of students cannot exceed 100',
                              // },
                            ]}
                            hasFeedback
                          >
                            <InputNumber onChange={handleStudetNumber} style={{ width: '100%' }} />
                          </Form.Item>


                          <Form.Item
                            name="class"
                            label="Select class"
                            rules={[
                              {
                                required: true,
                                message: 'Please select  class!',
                                type: 'array',

                              },
                              {

                                type: 'array',
                                min: 1,
                                message: 'Please select  class!',

                              },
                              {

                                type: 'array',
                                max: numOfStudent,
                                message: 'You can not select more then your student',
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
                            name="tuitionType"
                            label="Type version"
                            rules={[
                              {
                                required: true,
                              },
                            ]}
                            hasFeedback
                            initialValue={true}
                          >
                            <Select placeholder="Select a option" allowClear>
                              <Option value={"Home Tutoring"}> Home Tutoring </Option>
                              <Option value={"Online Tutoring"}>Online Tutoring</Option>
                              <Option value={"Group Tutoring"}>Group Tutoring</Option>
                              <Option value={"Package Tutoring"}>Package Tutoring</Option>
                            </Select>
                          </Form.Item>




                          <Form.Item
                            name="studentGender"
                            label="Gender"
                          // rules={[
                          //   {
                          //     required: true,
                          //     message: 'Please select a gender',
                          //   },
                          // ]}
                          >
                            <Radio.Group>
                              <Radio value="Male">Male</Radio>
                              <Radio value="Female">Female</Radio>
                              <Radio value="Any">Any</Radio>
                            </Radio.Group>
                          </Form.Item>

                          <Form.Item
                            name="city"
                            label="Select City"
                            rules={[
                              {
                                required: true,
                                message: 'Please select City!',

                              },
                            ]}
                            hasFeedback
                          >
                            <Select
                              onChange={handleCity}
                              placeholder="Please select City"
                              options={city}
                            />
                          </Form.Item>


                          <Form.Item
                            name="location"
                            label="Location"
                            rules={[
                              {
                                required: true,
                                message: 'Please select Location!',

                              },
                            ]}
                            hasFeedback

                          >
                            <Select
                              // mode="multiple"
                              placeholder="Please select Location"
                              options={location}
                            />
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



                          {/* <Form.Item
                            name="isApproval"
                            label="Portal Access"
                          >


                            <Radio.Group>
                              <Radio value={true}>Active</Radio>
                              <Radio value={false}>Inactive</Radio>
                            </Radio.Group>
                          </Form.Item> */}






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
                          // rules={[
                          //   {
                          //     required: true,
                          //     message: 'Please select a gender',
                          //   },
                          // ]}
                          >
                            <Radio.Group>
                              <Radio value="Male">Male</Radio>
                              <Radio value="Female">Female</Radio>
                              <Radio value="Any">Other</Radio>
                            </Radio.Group>
                          </Form.Item>

                          <Form.Item
                            label="Days / Week"
                            name="daysPerWeek"

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

                          >
                            <Input
                              placeholder="Enter preference institute name"
                            />
                          </Form.Item>

                          <Form.Item
                            label="Salary (BDT)"
                            name="salary"
                            rules={[
                              { required: true, message: 'Please enter the expected salary per month' },
                              { type: 'number', min: 3000, max: 200000, message: 'Salary must be between 3000 and 200000' },
                              { type: 'number', message: 'Salary cannot be negative', transform: value => (value ? Math.abs(value) : value) },
                            ]}
                          >
                            <InputNumber
                              placeholder="Enter expected salary per month"
                              style={{ width: '100%' }}
                            />
                          </Form.Item>

                          <Form.Item
                            label="Hire Date"
                            name="hireDate"
                          // rules={[
                          //   {
                          //     required: true,
                          //     message: 'Hire Date is required',
                          //   },
                          // ]}
                          >
                            <DatePicker
                              style={{ width: '300px', height: '40px' }}
                              format="DD/MM/YYYY"
                              onChange={handleDateChange}
                            />
                          </Form.Item>

                          <Form.Item
                            label="Tutoring Time"
                            name="tutoringTime"
                          // rules={[
                          //   {
                          //     required: true,
                          //     message: 'Tutoring Time is required',
                          //   },
                          // ]}
                          >
                            <TimePicker
                              style={{ width: '300px', height: '40px' }}
                              format="h:mm A"
                            />
                          </Form.Item>

                          <Form.Item
                            label="More Requirement"
                            name="requirement"
                          // rules={[
                          //   {
                          //     required: true,
                          //     message: 'Requirement is required',
                          //   },
                          // ]}
                          >
                            <Input.TextArea
                              rows={2}
                              placeholder="Enter Full requirement"
                            />
                          </Form.Item>
                          <Form.Item
                            name="phone"
                            label="Phone"
                          // rules={[
                          //   {
                          //     required: true,
                          //     pattern: phoneNumberPattern,
                          //     message: 'Please enter a valid Bangladeshi phone number!',
                          //   },
                          // ]}
                          // hasFeedback
                          >
                            <Input />
                          </Form.Item>



                          <Form.Item
                            name="status"
                            label="Status"
                          // rules={[
                          //   {
                          //     required: true,
                          //   },
                          // ]}
                          // hasFeedback
                          // initialValue={true}
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
          </div>
        </div>
      </Content>
    </>
  )
}

export default TutorRequest